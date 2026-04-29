<template>
  <svg
    v-show="showTransition"
    class="fixed left-0 z-10 scale-150 will-change-transform"
    fill="none"
    height="100%"
    preserveAspectRatio="xMidYMid slice"
    viewBox="0 0 1316 664"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      ref="transition-path"
      d="M13.4746 291.27C13.4746 291.27 100.646 -18.6724 255.617 16.8418C410.588 52.356 61.0296 431.197 233.017 546.326C431.659 679.299 444.494 21.0125 652.73 100.784C860.967 180.556 468.663 430.709 617.216 546.326C765.769 661.944 819.097 48.2722 988.501 120.156C1174.21 198.957 809.424 543.841 988.501 636.726C1189.37 740.915 1301.67 149.213 1301.67 149.213"
      stroke="currentColor"
      :stroke-width="isSmallBreakpoint ? 250 : 2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script lang="ts" setup>
import { animate } from "animejs/animation";
import { createDrawable } from "animejs/svg";
import { breakpointsTailwind } from "@vueuse/core";

const showTransition = shallowRef(false);
const breakpoints = useBreakpoints(breakpointsTailwind);

const isSmallBreakpoint = breakpoints.smaller("xl");

const transitionPathRef = useTemplateRef("transition-path");
const drawablePath = computed(() => {
  if (!transitionPathRef.value) return null;

  return createDrawable(transitionPathRef.value);
});

function exit(onComplete: () => void = function () {}) {
  if (!drawablePath.value) return;

  animate(drawablePath.value, {
    draw: ["0 1", "1 1"],
    duration: 1200,
    ease: "outQuart",
    ...(!breakpoints.isSmaller("xl") && { strokeWidth: [250, 2] }),
    onComplete() {
      showTransition.value = false;
      onComplete();
    },
  });
}

function enter(onComplete: () => void = function () {}) {
  if (!drawablePath.value) return;

  showTransition.value = true;

  animate(drawablePath.value, {
    draw: ["0 0", "0 1"],
    duration: 1200,
    ease: "inQuart",
    ...(!breakpoints.isSmaller("xl") && { strokeWidth: [2, 250] }),
    onComplete,
  });
}

defineExpose({
  enter,
  exit,
});
</script>
