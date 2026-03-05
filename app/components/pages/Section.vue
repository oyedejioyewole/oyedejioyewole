<template>
  <!-- Full-height section with optional two-column layout -->
  <div class="space-y-4">
    <section
      ref="section-container"
      :class="
        twMerge(
          'relative grid min-h-screen',
          $props.multiColumn
            ? 'place-items-center max-xl:grid-rows-2 xl:grid-cols-2'
            : 'mx-auto flex max-w-lg flex-col items-center justify-center gap-y-8 text-center',
          $attrs.class as string | undefined,
        )
      "
    >
      <slot />
    </section>

    <UiPageDivider class="mx-auto w-full" v-if="!$props.noDivider" />
  </div>
</template>

<script lang="ts" setup>
import { twMerge } from "tailwind-merge";

interface SectionProps {
  multiColumn?: boolean;
  noDivider?: boolean;
}

const sectionContainerRef = useTemplateRef("section-container");

defineExpose({
  sectionContainerRef,
});
defineProps<SectionProps>();
</script>
