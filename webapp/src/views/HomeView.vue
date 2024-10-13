<template>
  <div class="map-container">
    <v-card class="map-notif" v-show="!canRefreshMarkers">
      <v-card-title><b>Zoom in to Refresh ALPRs</b></v-card-title>
    </v-card>

    <!-- use-global-leaflet=false is a workaround for a bug in current version of vue-leaflet -->
    <l-map
      v-if="center"
      ref="map"
      v-model:zoom="zoom"
      v-model:center="center"
      :use-global-leaflet="false"
      @update:bounds="updateBounds"
      @ready="mapLoaded"
      :options="{ zoomControl: false, attributionControl: false }"
    >
      <l-control position="topleft">
        <v-text-field
          :rounded="xs || undefined"
          :density="xs ? 'compact' : 'default'"
          class="map-search"
          ref="searchField"
          prepend-inner-icon="mdi-magnify"
          placeholder="Search for a location"
          single-line
          variant="solo"
          clearable
          hide-details
          v-model="searchQuery"
          @keyup.enter="onSearch"
        >
          <template v-slot:append-inner>
            <v-btn :disabled="!searchQuery" variant="text" flat color="#0080BC" @click="onSearch">
              Go<v-icon end>mdi-chevron-right</v-icon>
            </v-btn>
          </template>
        </v-text-field>
      </l-control>
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      />
      <l-control-zoom position="bottomright" />
      <DFMapMarker v-for="alpr in alprsInView" :key="alpr.id" :alpr :show-fov="zoom >= 16" />
    </l-map>
    <div class="loader" v-else>
      <span class="mb-4 text-grey">Loading Map</span>
      <v-progress-circular indeterminate color="primary" />
    </div>
  </div>
</template>

<script setup lang="ts">
import 'leaflet/dist/leaflet.css';
import { LMap, LTileLayer, LMarker, LPopup, LControlZoom, LControl } from '@vue-leaflet/vue-leaflet';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router'
import type { Ref } from 'vue';
import { BoundingBox } from '@/services/apiService';
import { getALPRs, geocodeQuery } from '@/services/apiService';
import { useDisplay } from 'vuetify';
import DFMapMarker from '@/components/DFMapMarker.vue';
import type { ALPR } from '@/types';

const zoom: Ref<number> = ref(13);
const center: Ref<any|null> = ref(null);
const bounds: Ref<BoundingBox|null> = ref(null);
const searchField: Ref<any|null> = ref(null);
const searchQuery: Ref<string> = ref('');
const router = useRouter();
const { xs } = useDisplay();

const canRefreshMarkers = computed(() => zoom.value >= 10);

const alprsInView: Ref<ALPR[]> = ref([]);
const bboxForLastRequest: Ref<BoundingBox|null> = ref(null);

function onSearch() {
  if (searchField.value) {
    console.log('Blurring search field');
    searchField.value?.blur();
  }
  if (!searchQuery.value) {
    return;
  }
  geocodeQuery(searchQuery.value, center.value)
    .then((result: any) => {
      if (!result) {
        alert('No results found');
        return;
      }
      console.log('Geocode result:', result);
      const { lat, lon: lng } = result;
      center.value = { lat, lng };
      zoom.value = 13;
      searchQuery.value = '';
    });
}

function getUserLocation(): Promise<[number, number]> {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          reject(error);
        },
        {
          timeout: 10000,
          enableHighAccuracy: true,
        }
      );
    } else {
      reject(new Error('Geolocation is not supported by this browser.'));
    }
  });
};

function mapLoaded(map: any) {
  updateBounds(map.getBounds());
}

function updateBounds(newBounds: any) {
  updateURL();
  
  const newBoundingBox = new BoundingBox({
    minLat: newBounds.getSouth(),
    maxLat: newBounds.getNorth(),
    minLng: newBounds.getWest(),
    maxLng: newBounds.getEast(),
  });
  bounds.value = newBoundingBox;

  if (bboxForLastRequest.value && newBoundingBox.isSubsetOf(bboxForLastRequest.value)) {
    console.debug('new bounds are a subset of the last request, skipping');
    return;
  }

  updateMarkers();
}

function updateURL() {
  if (!center.value) {
    return;
  }

  router.replace({
    hash: `#map=${zoom.value}/${center.value.lat.toFixed(6)}/${center.value.lng.toFixed(6)}`
  });
}

function updateMarkers() {
  // Fetch ALPRs in the current view
  if (!bounds.value) {
    return;
  }

  if (!canRefreshMarkers.value) {
    return;
  }

  getALPRs(bounds.value)
    .then((alprs: any) => {
      // merge incoming with existing, so that moving the map doesn't remove markers
      const existingIds = new Set(alprsInView.value.map(alpr => alpr.id));
      const newAlprs = alprs.elements.filter((alpr: any) => !existingIds.has(alpr.id));
      alprsInView.value = [...alprsInView.value, ...newAlprs];
      bboxForLastRequest.value = bounds.value;
    });
}

onMounted(() => {
  const hash = router.currentRoute.value.hash;
  if (hash) {
    const parts = hash.split('/');
    if (parts.length === 3 && parts[0].startsWith('#map')) {
      const zoomLevelString = parts[0].replace('#map=', '');
      zoom.value = parseInt(zoomLevelString, 10);
      center.value = {
        lat: parseFloat(parts[1]),
        lng: parseFloat(parts[2]),
      };
    }
  }

  getUserLocation()
    .then(location => {
      if (!hash)
        center.value = { lat: location[0], lng: location[1] };
    }).catch(error => {
      // TODO: allow search
      console.debug('Error getting user location. Defaulting to Huntsville, AL.', error);
      center.value = { lat: 34.730819, lng: -86.586114 }; // Huntsville, AL
    });
});

</script>

<style scoped>
.map-container {
  width: 100%;
  height: calc(100vh - 64px);
  overflow: auto;
}

.map-search {
  width: calc(100vw - 22px);
  max-width: 400px;
  z-index: 1000;
}

.map-notif {
  position: absolute;
  text-align: center;
  bottom: 32px;
  left: 32px;
  width: calc(100% - 64px);
  max-width: 1000px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  padding: 4px;
  color: #eee;
}

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #333;
}
</style>
