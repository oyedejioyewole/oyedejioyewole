<template>
  <section
    class="grid min-h-screen grid-cols-8 place-content-center items-start"
  >
    <div class="col-[2/8] space-y-8">
      <h3 class="font-display text-[3vw]">My stats.</h3>

      <div
        class="group grid min-h-[50vh] grid-cols-2 gap-4 rounded-2xl border-current/30 backdrop-blur-lg transition-[gap] duration-300 hover:gap-0 hover:border-current/70"
        data-snap-cursor
      >
        <div
          class="grid place-content-center rounded-l-2xl border border-current/30 bg-current/10 text-center text-lg transition duration-300"
        >
          <span>I've completed</span>
          <p class="font-display text-[3vw]">
            <ClientOnly>
              {{ projectsStatistics?.completed }}

              <template #placeholder> xx </template>
            </ClientOnly>
          </p>
          <span>projects</span>
        </div>

        <div
          class="grid place-content-center rounded-r-2xl border border-current/30 bg-current/10 text-center text-lg transition-all duration-300"
        >
          <span>I'm currently working on</span>
          <p class="font-display text-[3vw]">
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
