<template>
  <div class="flex gap-x-6">
    <MotionNuxtImg
      v-for="(entry, index) of $props.entries"
      :key="entry"
      provider="none"
      :class="['size-5 xl:size-7.5', entry === 'rust' && 'dark:invert']"
      :initial="{ opacity: 0, y: 20, scale: 0.5 }"
      :src="`https://svgl.app/library/${entry}.svg`"
      :transition="{ delay: index * 0.1 }"
      :while-in-view="{ opacity: 1, y: 0, scale: 1 }"
    />
  </div>
</template>

<script lang="ts" setup>
import { motion } from "motion-v";

const MotionNuxtImg = motion.create(resolveComponent("NuxtImg"));

interface TechStackProps {
  entries: string[];
}

defineProps<TechStackProps>();
</script>
