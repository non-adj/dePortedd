<template>
  <l-circle-marker
    @click="$emit('click', props)"
    :lat-lng="[props.lat, props.lon]"
    :radius="26"
    :center="[props.lat, props.lon]"
    color="#3f54f3"
  />
</template>

<script setup lang="ts">
import { LCircleMarker } from '@vue-leaflet/vue-leaflet';
import { defineProps, defineEmits } from 'vue';

defineEmits(['click']);

const props = defineProps({
  lat: Number,
  lon: Number,
});
</script>
