<template>
  <v-data-table
    :headers="headers"
    :items="datasets"
    hide-default-footer
    :sort-by="[ { key: 'state', order: 'asc' } ]"
  >
    <template v-slot:item.url="i: any">
      <v-btn variant="text" color="primary" :href="i.item.url" target="_blank" :disabled="!i.item.url">
        <v-icon start>mdi-download</v-icon>
        <span>Download</span>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
const datasets = [
  {
    title: 'Atlanta ALPR Cameras',
    author: 'veroniquedra',
    url: 'https://deflock-clusters.s3.us-east-1.amazonaws.com/maximum_dots.csv',
    description: 'Over 2,000 cameras in the Atlanta area',
  }
];

const headers = [
  { title: 'Title', value: 'title', sortable: false },
  { title: 'Author', value: 'author', sortable: false },
  { title: 'Description', value: 'description', sortable: false },
  { title: '', value: 'url', sortable: false },
];
</script>
