<template>
  <!-- Hero Section -->
  <v-container fluid class="hero-section">
    <v-row justify="center">
      <v-col cols="12" md="8" class="text-center">
        <h1 class="display-1 px-8">Tracking Student Visa Revocations</h1>
        
        <ALPRCounter class="my-6" />
        
        <v-btn size="large" color="rgb(18, 151, 195)" large @click="goToMap({ withCurrentLocation: true })">
          Explore the Map
          <v-icon end>mdi-map</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
  
  <!-- Info Section -->
  <v-container class="py-10 text-center info-section">
    <h2 class="mb-4">What is This Project?</h2>
    <p class="text-left px-6">
      This website tracks and visualizes student visa revocations and deportations across the United States. Our goal is to provide transparency, support advocacy, and inform students, schools, and the public about where and how these events are occurring.
    </p>
    <v-divider class="my-8" />
    <h2 class="display-2 mb-4">Why Track Visa Revocations?</h2>
    <p class="px-6">
      Student visa revocations can have life-changing consequences for individuals and communities. By mapping these events, we hope to highlight trends, identify affected institutions, and support efforts to protect the rights of international students.
    </p>
    <v-row class="align-center mt-4">
      <v-col cols="12" md="4" class="text-center">
        <v-card>
          <v-card-title class="headline">
            <v-icon x-large class="mr-2">mdi-alert</v-icon>
            Transparency
          </v-card-title>
          <v-card-text>
            See where student visa revocations and deportations are happening, and which schools are most affected.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4" class="text-center">
        <v-card>
          <v-card-title class="headline">
            <v-icon x-large class="mr-2">mdi-account-group</v-icon>
            Community Reporting
          </v-card-title>
          <v-card-text>
            Contribute data and help build a more complete picture of the impact on students and institutions.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4" class="text-center">
        <v-card>
          <v-card-title class="headline">
            <v-icon x-large class="mr-2">mdi-school</v-icon>
            Advocacy
          </v-card-title>
          <v-card-text>
            Use the data to support advocacy, research, and policy change for international students.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-btn class="mt-8" color="rgb(18, 151, 195)" large to="/about">
      <v-icon start>mdi-book-open-page-variant</v-icon>
      Learn More
    </v-btn>
  </v-container>
  
  <!-- Map Section -->
  <v-container fluid class="map-section py-10 text-center">
    <h2 class="display-2 mb-4">Explore Visa Revocation Events</h2>
    <v-btn color="white" large @click="goToMap">
      View the Map
      <v-icon end>mdi-map</v-icon>
    </v-btn>
  </v-container>
  
  <Footer />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import ALPRCounter from '@/components/ALPRCounter.vue';
import { useGlobalStore } from '@/stores/global';
import Footer from '@/components/layout/Footer.vue';

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

<style>
.hero-section {
  background: none;
  color: white;
  padding: 60px 0 50px 0 !important;
  position: relative;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.55);
  z-index: 1;
}

.hero-section > * {
  position: relative;
  z-index: 2;
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

.bigger {
  font-size: 1.1rem;
}
</style>
