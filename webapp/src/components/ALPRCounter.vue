<template>
  <div class="counter">
    <span :class="{ mobile: isMobile }" ref="counterEl" class="font-weight-bold">0</span>
    <span class="caption">&nbsp;ALPRs Reported Worldwide</span>
    <div :class="{ 'fade-in': showFinalAnimation }" class="subheading fade-text">and rapidly growing!</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, type Ref } from 'vue';
import { useDisplay } from 'vuetify'
import { getALPRCounts } from '@/services/apiService';
import { CountUp } from 'countup.js';

const counterEl: Ref<HTMLElement|null> = ref(null);
const countupOptions = {
  useEasing: true,
  useGrouping: true,
  separator: ',',
  decimal: '.',
  prefix: '',
  suffix: '',
};
let counter: CountUp|undefined = undefined;
interface Counts {
  us?: number;
  worldwide?: number;
}
const counts: Ref<Counts> = ref({
  us: undefined,
  worldwide: undefined,
});
const showFinalAnimation = ref(false);
const { xs: isMobile } = useDisplay();

onMounted(() => {
  getALPRCounts().then((response) => {
    counts.value = response;
  });
});

watch(counts, (newCounts: Counts) => {
  if (!newCounts.worldwide) return;
  if (!counterEl.value) {
    console.error('Counter element not found');
    return;
  };

  if (!counter) {
    counter = new CountUp(counterEl.value, newCounts.worldwide, countupOptions);
    setTimeout(() => {
      counter?.start();
    }, 500);
    setTimeout(() => {
      showFinalAnimation.value = true;
    }, 3000);
  }
});
</script>

<style scoped>
.counter {
  font-size: 1.5rem;
}

.subheading {
  font-weight: bold;
  font-size: 0.9rem;
}

.fade-text {
  opacity: 0;
  transition: opacity 1s ease;
}

.fade-in {
  opacity: 1;
}

.mobile {
  display: block;
  font-size: 1.2em;
}
</style>
