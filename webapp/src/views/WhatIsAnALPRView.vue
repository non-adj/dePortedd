<template>
  <v-container fluid>
    <v-row justify="center" class="hero-section-whatis text-center mb-4">
    </v-row>
  </v-container>
  
  <v-container class="info-section">
    <h1 class="mt-0">What is an ALPR?</h1>
    <p>
      Automated License Plate Readers (ALPRs) are cameras that capture images of all passing license plates, storing details like the car's location, date, and time. These cameras collect data on millions of vehicles—regardless of whether the driver is suspected of a crime. While these systems can be useful for tracking stolen cars or wanted individuals, they are mostly used to track the movements of innocent people.
    </p>

    <p>For a detailed explanation of how ALPRs are a threat to privacy, see this <a href="https://www.aclu.org/issues/privacy-technology/you-are-being-tracked" target="_blank">ACLU article</a> as well as this <a href="https://sls.eff.org/technologies/automated-license-plate-readers-alprs" target="_blank">EFF article</a> on ALPRs.</p>

    <h2>Why Should You Be Concerned</h2>
    <p class="mb-8 text-center">
      ALPRs invade your privacy and violate your civil liberties. Here's how:
    </p>

    <dangers />

    <h2>What They Look Like</h2>

    <v-alert
      density="compact"
      class="mb-6 text-center"
      variant="tonal"
      color="rgb(18, 151, 195)"
    >
      <p>
        <v-icon v-if="isMobile" size="x-large">mdi-gesture-tap</v-icon>
        <v-icon v-else size="x-large">mdi-button-cursor</v-icon>
      </p>
      <p>
        <b>{{ isMobile ? 'Tap' : 'Hover over' }}</b> an image below to identify the make.
        <span v-if="!isMobile"><b>Click</b> an image to enlarge.</span>
      </p>
    </v-alert>

    <v-row>
      <v-col v-for="image in images" cols="12" sm="6" md="4">
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <v-img style="cursor: pointer;" @click="openFullScreenImage(image)" v-bind="props" cover :aspect-ratio="3/2" :src="image.url">
              <transition name="fade">
                <div class="scrim" v-show="isHovering">
                  <span class="scrim-text">{{ image.brand }}</span>
                </div>
              </transition>
            </v-img>
          </template>
        </v-hover>
      </v-col>
    </v-row>

    <h2>Common Brands of ALPRs</h2>
    <ul class="serif mb-16">
      <li>
        <a href="https://www.flocksafety.com/devices/lpr" target="_blank">Flock Safety</a> - A leading provider of ALPR technology, known for their solar-powered cameras. This is the most common brand of ALPR in the US. Flock Safety cameras are used by police departments, HOAs, as well as private businesses such as hardware stores and hotels. One of the most appealing features of Flock cameras is the data sharing network, which allows law enforcement agencies to access data from other Flock cameras in the area. This means that even if your local police department doesn't have a Flock camera, they can still access data from other Flock cameras in the area.
      </li>
      <li>
        <a href="https://www.motorolasolutions.com/en_us/video-security-access-control/license-plate-recognition-camera-systems.html" target="_blank">Vigilant Solutions</a> - Owned by Motorola Solutions, offering a range of ALPR products and services.
      </li>
      <li>
        <a href="https://www.leonardocompany-us.com/lpr/elsag-fixed" target="_blank">ELSAG</a> - A subsidiary of Leonardo, specializing in ALPR technology.
      </li>
      <li>
        <a href="https://neology.com/solutions/enforcement/" target="_blank">Neology</a> - Specializes in ALPR technology and tolling solutions.
      </li>
    </ul>
  </v-container>

  <v-dialog class="full-screen-image" v-model="showFullScreenImage">
    <v-card style="overflow: hidden;">
      <v-btn size="x-large" class="image-close-btn" flat icon @click="showFullScreenImage = false" color="transparent">
        <v-icon :color="fullScreenImage.useDarkCloseButton ? 'black' : 'white'">mdi-close</v-icon>
      </v-btn>
      <v-img v-if="fullScreenImage" cover :aspect-ratio="3/2" :src="fullScreenImage.url" />
    </v-card>
    
  </v-dialog>

  <Footer />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, type Ref } from 'vue';
import { useDisplay } from 'vuetify';
import Dangers from '@/components/Dangers.vue';
import Footer from '@/components/layout/Footer.vue';
const route = useRoute();
const { xs: isMobile } = useDisplay();

const flockImageCount = 6;
const vigilantImageCount = 3;

const showFullScreenImage = ref(false);
const fullScreenImage: Ref<any|undefined> = ref(undefined);

function openFullScreenImage(image: object) {
  if (isMobile.value)
    return;
  fullScreenImage.value = image;
  showFullScreenImage.value = true;
}

const images = [
  ...Array.from({ length: flockImageCount }, (_, i) => ({
    url: `/flock-${i + 1}.jpg`,
    brand: 'flock',
    useDarkCloseButton: false,
  })),
  ...Array.from({ length: vigilantImageCount }, (_, i) => ({
    url: `/vigilant-${i + 1}.jpg`,
    brand: 'motorola',
    useDarkCloseButton: true,
  }))
];
</script>

<style scoped>
@import url('@/assets/typography.css');

h1, h2 {
  text-align: center;
}

.scrim {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
}

.image-close-btn {
  position: absolute;
  top: 0;
  right: 0;
  color: white;
  z-index: 100;
}

.scrim-text {
  text-transform: uppercase;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.hero-section-whatis {
  background: url('/flock-camera.jpeg') no-repeat right center;
  background-size: cover;
  color: white;
  position: relative;
  height: 400px;
}
</style>
