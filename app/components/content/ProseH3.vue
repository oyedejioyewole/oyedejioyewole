<template>
  <h3 class="font-serif text-2xl" :id="$props.id">
    <a v-if="$props.id && generate" :href="`#${$props.id}`">
      <slot />
    </a>
    <slot v-else />
  </h3>
</template>

<script lang="ts" setup>
import { computed, useRuntimeConfig } from "#imports";

interface ProseH3Props {
  id?: string;
}

const props = defineProps<ProseH3Props>();

// Generate anchor links for h3 if configured and id is provided
const { headings } = useRuntimeConfig().public.mdc;
const generate = computed(
  () =>
    props.id &&
    ((typeof headings?.anchorLinks === "boolean" &&
      headings?.anchorLinks === true) ||
      (typeof headings?.anchorLinks === "object" && headings?.anchorLinks?.h3)),
);
</script>
