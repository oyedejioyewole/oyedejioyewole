<script lang="ts" setup>
const { data: indexContent } = await useAsyncData(() =>
  queryCollection("content").path("/").first(),
);
</script>

<template>
  <ContentRenderer
    class="space-y-6"
    v-if="indexContent"
    :value="indexContent"
  />
</template>
