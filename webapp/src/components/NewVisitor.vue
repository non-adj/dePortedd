<template>
  <v-dialog :fullscreen="smAndDown" v-model="show" max-width="900">
    <v-card>
      <v-card-title class="text-center py-4 font-weight-bold">
        <span class="headline">Welcome to DeFlock</span>
      </v-card-title>
        <p class="mx-8">
          DeFlock is a tool to help you learn about Automated License Plate Readers (ALPRs) in your area. Here's how it works:
        </p>
      <v-container>
        <v-row>

          <v-col cols="12" sm="6">
            <v-card flat class="pa-4">
              <v-row class="align-center">
                <v-col>
                  <v-img width="140" src="/step1.png" />
                </v-col>
                <v-col>
                  <h4 class="no-small">
                    Each Circle represents an Automated License Plate Reader.
                  </h4>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          
          <v-col cols="12" sm="6">
            <v-card flat class="pa-4">
                <v-row class="align-center">
                <v-col>
                  <v-img width="140" src="/step2.png" />
                </v-col>
                <v-col >
                  <h4 class="no-small">
                    Zoom in to see which direction each ALPR is facing.
                  </h4>
                </v-col>
              </v-row>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6">
            <v-card flat class="pa-4">
                <v-row class="align-center">
                <v-col>
                  <v-img width="140" src="/step3.png" />
                </v-col>
                <v-col>
                  <h4 class="no-small">
                    Please check our list of <a href="/operators">Known Operators</a> and report missing ALPRs near you.
                  </h4>
                </v-col>
              </v-row>
            </v-card>
          </v-col>

        </v-row>
      </v-container>
      <div class="text-center mx-4 mb-2">Map data from <a href="https://openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>. By using this site, you agree to our <router-link to="/legal">Terms of Service</router-link>.</div>
      <v-card-actions>
        <v-btn class="w-100" size="x-large" color="primary" variant="elevated" @click="acknowledge">Got it</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useDisplay } from 'vuetify';

const { smAndDown } = useDisplay();

const show = ref(false);

onMounted(() => {
  if (!localStorage.getItem('acknowledged')) {
    show.value = true;
  }
});

function acknowledge() {
  show.value = false;
  localStorage.setItem('acknowledged', 'true');
}
</script>

<style scoped>
.no-small {
  min-width: 160px;
}
</style>
