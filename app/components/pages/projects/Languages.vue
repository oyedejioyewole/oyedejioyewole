<template>
  <Motion
    as="ul"
    class="flex w-fit justify-center gap-x-2 rounded-xl border-current/30 bg-current/10 px-5 py-3 backdrop-blur-lg transition-all duration-300 hover:gap-x-4 hover:border-current/70 focus:gap-x-4"
    data-snap-cursor
  >
    <li v-for="entry of $props.entries" :key="entry">
      <NuxtIcon class="size-6" :name="`devicon:${entry}`" />
    </li>

    <span class="sr-only">Expand my skills</span>
  </Motion>
</template>

<script lang="ts" setup>
interface TechStackProps {
  entries: string[];
}

const props = defineProps<TechStackProps>();
</script>
