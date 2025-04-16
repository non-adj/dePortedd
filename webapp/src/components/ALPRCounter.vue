<template>
  <div class="counter">
    <span :class="{ mobile: isMobile }" ref="counterEl" class="font-weight-bold">0</span>
    <span class="caption">&nbsp;Visa Revocations Tracked</span>
    <div :class="{ 'fade-in': showFinalAnimation }" class="subheading fade-text">and counting</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { useDisplay } from 'vuetify'
import { mockVisaRevocations } from '@/types';
import { CountUp } from 'countup.js';

const props = defineProps({
  delayMs: {
    type: Number,
    default: 200,
  }
});

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
const showFinalAnimation = ref(false);
const { xs: isMobile } = useDisplay();

let timeOfMount: number|undefined = undefined;

onMounted(() => {
  timeOfMount = new Date().getTime();
  const total = mockVisaRevocations.length;
  countUp(total);
});

function countUp(total: number) {
  if (!counterEl.value) {
    console.error('Counter element not found');
    return;
  };

  if (!counter) {
    counter = new CountUp(counterEl.value, total, countupOptions);

    if (timeOfMount) {
      const timeSinceMount = new Date().getTime() - timeOfMount;
      if (timeSinceMount < props.delayMs) {
        setTimeout(() => {
          counter?.start();
        }, props.delayMs - timeSinceMount);
      } else {
        counter.start();
      }
    }

    setTimeout(() => {
      showFinalAnimation.value = true;
    }, 2500);
  }
}
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
