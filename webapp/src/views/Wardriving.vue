<template>
  <Hero
    title="Flyers and Posters"
    description="Help raise awareness about student visa revocations and deportations by sharing informational flyers and posters on your campus."
    imageUrl="/deflock-poster.pdf"
  />
  <v-container class="mb-16">
    <h2>Why Flyers and Posters?</h2>
    <p>
      One of the most effective ways to support international students and raise awareness about student visa revocations is through grassroots outreach. By posting flyers and posters in common areas, dorms, and student centers, you can help inform others about their rights, available resources, and the impact of deportations on your campus community.
    </p>

    <h2>How to Get Started</h2>
    <p>
      Download and print our <a href="/deflock-poster.pdf" target="_blank">informational flyer</a> or create your own. Make sure to include information about how to report a revocation, where to find support, and why this issue matters.
    </p>
    <p>
      Before posting, check your campus policies about flyers and posters. Always be respectful of school rules and local laws.
    </p>

    <h2>Share Your Efforts</h2>
    <p>
      If you post a flyer or organize an awareness event, let us know! You can email us photos or stories, and we may feature your efforts (with permission) to inspire others.
    </p>
    <div class="text-center mt-12">
      <v-btn href="/deflock-poster.pdf" target="_blank" color="rgb(18, 151, 195)"><v-icon start>mdi-download</v-icon>Download Flyer</v-btn>
    </div>
  </v-container>
  <Footer />
</template>

<script setup lang="ts">
import Hero from '@/components/layout/Hero.vue';
import Footer from '@/components/layout/Footer.vue';
</script>

<style scoped>
@import url('@/assets/typography.css');
</style>
