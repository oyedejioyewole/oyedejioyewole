<template>
  <section
    class="grid min-h-screen grid-cols-8 place-content-center items-start"
  >
    <div class="col-[2/8] space-y-8">
      <ProseH1>My stats.</ProseH1>

      <div
        class="group grid min-h-[50vh] gap-4 rounded-2xl border-current/30 backdrop-blur-lg transition-[gap] duration-300 hover:gap-0 hover:border-current/70 lg:grid-cols-2"
        data-snap-cursor
      >
        <div
          class="grid place-content-center space-y-4 rounded-l-2xl border border-current/30 bg-current/10 text-center transition duration-300 max-xl:rounded-2xl max-xl:group-hover:rounded-b-none"
        >
          <span>I've completed</span>
          <p class="font-display text-3xl lg:text-5xl">
            <ClientOnly>
              {{ projectsStatistics?.completed }}

              <template #placeholder> xx </template>
            </ClientOnly>
          </p>
          <span>projects</span>
        </div>

        <div
          class="grid place-content-center space-y-4 rounded-r-2xl border border-current/30 bg-current/10 text-center transition-all duration-300 max-xl:rounded-2xl max-xl:group-hover:rounded-t-none"
        >
          <span>I'm currently working on</span>
          <p class="font-display text-3xl lg:text-5xl">
            <ClientOnly>
              {{ projectsStatistics?.inProgress }}

              <template #placeholder> xx </template>
            </ClientOnly>
          </p>
          <span>projects</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { Projects } from "../../app/Projects.vue";

const { data: featuredProjects } = useNuxtData<Projects>("featuredProjects");

const projectsStatistics = computed(() => {
  if (!featuredProjects.value) return null;

  const projectsInProgress = featuredProjects.value.filter(
    ({ isDraft }) => isDraft,
  ).length;

  return {
    completed: featuredProjects.value.length - projectsInProgress,
    inProgress: projectsInProgress,
  };
});
</script>
