<template>
  <PagesSection no-divider>
    <div ref="scope" class="space-y-8">
      <slot />
    </div>
  </PagesSection>
</template>

<script lang="ts" setup>
import { useAnimate, stagger, useInView } from "motion-v";

const [scope, animate] = useAnimate();
const isInView = useInView(scope);

watch(isInView, (inView) => {
  if (inView) {
    animate(
      ":scope > *",
      { y: [20, 0], opacity: [0, 1], scale: [0.9, 1] },
      { delay: stagger(0.1) },
    );
  }
});
</script>
