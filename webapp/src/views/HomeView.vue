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
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
      <l-marker
        v-for="alpr in alprsInView"
        :key="alpr.id"
        :lat-lng="[alpr.lat, alpr.lon]"
      ><l-popup>
        <h2>ALPR</h2>
        <p v-if="alpr.tags.brand || alpr.tags.operator"><strong>Brand: </strong><a target="_blank" :href="`https://www.wikidata.org/wiki/${alpr.tags['brand:wikidata'] || alpr.tags['operator:wikidata']}`">{{ alpr.tags.brand || alpr.tags.operator || 'Unknown' }}</a></p>
        <p v-if="alpr.tags.direction"><strong>Faces: {{ degreesToCardinal(alpr.tags.direction) }}</strong></p>
      </l-popup></l-marker>
    </l-map>
    <div v-else>
      loading...
    </div>
  </div>
</template>

<script setup lang="ts">
import 'leaflet/dist/leaflet.css';
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router'
import type { Ref } from 'vue';
import { BoundingBox } from '@/services/apiService';
import { getALPRs } from '@/services/apiService';

const zoom: Ref<number> = ref(12);
const center: Ref<any|null> = ref(null);
const bounds: Ref<BoundingBox|null> = ref(null);
const router = useRouter();

const canRefreshMarkers = computed(() => zoom.value >= 10);

const alprsInView: Ref<any[]> = ref([]);
const bboxForLastRequest: Ref<BoundingBox|null> = ref(null);

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
    console.log('zoomed out too far');
    return;
  }

  getALPRs(bounds.value)
    .then((alprs: any) => {
      alprsInView.value = alprs.elements;
      bboxForLastRequest.value = bounds.value;
    });
}

function degreesToCardinal(degrees: number): string {
  const cardinals = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return cardinals[Math.round(degrees / 45) % 8];
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
    });
});

</script>

<style scoped>
.map-container {
  width: 100%;
  height: calc(100vh - 64px);
  overflow: auto;
}

.map-notif {
  position: absolute;
  text-align: center;
  bottom: 32px;
  left: 32px;
  width: calc(100% - 64px);
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 4px;
  padding: 4px;
  color: #eee;
}
</style>
