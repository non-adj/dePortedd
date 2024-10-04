<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref } from 'vue'

const items = [
  { title: 'Map', icon: 'mdi-map', to: '/' },
  { title: 'What is an ALPR?', icon: 'mdi-cctv', to: '/what-is-an-alpr' },
  { title: 'Report an ALPR', icon: 'mdi-map-marker-plus', to: '/report' },
  { title: 'Feature Roadmap', icon: 'mdi-road-variant', to: '/roadmap' },
  { title: 'About', icon: 'mdi-information', to: '/about' },
  { title: 'Contact', icon: 'mdi-email', to: '/contact' },
]
const drawer = ref(false)
</script>

<template>
  <v-app>
    <v-app-bar
      flat
      prominent
    >
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <v-img height="36" width="130" src="/deflock-logo.svg" />
      </v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      temporary
    >
      <v-list nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.to"
        ><v-icon start>{{ item.icon }}</v-icon>{{ item.title }}</v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>
