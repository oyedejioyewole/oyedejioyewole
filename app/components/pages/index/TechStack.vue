<template>
  <div class="flex gap-x-6">
    <NuxtImg
      v-for="entry of $props.entries"
      :key="entry"
      data-snap-cursor
      provider="none"
      :class="['size-5 xl:size-7.5', entry === 'rust' && 'dark:invert']"
      :src="`https://svgl.app/library/${entry}.svg`"
      @load="completeTask('tech-stack')"
    />
  </div>
</template>

<script lang="ts" setup>
interface TechStackProps {
  entries: string[];
}

const props = defineProps<TechStackProps>();

const { completeTask } = useTasks();
</script>
