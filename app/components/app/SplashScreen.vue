<template>
  <motion.section
    class="flex min-h-screen flex-col items-center justify-center gap-y-6"
    :animate="{ opacity: 1 }"
    :exit="{ opacity: 0 }"
  >
    <AppBranding ref="brand-logo" class="size-30 rounded-lg" is-loading />
  </motion.section>
</template>

<script lang="ts" setup>
import { motion } from "motion-v";

const brandLogoRef = useTemplateRef("brand-logo");
whenever(
  () => brandLogoRef.value?.svgDrawableAnimation,
  (animation) => {
    animation.onLoop = () => {
      animation.pause();
      emit("animationLoopFinish");
    };
  },
);

const emit = defineEmits<{ animationLoopFinish: [] }>();
</script>
