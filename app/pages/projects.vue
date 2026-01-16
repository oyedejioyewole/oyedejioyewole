<script setup lang="ts">
defineOgImageComponent("Page", {
  description: "Here are some of the sidequests I'm working on.",
  title: "Projects · Oyedeji Oyewole",
});

useSeoMeta({
  description: "Here are some of the sidequests I'm working on.",
  ogDescription: "Here are some of the sidequests I'm working on.",
  ogTitle: "Projects",
  title: "Projects",
});
</script>

<template>
  <section
    class="row-span-3 col-span-5 w-[90%] lg:w-full mx-auto lg:col-span-3 space-y-10 py-10"
  >
    <h1 class="text-6xl font-serif">Projects</h1>

    <p class="text-lg">
      These are some of the side-quests I've finished or I'm currently working
      on.
    </p>

    <AppProjects />
  </section>
</template>
