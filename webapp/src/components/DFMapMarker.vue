<template>
  <l-circle-marker :lat-lng="[alpr.lat, alpr.lon]" :radius="7" color="#3f54f3">
    <l-popup>
      <DFMapPopup :alpr="alpr" />
    </l-popup>
  </l-circle-marker>
  <l-polygon
    :lat-lngs="directionIndicatorPolygonCoordinates"
    :options="{ color: 'red' }"
    v-if="showFov"
  >
    <!-- TODO: use the same popup -->
    <l-popup>
      <DFMapPopup :alpr="alpr" />
    </l-popup>
  </l-polygon>
</template>

<script setup lang="ts">
import { LMarker, LCircleMarker, LFeatureGroup, LPolygon, LPopup } from '@vue-leaflet/vue-leaflet';
import DFMapPopup from '@/components/DFMapPopup.vue';
import type { ALPR } from '@/types';
import type { PropType } from 'vue';
import { computed, defineProps } from 'vue';

const props = defineProps({
  alpr: {
    type: Object as PropType<ALPR>,
    required: true
  },
  showFov: {
    type: Boolean,
    default: false
  }
});

const directionIndicatorPolygonCoordinates = computed(() => {
  const { lat, lon } = props.alpr;
  const direction = parseInt(props.alpr.tags.direction);
  const fov = 30; // Field of view in degrees
  const distance = 0.0004; // Distance for the triangle points

  const toRadians = (degrees: number) => degrees * (Math.PI / 180);

  const pointL = {
    lat: lat + distance * Math.cos(toRadians(direction - fov / 2)),
    lon: lon + distance * Math.sin(toRadians(direction - fov / 2))
  };

  const pointR = {
    lat: lat + distance * Math.cos(toRadians(direction + fov / 2)),
    lon: lon + distance * Math.sin(toRadians(direction + fov / 2))
  };

  return [
    [lat, lon],
    [pointL.lat, pointL.lon],
    [pointR.lat, pointR.lon]
  ];
});
</script>
