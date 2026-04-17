<template>
  <svg
    class="fixed left-0 scale-150"
    fill="none"
    height="100%"
    preserveAspectRatio="xMidYMid slice"
    viewBox="0 0 1316 664"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.path
      d="M13.4746 291.27C13.4746 291.27 100.646 -18.6724 255.617 16.8418C410.588 52.356 61.0296 431.197 233.017 546.326C431.659 679.299 444.494 21.0125 652.73 100.784C860.967 180.556 468.663 430.709 617.216 546.326C765.769 661.944 819.097 48.2722 988.501 120.156C1174.21 198.957 809.424 543.841 988.501 636.726C1189.37 740.915 1301.67 149.213 1301.67 149.213"
      stroke="currentColor"
      stroke-width="250"
      stroke-linecap="round"
      stroke-linejoin="round"
      :initial="{ pathLength: 0 }"
      :animate="{
        pathLength: [0, 1, 0],
        pathOffset: [0, 0, 1],
      }"
      :transition="transitionOptions"
      @animation-complete="
        props.isReady &&
        console.log('Animation complete, emitting dismiss event') &&
        $emit('dismiss')
      "
    />
  </svg>
</template>

<script lang="ts" setup>
import { motion } from "motion-v";

const transitionOptions = computed(() => ({
  ease: "circInOut",
  duration: 2.4,
  repeat: !props.isReady ? Infinity : 0,
  repeatType: "reverse",
}));

const props = defineProps<{ isReady?: boolean }>();
const emit = defineEmits<{ dismiss: [] }>();
</script>
