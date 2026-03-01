<template>
  <section
    class="flex min-h-screen flex-col items-center justify-center gap-y-6"
  >
    <AppBranding
      ref="brand-logo"
      class="size-30 rounded-lg blur-sm"
      is-loading
    />

    <ProseP>
      Loading:
      <span class="font-display"
        >{{ Math.ceil((numberOfCompletedTasks / numberOfTasks) * 100) }}%</span
      >
    </ProseP>
  </section>
</template>

<script lang="ts" setup>
const props = defineProps<{ numberOfTasks: number }>();
const { numberOfCompletedTasks } = useTasks();
</script>
