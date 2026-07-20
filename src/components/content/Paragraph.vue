<template>
  <p
    :class="
      cn(
        'text-primary-900 dark:text-primary-100 leading-relaxed',
        hasAccent && 'text-current',
        $attrs.class,
      )
    "
  >
    <slot />
  </p>
</template>

<script lang="ts">
import { cn } from "tailwind-variants";

interface Props {
  hasAccent?: boolean;
}
</script>

<script lang="ts" setup>
const { hasAccent = false } = defineProps<Props>();
</script>
