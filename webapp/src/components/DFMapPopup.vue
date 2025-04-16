<template>
  <v-sheet min-width="240">
    <v-list density="compact">
      <v-list-item>
        <div class="d-flex align-center">
          <v-icon start>mdi-school</v-icon> <b>{{ event.school }}</b>
        </div>
      </v-list-item>
      <v-list-item>
        <div class="d-flex align-center">
          <v-icon start>mdi-map-marker</v-icon> <b>{{ event.state }}</b>
        </div>
      </v-list-item>
      <v-list-item>
        <div class="d-flex align-center">
          <v-icon start>mdi-calendar</v-icon> <b>{{ event.date }}</b>
        </div>
      </v-list-item>
      <v-list-item v-if="event.reason">
        <div class="d-flex align-center">
          <v-icon start>mdi-alert-circle</v-icon> <b>{{ event.reason }}</b>
        </div>
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
</script>
