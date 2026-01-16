<script setup lang="ts">
const props = defineProps<{
  forIcon?: boolean;
  target?: string;
  to?: string;
  isActive?: boolean;
}>();

const component = computed(() =>
  props.to ? resolveComponent("NuxtLink") : "button",
);
</script>

<template>
  <component
    class="border rounded-full hover:ring"
    data-snap-cursor
    :class="{
      'p-3': $props.forIcon,
      'px-5 py-3 lg:px-10 lg:py-5 lg:text-lg backdrop-blur-sm flex items-center gap-x-1 lg:gap-x-2':
        !$props.forIcon,
      'bg-primary-900/10 dark:bg-primary-100/10': $props.isActive,
    }"
    :is="component"
    :target="$props.target"
    :to="$props.to"
  >
    <slot />
  </component>
</template>
