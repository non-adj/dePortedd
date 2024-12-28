<template>
  <div style="position: relative">
    <v-btn color="white" @click="copyToClipboard" icon variant="plain" flat class="copy-button">
      <v-icon>mdi-content-copy</v-icon>
    </v-btn>
    <code ref="codeContent">
      <slot></slot>
    </code>
    <v-snackbar color="#0081ac" v-model="snackbarOpen" :timeout="3000">
      Copied to clipboard!
      <template v-slot:actions>
        <v-btn
          variant="text"
          @click="snackbarOpen = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const codeContent = ref<HTMLElement | null>(null);
const snackbarOpen = ref(false);

function copyToClipboard() {
  if (codeContent.value) {
    navigator.clipboard.writeText(codeContent.value.innerText)
      .then(() => snackbarOpen.value = true)
      .catch(() => console.error('Failed to copy to clipboard'));
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
  overflow-x: scroll;
}

code {
  white-space: nowrap;
}

.copy-button {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1000;
}
</style>
