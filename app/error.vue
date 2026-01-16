<script setup lang="ts">
const error = useError();

useHead({
  htmlAttrs: {
    lang: "en",
  },
  title: "404",
  titleTemplate: "%s · Oyedeji Oyewole",
});
</script>

<template>
  <NuxtLayout>
    <section
      class="col-span-1 lg:col-span-3 grid place-content-center gap-y-10"
    >
      <h1 class="text-9xl font-serif place-self-center">
        {{ error?.statusCode }}
      </h1>
      <p class="text-lg">{{ error?.message }}</p>
    </section>
  </NuxtLayout>
</template>
