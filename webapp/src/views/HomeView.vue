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
        @click="console.log('marker clicked')"
        v-for="alpr in alprsInView"
        :key="alpr.id"
        :lat-lng="[alpr.lat, alpr.lon]"
      ><l-popup>This is an ALPR! More data (such as direction) coming soon.</l-popup></l-marker>
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
import type { BoundingBox } from '@/services/apiService';
import { getALPRs } from '@/services/apiService';

const zoom: Ref<number> = ref(12);
const center: Ref<any|null> = ref(null);
const bounds: Ref<BoundingBox|null> = ref(null);
const router = useRouter();

const canRefreshMarkers = computed(() => zoom.value >= 10);

const alprsInView: Ref<any[]> = ref([
    // {
    //     "type": "node",
    //     "id": 12187369976,
    //     "lat": 34.6616103,
    //     "lon": -86.4870137,
    //     "tags": {
    //         "brand": "Flock Safety",
    //         "brand:wikidata": "Q108485435",
    //         "camera:mount": "pole",
    //         "camera:type": "fixed",
    //         "direction": "335",
    //         "man_made": "surveillance",
    //         "operator": "Flock Safety",
    //         "operator:wikidata": "Q108485435",
    //         "surveillance": "traffic",
    //         "surveillance:type": "ALPR",
    //         "surveillance:zone": "traffic"
    //     }
    // },
    // {
    //     "type": "node",
    //     "id": 12187369977,
    //     "lat": 34.6615727,
    //     "lon": -86.4881948,
    //     "tags": {
    //         "brand": "Flock Safety",
    //         "brand:wikidata": "Q108485435",
    //         "camera:mount": "pole",
    //         "camera:type": "fixed",
    //         "direction": "295",
    //         "man_made": "surveillance",
    //         "operator": "Flock Safety",
    //         "operator:wikidata": "Q108485435",
    //         "surveillance": "traffic",
    //         "surveillance:type": "ALPR",
    //         "surveillance:zone": "traffic"
    //     }
    // }
]);

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
  bounds.value = {
    minLat: newBounds.getSouth(),
    maxLat: newBounds.getNorth(),
    minLng: newBounds.getWest(),
    maxLng: newBounds.getEast(),
  };

  updateMarkers();

  if (center.value) {
    updateURL();
  }
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
    });
}

onMounted(() => {
  const hash = router.currentRoute.value.hash;
  if (hash) {
    const parts = hash.split('/');
    console.log('parts', parts);
    if (parts.length === 3 && parts[0].startsWith('#map')) {
      const zoomLevelString = parts[0].replace('#map=', '');
      zoom.value = parseInt(zoomLevelString, 10);
      center.value = {
        lat: parseFloat(parts[1]),
        lng: parseFloat(parts[2]),
      };
      console.log('center', center.value);
      console.log('zoom', zoom.value);
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
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  padding: 4px;
  color: #333;
}
</style>
