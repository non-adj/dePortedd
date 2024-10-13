<template>
  <div style="position: relative">
    <v-btn @click="copyToClipboard" icon variant="plain" flat class="copy-button">
      <v-icon>mdi-content-copy</v-icon>
    </v-btn>
    <code ref="codeContent">
      <slot></slot>
    </code>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const codeContent = ref<HTMLElement | null>(null);

function copyToClipboard() {
  if (codeContent.value) {
    navigator.clipboard.writeText(codeContent.value.innerText);
  }
}
</script>

<style scoped>
code {
  background-color: rgb(33,33,33);
  color: white;
  padding: 0.5rem;
  border-radius: 0.25rem;
  display: block;
  margin-top: 0.5rem;
}

.copy-button {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1000;
}
</style>
