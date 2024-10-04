<template>
  <v-container max-width="1000">
    <h2>About Us</h2>
    <p>
      Welcome to DeFlock, your go-to resource for understanding and addressing the growing presence of Automated License Plate Readers (ALPRs) in our communities.
    </p>

    <h2>Our Mission</h2>
    <p>
      Our mission is simple: to shine a light on the widespread use of ALPR technology, raise awareness about the threats it poses to personal privacy and civil liberties, and empower the public to take action. ALPRs are increasingly being deployed by law enforcement and private companies without the public's full understanding or consent, and they collect vast amounts of data on our movements, often without any real oversight.
    </p>

    <h2>Why This Matters</h2>
    <p>
      Privacy is a fundamental right, and the growing use of ALPRs threatens to erode it. Every day, ALPRs capture and store details about the movements of millions of innocent people, creating a massive database that can be used for anything from routine surveillance to potentially more nefarious purposes. This constant monitoring can deter people from exercising their freedoms, like attending protests or engaging in other forms of free expression, which should concern all of us.
    </p>

    <h2>What We Do</h2>
    <div class="ml-4">
      <h3>Educate</h3>
      <p>
        We provide easy-to-understand information about what ALPRs are, how they work, and why you should care.
      </p>

      <h3>Report &amp; Track</h3>
      <p>
        Through our platform, you can report locations where you spot ALPRs, and view an interactive map showing where these surveillance devices are deployed.
      </p>

      <h3>Advocate for Change</h3>
      <p>
        We encourage communities to stand up against the unchecked spread of these surveillance systems. Together, we can push for greater accountability, stronger privacy protections, and a rollback of invasive surveillance practices.
      </p>
    </div>

    <h2>Get Involved</h2>
    <p>
      Want to help us in our mission? Here are a few ways you can get involved:
    </p>
    <div class="ml-4">
      <h3>Report ALPRs</h3>
      <p>
        If you spot an ALPR in your community, <router-link to="/report">let us know</router-link>! Your reports help us build a more comprehensive picture of where these devices are being used.
      </p>

      <h3>Spread the Word</h3>
      <p>
        Share our site with your friends, family, and social networks to help raise awareness about the dangers of ALPRs.
      </p>
    </div>
  </v-container>
</template>

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
