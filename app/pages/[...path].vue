<template>
  <div v-if="content">
    <Title>{{ content.title }}</Title>

    <ContentRenderer :value="content" />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();

const { data: content } = useAsyncData(
  `content-${route.path}`,
  () => queryCollection("content").path(route.path).first(),
  {
    getCachedData: (key, nuxtApp) =>
      nuxtApp.payload.data[key] || nuxtApp.static.data[key],
  },
);
</script>
