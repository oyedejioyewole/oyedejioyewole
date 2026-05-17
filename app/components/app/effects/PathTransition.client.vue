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
      ref="scope"
      d="M13.4746 291.27C13.4746 291.27 100.646 -18.6724 255.617 16.8418C410.588 52.356 61.0296 431.197 233.017 546.326C431.659 679.299 444.494 21.0125 652.73 100.784C860.967 180.556 468.663 430.709 617.216 546.326C765.769 661.944 819.097 48.2722 988.501 120.156C1174.21 198.957 809.424 543.841 988.501 636.726C1189.37 740.915 1301.67 149.213 1301.67 149.213"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-width="isDesktop ? 2 : 250"
    />
  </svg>
</template>

<script lang="ts" setup>
import { useAnimate } from "motion-v";
import { breakpointsTailwind } from "@vueuse/core";

const showTransition = shallowRef(false);
const breakpoints = useBreakpoints(breakpointsTailwind);

const [scope, animate] = useAnimate();

const isDesktop = breakpoints.greaterOrEqual("xl");

function exit(onComplete: () => void) {
  animate(
    scope.value,
    {
      pathLength: [1, 0],
      pathOffset: [0, 1],
      ...(isDesktop.value && { strokeWidth: [250, 2] }),
    },
    {
      duration: 1,
      onComplete() {
        onComplete();
        showTransition.value = false;
      },
    },
  );
  return;
}

function enter(onComplete: () => void) {
  showTransition.value = true;

  animate(
    scope.value,
    {
      pathLength: [0, 1],
      pathOffset: [0, 0],
      ...(isDesktop.value && { strokeWidth: [2, 250] }),
    },
    { duration: 1, onComplete },
  );
}

defineExpose({
  enter,
  exit,
});
</script>
