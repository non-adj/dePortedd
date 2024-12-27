<template>
  <v-container fluid class="sponsor-page">
    <!-- Hero Section -->
    <v-row justify="center" class="hero-section-sponsor text-center mb-4">
      <v-col cols="12" md="8">
        <h1 class="mb-4">Join Us in Protecting Privacy</h1>
        <p class="mb-4">
          DeFlock empowers individuals to understand and combat the rise of Automatic License Plate Readers (ALPRs). Your support helps us spread awareness, maintain infrastructure, and advocate for privacy rights.
        </p>
        <v-btn href="https://github.com/sponsors/frillweeman" target="_blank" color="rgb(18, 151, 195)" class="mt-4">Donate Now</v-btn>
      </v-col>
    </v-row>

    <!-- GitHub Sponsors Section -->
    <v-row justify="center" class="sponsors-section text-center">
      <v-col cols="12" md="10">
        <h2 class="mb-2">Our Amazing Sponsors</h2>
        <p class="mb-8">
          Want to see your name here? <a href="https://github.com/sponsors/frillweeman">Become a sponsor</a>, and your name will appear on this page!
        </p>
        <v-row>
          <v-col v-for="sponsor in sponsors" :key="sponsor.login" cols="6" md="4" lg="3">
            <v-card :href="sponsor.url" target="_blank" variant="flat" class="text-center py-2" color="transparent">
              <v-avatar size="64px" class="mb-3">
                <v-img :src="sponsor.avatarUrl" :alt="sponsor.name" />
              </v-avatar>
              <p>{{ sponsor.name ?? sponsor.login }}</p>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- GitHub Sponsors Section -->
    <v-row justify="center" class="sponsors-section text-center mt-4">
      <v-col cols="12" md="10">
        <h2 class="mb-2">Special Thanks</h2>
        
        <v-card href="https://www.404media.co/" target="_blank" max-width="250" variant="flat" class="text-center py-2 mx-auto" color="transparent">
          <v-img class="ma-4" src="/404media.svg" alt="404 Media Logo" contain />
          <v-card-title class="mt-2 serif text-center font-weight-bold">404 Media</v-card-title>
          <v-card-text>
            <p>Special thanks to Jason Koebler at 404 Media for popularizing this project. Be sure to support them, as they are fellow privacy advocates.</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <Footer />
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref } from "vue";
import { getSponsors } from "@/services/apiService";
import Footer from "@/components/layout/Footer.vue";

interface Sponsor {
  login: string;
  name: string;
  avatarUrl: string;
  url: string;
}

const sponsors: Ref<Sponsor[]> = ref([]);

onMounted(() => {
  getSponsors()
    .then((data) => {
      sponsors.value = data.map((s: any) => s.sponsor);
    })
    .catch((error) => {
      console.error(error);
    });
});
</script>

<style scoped>
.hero-section-sponsor {
  background: url('/torches.webp') no-repeat center center;
  background-size: cover;
  color: white;
  padding: 100px 0 !important;
  position: relative;
  }

 .hero-section-sponsor::before {
   content: '';
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background: rgba(0, 0, 0, 0.5);
   z-index: 1;
 }

 .hero-section-sponsor > * {
   position: relative;
   z-index: 2;
}
</style>
