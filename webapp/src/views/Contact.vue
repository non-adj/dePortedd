<template>
  <v-container class="text-center py-16">
    <h1>Contact</h1>
    <v-alert type="info" class="mt-8" border="left" color="primary">
      Work in Progress
    </v-alert>
  </v-container>
</template>

<script setup lang="ts">
import Footer from '@/components/layout/Footer.vue';
import { useTheme } from 'vuetify';
import { computed } from 'vue';

const theme = useTheme();
const isDark = computed(() => theme.name.value === 'dark');
</script>
 
<style lang="css" scoped>
@import url('@/assets/typography.css');
</style>

