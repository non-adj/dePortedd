<template>
  <l-circle-marker
    :lat-lng="[props.lat, props.lon]"
    :radius="26"
    color="#3f54f3"
  />
</template>

<script setup lang="ts">
import { LCircleMarker } from '@vue-leaflet/vue-leaflet';
import { defineProps } from 'vue';

const props = defineProps({
  lat: Number,
  lon: Number,
});
</script>
