<template>
  <a
    :class="
      cn(
        'hover:text-primary-700 dark:hover:text-primary-300 relative inline-block font-serif tracking-wide group/link',
        $attrs.class,
      )
    "
    data-snap-cursor
  >
    <slot />

    <span
      class="absolute inset-x-0 bottom-0 h-px origin-bottom bg-current transition-all duration-300 group-hover/link:bottom-[35%] group-hover/link:h-0.5"
    ></span>
  </a>
</template>

<script lang="ts" setup>
import { cn } from "tailwind-variants";
</script>
