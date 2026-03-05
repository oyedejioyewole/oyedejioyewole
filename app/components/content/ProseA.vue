<template>
  <NuxtLink
    class="hover:text-primary-700 dark:hover:text-primary-300 prose-link relative inline-block font-serif tracking-wide"
    data-snap-cursor
    :href="$props.href"
    :target="$props.target"
  >
    <slot />

    <!-- Animated underline that rises on hover -->
    <span
      class="absolute inset-x-0 -bottom-0.5 h-px origin-bottom bg-current transition-all duration-300"
    />
  </NuxtLink>
</template>

<style scoped>
.prose-link:hover span {
  bottom: 35%;
  height: 0.125rem;
}
</style>

<script lang="ts" setup>
type AnchorTarget =
  | "_blank"
  | "_parent"
  | "_self"
  | "_top"
  | (string & object)
  | null
  | undefined;

interface ProseAProps {
  href?: string;
  target?: AnchorTarget;
}

defineProps<ProseAProps>();
</script>
