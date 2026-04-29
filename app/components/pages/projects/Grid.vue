<template>
  <div class="grid gap-4 lg:grid-cols-3">
    <AppEffectsSpotlightCard
      v-for="(project, index) in projects"
      :key="project.name"
      data-snap-cursor
      :class="[
        'group flex flex-col items-start gap-y-4 rounded-2xl border border-current/30 bg-current/10 backdrop-blur-sm transition-all duration-300 hover:border-current/70',
        project.url && 'cursor-pointer',
        [0, 3, 4].includes(index) && 'lg:col-span-2',
      ]"
      spotlight-color="var(--spotlight-color)"
      @click="navigateTo(project.url, { external: true })"
    >
      <!-- Project status badge and external link indicator -->
      <div class="flex w-full items-center justify-between">
        <div
          class="bg-primary-900/10 dark:bg-primary-100/10 inline-flex w-fit items-center gap-x-2 rounded-full px-3 py-1 font-sans max-2xl:text-sm"
        >
          <PhosphorIcon
            size="20"
            weight="duotone"
            :name="{
              'pencil-line': project.isDraft,
              package: !project.isDraft,
            }"
          />

          {{ project.isDraft ? "In progress" : "Completed" }}
        </div>

        <!-- Arrow icon shown on hover if project has external URL -->
        <PhosphorIcon
          v-if="project.url"
          class="-translate-x-1 translate-y-1 scale-0 transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-100"
          name="arrow-up-right"
          size="20"
        />
      </div>

      <p
        class="font-bold group-hover:font-serif group-hover:tracking-wider group-hover:italic"
      >
        {{ project.displayName ?? project.name }}
      </p>

      <ContentRenderer class="text-left" :value="project.description" />
    </AppEffectsSpotlightCard>
  </div>
</template>

<script lang="ts" setup>
import { parseMarkdown } from "#imports";
import type { UnwrapRef } from "vue";

// Fetch and transform all projects, sorted alphabetically
const { data: projects } = useLazyAsyncData("featuredProjects", async () => {
  const allProjects = await queryCollection("projects").all();

  const transformedProjects = await Promise.all(
    __shuffleArray(allProjects)
      .slice(0, 6)
      .map(async (project) => ({
        ...project,
        description: await parseMarkdown(project.description),
      })),
  );

  return transformedProjects;
});

export type Projects = NonNullable<UnwrapRef<typeof projects>>;
</script>
