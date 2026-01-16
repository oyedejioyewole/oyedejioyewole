<script setup lang="ts">
const props = defineProps({
  code: {
    type: String,
    default: "",
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
});

const { copy, copied } = useClipboard();
</script>

<template>
  <div class="space-y-4">
    <button
      class="px-5 py-3 flex gap-x-2 items-center border rounded-xl hover:ring backdrop-blur-sm"
      data-snap-cursor
      @click="copy($props.code)"
    >
      <PhosphorIcon
        :name="{ clipboard: !copied, 'clipboard-text': copied }"
        size="20"
        weight="duotone"
      />

      {{ copied ? "Copied" : "Copy" }}
    </button>

    <pre
      class="dark:bg-primary-100/10 p-5 bg-primary-900/10 rounded-xl border backdrop-blur-sm text-wrap"
      data-snap-cursor
      :class="$props.class"
    ><slot /></pre>
  </div>
</template>
