<template>
  <component
    :is="component"
    data-snap-cursor
    :class="
      twMerge(
        'flex cursor-pointer items-center gap-x-1 rounded-full border px-5 py-3 text-sm backdrop-blur-sm transition duration-300 hover:ring focus:ring focus:outline-none lg:gap-x-2 2xl:text-base',
        $props.isActive && 'bg-primary-900/10 dark:bg-primary-100/10',
        $attrs.class as string | undefined,
      )
    "
    :target="$props.target"
    :to="$props.to"
  >
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { twMerge } from "tailwind-merge";

interface UiButtonProps {
  isActive?: boolean;
  target?: string;
  to?: string;
}

const props = defineProps<UiButtonProps>();

// Dynamically render as NuxtLink if 'to' prop is provided, otherwise as button
const component = computed(() =>
  props.to ? resolveComponent("NuxtLink") : "button",
);
</script>
