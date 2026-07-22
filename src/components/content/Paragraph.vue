<template>
  <p
    :class="[
      $props.hasAccent
        ? 'text-current'
        : 'text-primary-900 dark:text-primary-100',
      ' leading-relaxed',
    ]"
  >
    <slot />
  </p>
</template>

<script lang="ts">
interface Props {
  hasAccent?: boolean;
}
</script>

<script lang="ts" setup>
defineProps<Props>();
</script>
