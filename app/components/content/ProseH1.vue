<template>
  <h1 class="font-display text-5xl tracking-tighter" :id="$props.id">
    <a v-if="generate" :href="`#${$props.id}`">
      <slot />
    </a>
    <slot v-else />
  </h1>
</template>

<script lang="ts" setup>
interface ProseH1Props {
  id?: string;
}

const props = defineProps<ProseH1Props>();

// Generate anchor links for h1 if configured and id is provided
const { headings } = useRuntimeConfig().public.mdc;
const generate = computed(
  () =>
    props.id &&
    ((typeof headings?.anchorLinks === "boolean" &&
      headings?.anchorLinks === true) ||
      (typeof headings?.anchorLinks === "object" && headings?.anchorLinks?.h1)),
);
</script>
