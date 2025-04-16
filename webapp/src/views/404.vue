<template>
  <v-container>
    <div class="text-center">
      <h1>Page Not Found</h1>
      <div class="mt-8 mb-16">
        <div class="question-mark">?</div>
        <p class="caption">This page cannot be found</p>
      </div>
      <v-btn color="primary" to="/"><v-icon start>mdi-home</v-icon>Home</v-btn>
    </div>
  </v-container>
</template>

<style scoped>
.caption {
  font-size: 1.2rem;
  color: #666;
}
.question-mark {
  font-size: 8rem;
  color: #bbb;
  font-weight: bold;
  margin-bottom: 1.5rem;
}
</style>
