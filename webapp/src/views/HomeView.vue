<template>
  <div class="map-container">
    <!-- use-global-leaflet=false is a workaround for a bug in current version of vue-leaflet -->
    <l-map v-if="center" ref="map" v-model:zoom="zoom" :center="center" :use-global-leaflet="false">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
    </l-map>
    <div v-else>
      loading...
    </div>
  </div>
</template>

<script setup lang="ts">
import 'leaflet/dist/leaflet.css';
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';
import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';

const zoom: Ref<number> = ref(12);
const center: Ref<[number, number]|null> = ref(null);

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

onMounted(() => {
  getUserLocation()
    .then(location => {
      center.value = location;
    });
});

</script>

<style scoped>
.map-container {
  width: 100%;
  height: calc(100vh - 64px);
  overflow: auto;
}
</style>
