<template>
  <v-container fluid>
    <v-row justify="center" class="hero-section-whatis text-center mb-4">
    </v-row>
  </v-container>
  
  <v-container class="info-section">
    <h1 class="mt-0">What is a Student Visa Revocation?</h1>
    <p>
      A student visa revocation is when the U.S. government cancels the legal status of an international student’s visa, often forcing them to leave the country immediately or face deportation. This can happen for a variety of reasons, including academic issues, alleged violations of visa terms, or changes in government policy. Sometimes, revocations occur suddenly and without warning, leaving students with little time to respond or seek help.
    </p>

    <h2>How Does It Impact International Students?</h2>
    <p>
      The consequences of a student visa revocation are severe. Students may be forced to abandon their studies, lose tuition and housing investments, and face long-term bans from re-entering the United States. The emotional toll can be devastating, affecting mental health, family stability, and future opportunities. Many students also fear stigma or retaliation if their situation becomes public.
    </p>

    <h2>Why Aren't TRIO or DACA Enough?</h2>
    <p>
      While programs like <b>TRIO</b> and <b>DACA</b> provide support and protection for some immigrant and first-generation students, they do not cover most international students on F-1 or J-1 visas. TRIO programs are designed for U.S. citizens and permanent residents, and DACA only applies to certain undocumented immigrants who arrived as children. International students remain especially vulnerable, with few legal protections or advocacy resources when facing visa revocation or deportation.
    </p>

    <h2>Data Brokers & Student Surveillance</h2>
    <p>
      Data brokers are companies that collect, aggregate, and sell information about individuals—including international students. These organizations often work with government agencies, law enforcement, and private institutions to track, profile, and sometimes wrongly accuse students of violations or crimes they did not commit. Their activities can lead to visa revocations, deportations, and loss of privacy for students.
    </p>
    <ul>
      <li><b>LexisNexis</b>: Provides investigative tools and databases to law enforcement and immigration authorities. Their data has been used to accuse students of crimes or visa violations, sometimes without due process or accurate evidence.</li>
      <li><b>Deep Sync (American Student List)</b>: Specializes in deanonymizing online activity and selling lists of student data to third parties, including government agencies and marketers. This can put students at risk of targeted surveillance or unwanted attention.</li>
      <li><b>Experian</b>: One of the largest credit reporting agencies, Experian also sells data on students and immigrants to marketers, background check companies, and sometimes government agencies, enabling profiling and targeting.</li>
      <li><b>Acxiom</b>: Aggregates vast amounts of personal data, including education and immigration status, and provides detailed profiles to clients in law enforcement, government, and private industry, which can be used to justify surveillance or revocation actions.</li>
      <li><b>CoreLogic</b>: Specializes in property, financial, and background data, and provides information to landlords, schools, and government agencies that can be used to track, screen, or flag students for investigation or removal.</li>
    </ul>

    <h2>Why This Matters</h2>
    <p>
      International students contribute to the academic, cultural, and economic life of the United States. When their visas are revoked, it not only disrupts their lives, but also impacts campuses and communities nationwide. By tracking and sharing these stories, we hope to raise awareness, support affected students, and advocate for fairer policies.
    </p>

    <h2>Resources & Support</h2>
    <ul>
      <li><a href="#" target="_blank">Legal Aid for International Students (placeholder)</a></li>
      <li><a href="#" target="_blank">Know Your Rights: Student Visa Holders (placeholder)</a></li>
      <li><a href="#" target="_blank">Mental Health Support (placeholder)</a></li>
    </ul>
  </v-container>
  <Footer />
</template>

<script setup lang="ts">
import Footer from '@/components/layout/Footer.vue';
</script>

<style scoped>
@import url('@/assets/typography.css');

h1, h2 {
  text-align: center;
}

.hero-section-whatis {
  background: url('/flock-camera.jpeg') no-repeat right center;
  background-size: cover;
  color: white;
  position: relative;
  height: 400px;
}
</style>
