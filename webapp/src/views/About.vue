<template>
  <v-container max-width="1000" class="mb-16">
    <h2>About Us</h2>
    <p>
      Welcome to DePortedd, a project forked from the original DeFlock ALPR tracker. In light of recent news and growing concern about student visa revocations and deportations in the United States, we created this platform to bring transparency and awareness to this urgent issue.
    </p>

    <h2>Our Mission</h2>
    <p>
      Our mission is simple: to shine a light on the increasing number of student visa revocations and deportations, raise awareness about the impact on students and educational institutions, and empower the public to take action. Student visa revocations can disrupt lives, academic careers, and communities, often with little public visibility or accountability.
    </p>

    <h2>Why This Matters</h2>
    <p>
      The ability to study and thrive in the United States is a dream for many international students. Recent trends and policy changes have led to a rise in student visa revocations and deportations, sometimes for minor infractions or misunderstandings. These actions can have devastating consequences for individuals and their families, and can also affect the reputation and diversity of our schools and colleges.
    </p>

    <h2>What We Do</h2>
    <div class="ml-4">
      <h3>Educate</h3>
      <p>
        We provide clear information about student visa policies, rights, and the real-world impact of revocations and deportations.
      </p>

      <h3>Report &amp; Track</h3>
      <p>
        Through our platform, you can report student visa revocation cases and view an interactive map showing where these events are happening, with breakdowns by state and school.
      </p>

      <h3>Advocate for Change</h3>
      <p>
        We encourage students, educators, and communities to stand up for fair treatment and due process. Together, we can push for greater transparency, accountability, and support for international students.
      </p>
    </div>

    <h2>Get Involved</h2>
    <p>
      Want to help us in our mission? Here are a few ways you can get involved:
    </p>
    <div class="ml-4">
      <h3>Report Student Visa Revocations</h3>
      <p>
        If you know of a student visa revocation or deportation, <router-link to="/report">let us know</router-link>! Your reports help us build a more comprehensive picture of where and why these events are happening.
      </p>

      <h3>Spread the Word</h3>
      <p>
        Share our site with your friends, classmates, and networks to help raise awareness about the impact of student visa revocations.
      </p>
    </div>
  </v-container>

  <Footer />
</template>

<script setup lang="ts">
import Footer from '@/components/layout/Footer.vue';
</script>

<style scoped>
/* TODO: put this all in one place, also in what-is view */
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

/* as you can see, this one is the most updated */
a {
  color: var(green);
  text-decoration: none;
}
</style>
