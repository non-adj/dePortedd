<template>
  <l-marker-rotate v-if="showFov && hasDirection" :lat-lng="[alpr.lat, alpr.lon]" rotationOrigin="center center" :rotationAngle>
    <l-popup>
      <DFMapPopup :alpr="alpr" />
    </l-popup>
    <l-icon :icon-url :icon-size :icon-anchor />
  </l-marker-rotate>
  <l-circle-marker v-else :lat-lng="[alpr.lat, alpr.lon]" :radius="7" color="#3f54f3">
    <l-popup>
      <DFMapPopup :alpr="alpr" />
    </l-popup>
  </l-circle-marker>
</template>

<script setup lang="ts">
import { LIcon, LPopup, LCircleMarker } from '@vue-leaflet/vue-leaflet';
import { LMarkerRotate } from 'vue-leaflet-rotate-marker';
import DFMapPopup from '@/components/DFMapPopup.vue';
import type { ALPR } from '@/types';
import type { PropType } from 'vue';
import { computed, defineProps } from 'vue';
import { type PointExpression } from 'leaflet';

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

const iconSize: PointExpression = [60, 60];
const iconAnchor: PointExpression = [30, 30];
const hasDirection = computed(() => props.alpr.tags.direction !== undefined);
const rotationAngle = computed(() => parseInt(props.alpr.tags.direction) || undefined);
const iconUrl = computed(() => props.showFov ? `/map-icon.svg` : '/map-icon-simple.svg');
</script>
