<script lang="ts" setup>
const { data: stats } = await useFetch("/api/stats");
</script>

<template>
  <p class="text-lg" v-if="stats">
    <span>
      <mark class="font-serif font-bold bg-transparent text-inherit"
        >Hosted on:</mark
      >
      {{
        new Date(stats.hostedAt).toLocaleString("en-US", {
          dateStyle: "long",
        })
      }}
    </span>
    &mdash;
    <span>
      <mark class="font-serif font-bold bg-transparent text-inherit"
        >Updated on:</mark
      >
      {{
        new Date(stats.updatedAt).toLocaleString("en-US", {
          dateStyle: "long",
        })
      }}.
    </span>
  </p>
</template>
