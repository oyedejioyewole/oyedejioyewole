<template>
  <motion.button
    class="flex w-fit justify-center gap-x-2 rounded-xl border-current/30 bg-current/10 px-5 py-3 backdrop-blur-lg transition-all duration-300 hover:gap-x-4 hover:border-current/70 focus:gap-x-4"
    data-snap-cursor
    :while-press="{ scale: 0.9 }"
  >
    <NuxtImg
      v-for="entry of $props.entries"
      :key="entry"
      class="size-6"
      provider="none"
      :src="`https://svgl.app/library/${entry}.svg`"
    />
  </motion.button>
</template>

<script lang="ts" setup>
import { motion } from "motion-v";

interface TechStackProps {
  entries: string[];
}

const props = defineProps<TechStackProps>();
</script>
