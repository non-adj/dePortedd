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
                    Each Circle represents an Automated License Plate Reader (ALPR).
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
                    The red area extending from the ALPR show which direction the camera faces.
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
                    Click on an ALPR to view more information about it.
                  </h4>
                </v-col>
              </v-row>
            </v-card>
          </v-col>

        </v-row>
      </v-container>
      <v-card-actions>
        <v-btn class="w-100" color="primary" variant="tonal" @click="acknowledge">Got it</v-btn>
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
