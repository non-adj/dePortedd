<template>
  <v-container>
    <p>
      <v-img max-height="350" width="100%" cover src="/flock-camera.jpeg" />
    </p>

    <h2>What is an ALPR</h2>
    <p>
      Automated License Plate Readers (ALPRs) are cameras that capture images of all passing license plates, storing details like the car's location, date, and time. These cameras collect data on millions of vehicles—regardless of whether the driver is suspected of a crime. While these systems can be useful for tracking stolen cars or wanted individuals, they are mostly used to track the movements of innocent people.
    </p>

    <p>For a detailed explanation of how ALPRs are a threat to privacy, see this <a href="https://www.aclu.org/issues/privacy-technology/you-are-being-tracked" target="_blank">ACLU article on them</a>.</p>

    <h2>Why Should You Be Concerned</h2>
    <p>
      ALPRs can invade your privacy and violate civil liberties in several key ways:
    </p>

    <div class="ml-4">
      <h3>Mass Surveillance</h3>
      <p>Your daily movements are tracked and logged, often indefinitely. This creates a detailed record of your daily activities. This information can be used to infer personal details about your life.</p>

      <h3>Data Sharing</h3>
      <p>ALPR data is often shared with other agencies, including federal law enforcement. This can lead to the creation of a massive database of innocent people's movements.</p>

      <h3>Chilling Effect on Freedoms</h3>
      <p>The knowledge that you are being watched can have a chilling effect on your freedom of speech and association. People may avoid attending protests or political events for fear of being tracked.</p>

      <h3>Potential for Abuse</h3>
      <p>Law enforcement officers or other individuals with access could misuse this data, for example, tracking ex-partners, political rivals, or targeting specific communities without oversight.</p>
    </div>

    <h2 id="not-alpr" :class="{ highlighted: route.hash === '#not-alpr' }">What They Look Like</h2>
    <v-img class="my-4" width="400" src="/flock-camera.jpeg" />
    <p>
      The most common brand of ALPRs in the US is Flock Safety. They are easy to spot because they almost all look the same. They are usually mounted on a standalone black pole with a solar panel on top. The cameras are often placed near intersections or on main roads at the edge of a city or town.
    </p>

    <h2>Not All Cameras are ALPRs</h2>
    <p>
      Not all cameras near roads are ALPRs. Many people mistakenly assume that every traffic camera or intersection camera is an ALPR, but that's not true. Here are some things ALPRs are not:
    </p>

    <div class="ml-4">
      <h3>Traffic Cameras</h3>
      <div class="flex-image">
        <v-img rounded cover aspect-ratio="4/3" width="180" src="/traffic-camera.jpg" />
        <p>Standard traffic cameras typically capture live video or images of intersections to monitor traffic flow and manage signals. They do not specifically focus on reading license plates or storing data long-term.</p>
      </div>

      <h3>Red Light Cameras/Speed Cameras</h3>
      <div class="flex-image">
        <v-img rounded cover aspect-ratio="4/3" width="180" src="/redlight-camera.jpg" />
        <p>These cameras are set up to capture violations, such as running a red light or speeding. They may record plate numbers when a violation is detected, but they do not perform continuous surveillance or collect location data over time.</p>
      </div>

      <h3>Security Cameras</h3>
      <div class="flex-image">
        <v-img rounded cover aspect-ratio="4/3" width="180" src="/security-camera.jpg" />
        <p>Cameras used by businesses or homeowners for security purposes may capture vehicles incidentally, but they are not specifically designed to automatically read and record license plates.</p>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<style scoped>
h2 {
  margin-top: 2rem;
}

h3 {
  margin-top: 1.25rem;
}

p {
  margin-top: 0.5rem;
}

.flex-image {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 0.5rem;
}

li {
  margin-top: 0.5rem;
  margin-left: 1rem;
}

.highlighted {
  background-color: yellow;
  padding: 0.5rem;
  border-radius: 0.25rem;
}
</style>
