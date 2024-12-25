<template>
  <!-- Hero Section -->
  <v-container fluid class="hero-section">
    <v-row justify="center">
      <v-col cols="12" md="8" class="text-center">
        <h1 class="display-1 px-8">You're Being Tracked by ALPRs!</h1>
        <ALPRCounter class="mt-4" />
        <p class="subtitle-1 px-8 mt-6 mb-12">
          Automated License Plate Readers (ALPRs) are monitoring your every move. Learn more about how they work and how you can protect your privacy.
        </p>
        <v-btn color="rgb(18, 151, 195)" large @click="goToMap({ withCurrentLocation: true })">
          Find Nearby ALPRs
          <v-icon end>mdi-map</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
  
  <!-- Information Section -->
  <v-container class="info-section py-10">
    <v-row class="align-center">
      <v-col cols="12" md="4" class="text-center">
        <v-card>
          <v-card-title class="headline">
            <v-icon x-large class="mr-2">mdi-shield-alert</v-icon>
            Privacy Violations
          </v-card-title>
          <v-card-text>
            ALPRs track your movements and store your data for long periods of time, creating a detailed record of your location history. They surveil mostly innocent people while claiming to target criminals.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4" class="text-center">
        <v-card>
          <v-card-title class="headline">
            <v-icon x-large class="mr-2">mdi-alert-circle</v-icon>
            Risk of Misuse
          </v-card-title>
          <v-card-text>
            Data from ALPRs has led to <a target="_blank" href="https://www.newsobserver.com/news/state/north-carolina/article287381160.html">wrongful arrests</a>, profiling, and <a target="_blank" href="https://www.kwch.com/2022/10/31/kechi-police-lieutenant-arrested-using-police-technology-stalk-wife/">stalking ex-partners</a> by police officers.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4" class="text-center">
        <v-card>
          <v-card-title class="headline">
            <v-icon x-large class="mr-2">mdi-handcuffs</v-icon>
            Limited Benefits
          </v-card-title>
          <v-card-text>
            There's no substantial evidence that ALPRs effectively prevent crime, despite <a target="_blank" href="https://www.404media.co/researcher-who-oversaw-flock-surveillance-study-now-has-concerns-about-it/">Flock's unethical attempts</a> to prove otherwise.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  
  <!-- Map Section -->
  <v-container class="map-section py-10 text-center">
    <h2 class="display-2 mb-4">Explore ALPR Locations Near You</h2>
    <v-btn color="white" large @click="goToMap">
      View the Map
      <v-icon end>mdi-map</v-icon>
    </v-btn>
  </v-container>
</template>

<style>
.hero-section {
  background: url('/flock-camera.jpeg') no-repeat center center;
  background-size: cover;
  color: white;
  padding: 100px 0 !important;
  position: relative;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.hero-section > * {
  position: relative;
  z-index: 2;
}

.info-section {
  background: var(--df-page-background-color);
}

.map-section {
  background: url('/deflock-screenshot.webp') no-repeat center center;
  background-size: cover;
  color: white;
  padding: 100px 0;
  position: relative;
}
.map-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.map-section > * {
  position: relative;
  z-index: 2;
}
</style>


<script setup lang="ts">
import { useRouter } from 'vue-router';
import ALPRCounter from '@/components/ALPRCounter.vue';
import { useGlobalStore } from '@/stores/global';

const router = useRouter();
const { setCurrentLocation } = useGlobalStore();

interface GoToMapOptions {
  withCurrentLocation?: boolean;
}

async function goToMap(options: GoToMapOptions = {}) {
  if (options.withCurrentLocation) {
    setCurrentLocation()
    .then((currentLocation) => {
      const [lat, lon] = currentLocation;
      router.push({ path: '/map', hash: `#map=12/${lat.toFixed(6)}/${lon.toFixed(6)}` });
    })
    .catch(() => {
      router.push({ path: '/map' });
    });
  } else {
    router.push({ path: '/map' });
  }
}
</script>
