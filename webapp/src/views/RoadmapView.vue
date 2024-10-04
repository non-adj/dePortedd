<template>
  <v-container max-width="1000">
    <h1>Feature Roadmap</h1>

    <h2>Current Features</h2>
    <div class="ml-4">
      <h3><v-icon start>mdi-map</v-icon>Map</h3>
      <p>
        View an interactive map showing where ALPRs are deployed.
      </p>

      <h3><v-icon start>mdi-map-marker-plus</v-icon>Report an ALPR (third party)</h3>
      <p>
        Report locations where you spot ALPRs on OpenStreetMap with links and instructions on how to do so.
      </p>
    </div>

    <h2>Upcoming Features</h2>
    <div class="ml-4">
      <h3><v-icon start>mdi-map-marker-plus</v-icon>Report an ALPR on this Site</h3>
      <p>
        Report ALPRs directly from this site, without having to use the OSM Editor or copy and paste object tags.
      </p>

      <h3><v-icon start>mdi-navigation</v-icon>Navigation Around ALPRs</h3>
      <p>
        We're working on a feature that will help you navigate around ALPRs, so you can avoid them if you choose.
      </p>
    </div>
  </v-container>
</template>

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
</style>
