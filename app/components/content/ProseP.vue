<template>
  <p
    :class="
      twMerge(
        'text-primary-900 dark:text-primary-100 leading-relaxed 2xl:text-lg',
        hasAccent && 'text-current dark:text-current',
        $attrs.class as string | undefined,
      )
    "
  >
    <slot />
  </p>
</template>

<script lang="ts" setup>
import { twMerge } from "tailwind-merge";

interface ProsePProps {
  hasAccent?: boolean;
}

defineProps<ProsePProps>();
</script>
