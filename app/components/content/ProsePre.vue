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

const { copy } = useClipboard();
const copyToClipboard = async () => {
  await copy(props.code);
  push.success("Copied snippet to clipboard!");
};
</script>

<template>
  <div
    class="relative flex flex-col gap-y-5 dark:bg-primary-100/10 p-5 bg-primary-900/10 rounded-2xl border backdrop-blur-sm"
    data-snap-cursor
  >
    <pre class="text-wrap" :class="$props.class"><slot /></pre>
  </div>
</template>

<style lang="scss">
pre {
  @apply overflow-x-auto p-5;

  code .line {
    @apply block;
  }
}
</style>
