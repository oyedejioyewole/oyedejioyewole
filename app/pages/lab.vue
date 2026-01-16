<script lang="ts" setup>
const { data: labContent } = await useAsyncData(() =>
  queryCollection("content").path("/lab").first(),
);
</script>

<template>
  <ContentRenderer class="space-y-6" v-if="labContent" :value="labContent" />
</template>
