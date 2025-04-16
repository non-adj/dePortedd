<template>
  <v-sheet min-width="260">
    <div class="school-name mb-4">{{ event.school }}</div>
    <v-list density="compact">
      <v-list-item class="mb-2">
        <v-list-item-title>
          <b>Number of Revocations / Deportations:</b>
          <div class="value">{{ event.count ?? 1 }}</div>
        </v-list-item-title>
      </v-list-item>
      <v-list-item class="mb-2">
        <v-list-item-title>
          <b>Date of Revocation:</b>
          <div class="value">{{ formatDate(event.date) }}</div>
        </v-list-item-title>
      </v-list-item>
      <v-list-item class="mb-2" v-if="event.reason">
        <v-list-item-title>
          <b>Reason Given:</b>
          <div class="value">{{ event.reason }}</div>
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>
          <b>Statement:</b>
          <div class="value">{{ event.statement || 'No Statement Recorded' }}</div>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-sheet>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { VisaRevocationEvent } from '@/types';

const props = defineProps({
  event: {
    type: Object as PropType<VisaRevocationEvent>,
    required: true
  }
});

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
</script>

<style scoped>
.school-name {
  font-size: 1.25rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
}
.value {
  margin-top: 0.25rem;
  margin-bottom: 0.5rem;
  font-size: 1.08rem;
  font-weight: normal;
}
.v-list-item {
  margin-bottom: 0.5rem;
}
</style>
