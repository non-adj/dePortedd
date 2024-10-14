<template>
  <v-sheet>
    <v-data-table density="compact" hide-default-header hide-default-footer disable-sort :items="kvTags" />
  </v-sheet>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import type { PropType } from 'vue';
import type { ALPR } from '@/types';

const props = defineProps({
  alpr: {
    type: Object as PropType<ALPR>,
    required: true
  }
});

const valueTransformations: { [key: string]: (value: string) => string } = {
  direction: (value: string) => `${degreesToCardinal(parseInt(value))} ${value}º`
};

const whitelistedTags = ['brand', 'camera:mount', 'camera:type', 'direction', 'operator'];

const kvTags = computed(() => {
  return Object.entries(props.alpr.tags)
    .filter(([key]) => whitelistedTags.includes(key))
    .map(([key, value]) => ({ key, value: valueTransformations[key]?.(value) ?? value }));
});

function degreesToCardinal(degrees: number): string {
  const cardinals = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return cardinals[Math.round(degrees / 45) % 8];
}
</script>
