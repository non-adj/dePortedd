<template>
  <v-data-table
    :headers="headers"
    :items="datasets"
    hide-default-footer
    :sort-by="[ { key: 'state', order: 'asc' } ]"
  >
    <template v-slot:item.author="i: any">
      <a v-if="i.item.authorUrl" :href="i.item.authorUrl" target="_blank">{{ i.item.author }}</a>
      <span v-else>{{ i.item.author }}</span>
    </template>
    <template v-slot:item.url="i: any">
      <v-btn variant="text" color="primary" :href="i.item.url" target="_blank" :disabled="!i.item.url">
        <v-icon start>mdi-download</v-icon>
        <span>Download ({{ i.item.type }})</span>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
const datasets = [
  {
    title: 'Wi-Fi Hits',
    author: 'Ryan O\'Horo',
    authorUrl: 'https://www.ryanohoro.com/post/spotting-flock-safety-s-falcon-cameras',
    url: 'https://deflock-clusters.s3.us-east-1.amazonaws.com/Flock-_______20240530_124303.csv',
    description: 'Crowdsourced Wi-Fi hits from Flock Safety cameras',
    type: 'csv',
  },
  {
    title: 'External Battery (Bluetooth) Hits - Flock',
    author: 'Ryan O\'Horo',
    authorUrl: 'https://www.ryanohoro.com/post/spotting-flock-safety-s-falcon-cameras',
    url: 'https://deflock-clusters.s3.us-east-1.amazonaws.com/FS+Ext+Battery_20240530_105846.csv',
    description: 'Crowdsourced Bluetooth hits from Flock Safety cameras with "Flock" radio name',
    type: 'csv',
  },
  {
    title: 'External Battery (Bluetooth) Hits - Penguin',
    author: 'Ryan O\'Horo',
    authorUrl: 'https://www.ryanohoro.com/post/spotting-flock-safety-s-falcon-cameras',
    url: 'https://deflock-clusters.s3.us-east-1.amazonaws.com/Penguin-___________20240530_111436.csv',
    description: 'Crowdsourced Bluetooth hits from Flock Safety cameras with "Penguin" radio name',
    type: 'csv',
  },
  {
    title: 'Atlanta, GA ALPRs',
    author: 'veroniquedra',
    authorUrl: null,
    url: 'https://deflock-clusters.s3.us-east-1.amazonaws.com/maximum_dots.csv',
    description: 'Over 2,000 cameras in the Atlanta area',
    type: 'csv',
  },
  {
    title: 'Akron, Ohio ALPRs',
    author: 'organizers of Akron Ohio',
    authorUrl: null,
    url: 'https://deflock-clusters.s3.us-east-1.amazonaws.com/Pigvision.csv',
    description: 'Crowdsourced Bluetooth hits from Flock Safety cameras with "Penguin" radio name',
    type: 'csv',
  },
];

const headers = [
  { title: 'Title', value: 'title', sortable: false },
  { title: 'Author', value: 'author', sortable: false },
  { title: 'Description', value: 'description', sortable: false },
  { title: '', value: 'url', sortable: false },
];
</script>
