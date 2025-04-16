<template>
<Hero
  imageUrl="/documents.jpg"
  title="Why NOT to Submit a FOIA"
  description="Understand the risks and futility of filing a FOIA request as a student facing visa revocation or deportation."
/>

<v-container class="mb-12">
  <h2>Why You Should Not File a FOIA Request</h2>
  <p>
    While public records laws (FOIA) are often promoted as a tool for transparency, in the context of student visa revocations and deportations, filing a FOIA request can do more harm than good. Here’s why:
  </p>
  <ul>
    <li><b>Financial Risk:</b> FOIA requests often incur records fees, which can become a debt. For students already facing financial hardship or instability, this can add unnecessary burden.</li>
    <li><b>Draws Suspicion:</b> Filing a FOIA request about deportations or visa revocations can draw unwanted attention to yourself. In some cases, it may make you a target for further scrutiny or retaliation by authorities or your institution.</li>
    <li><b>No Real Legal Recourse:</b> The deportation and visa revocation process is often carried out rapidly and, in many cases, without due process. Students typically have only 15 days to leave the country after revocation, and legal aid is limited to advice—not representation. Even if you obtain records, there is almost nothing you can do with that information to stop or reverse the process.</li>
    <li><b>Systemic Injustice:</b> The fact that FOIA is not a viable tool for students in crisis is a wake-up call about the lack of justice and transparency in the system. The process is stacked against students, and legal channels are often ineffective or inaccessible.</li>
  </ul>
  <h2>What Should You Do Instead?</h2>
  <p>
    If you or someone you know is facing a student visa revocation or deportation, focus on seeking immediate support from trusted legal aid organizations, campus resources, and advocacy groups. Document your situation privately, reach out for emotional support, and avoid actions that could put you at further risk.
  </p>
  <v-alert class="mt-8" type="warning" variant="tonal">
    <b>Remember:</b> The system is not designed to protect you, and traditional legal processes like FOIA are unlikely to help. Protect yourself and your community by staying informed and seeking support—not by making yourself a target.
  </v-alert>
</v-container>

<Footer />

</template>

<script setup lang="ts">
import { useSeoMeta } from '@unhead/vue';
import Hero from '@/components/layout/Hero.vue';
import Footer from '@/components/layout/Footer.vue';

useSeoMeta({
  title: 'Why NOT to Submit a FOIA | DePortedd',
  description: 'Understand the risks and futility of filing a FOIA request as a student facing visa revocation or deportation.',

  ogTitle: 'Why NOT to Submit a FOIA',
  ogDescription: 'Understand the risks and futility of filing a FOIA request as a student facing visa revocation or deportation.',
  ogImage: 'https://deflock.me/documents.jpg',
});
</script>

<style lang="css" scoped>
@import url('@/assets/typography.css');

blockquote {
  margin: 1em 0;
  padding-left: 1em;
  border-left: 4px solid #ccc;
}
</style>
