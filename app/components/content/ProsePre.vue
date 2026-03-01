<template>
  <div class="relative space-y-4">
    <UiButton @click="copy($props.code)">
      <PhosphorIcon
        :name="{ clipboard: !copied, 'clipboard-text': copied }"
        size="20"
        weight="duotone"
      />

      {{ copied ? "Copied" : "Copy" }}
    </UiButton>

    <div
      class="ease-in-out-circ group relative cursor-pointer overflow-hidden rounded-xl border p-3 backdrop-blur-md transition-all duration-300"
      data-snap-cursor
      :style="{ maxHeight }"
      @click="isCollapsible && preElementRef && toggleExpand(preElementRef)"
    >
      <pre
        ref="pre-element"
        :class="
          twMerge(
            'text-sm text-wrap',
            isCollapsible &&
              !isExpanded &&
              'transition-opacity hover:opacity-80',
            $props.class as string | undefined,
          )
        "
      ><slot /></pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { twMerge } from "tailwind-merge";

interface ProsePreProps {
  class?: string | null;
  code?: string;
  filename?: string | null;
  highlights?: number[];
  language?: string | null;
  meta?: string | null;
}

withDefaults(defineProps<ProsePreProps>(), {
  class: null,
  code: "",
  filename: null,
  highlights: () => [],
  language: null,
  meta: null,
});

const { copy, copied } = useClipboard();

const isExpanded = shallowRef(false);
const preElementRef = useTemplateRef("pre-element");
const maxHeight = shallowRef("480px");

watch(preElementRef, (element) => {
  if (!element) return;

  if (element.scrollHeight <= 480) {
    maxHeight.value = "auto";
  }
});

const toggleExpand = (element: HTMLPreElement) => {
  maxHeight.value = isExpanded.value
    ? "480px"
    : `${element.scrollHeight + 24}px`; // Add 24px to account for padding
  useToggle(isExpanded)();
};

const isCollapsible = computed(
  () => preElementRef.value && preElementRef.value.scrollHeight > 480,
);
</script>
