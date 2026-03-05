<template>
  <h2 class="font-serif xl:text-2xl 2xl:text-4xl" :id="$props.id">
    <a v-if="$props.id && generate" :href="`#${$props.id}`">
      <slot />
    </a>
    <slot v-else />
  </h2>
</template>

<script lang="ts" setup>
import { computed, useRuntimeConfig } from "#imports";

interface ProseH2Props {
  id?: string;
}

const props = defineProps<ProseH2Props>();

// Generate anchor links for h2 if configured and id is provided
const { headings } = useRuntimeConfig().public.mdc;
const generate = computed(
  () =>
    props.id &&
    ((typeof headings?.anchorLinks === "boolean" &&
      headings?.anchorLinks === true) ||
      (typeof headings?.anchorLinks === "object" && headings?.anchorLinks?.h2)),
);
</script>
