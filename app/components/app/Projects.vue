<template>
  <div class="flex flex-col gap-4">
    <AppEffectsSpotlightCard
      v-for="project in projects"
      data-snap-cursor
      :class="[
        'group flex max-w-xs flex-col items-start gap-y-4 rounded-2xl border border-dashed backdrop-blur-sm 2xl:max-w-sm',
        project.url && 'cursor-pointer',
      ]"
      :key="project.name"
      @click="navigateTo(project.url, { external: true })"
    >
      <!-- Project status badge and external link indicator -->
      <div class="flex w-full justify-between">
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
          v-show="project.url"
          class="opacity-0 transition group-hover:opacity-100"
          name="arrow-square-out"
          size="20"
          weight="duotone"
        />
      </div>

      <p class="w-fit text-left font-bold">
        {{ project.displayName ?? project.name }}
      </p>
      <ContentRenderer class="text-left" :value="project.description" />
    </AppEffectsSpotlightCard>
  </div>
</template>

<script lang="ts" setup>
import { parseMarkdown } from "#imports";

// Fetch and transform projects, optionally filtering to featured projects
const { data: projects } = await useAsyncData("featuredProjects", async () => {
  const allProjects = await queryCollection("projects").all();

  const transformedProjects = await Promise.all(
    allProjects.map(async (project) => ({
      ...project,
      description: await parseMarkdown(project.description),
    })),
  );

  // Shuffle and select first 2, then sort alphabetically
  const featuredProjects = transformedProjects
    .sort(() => 0.5 - Math.random())
    .slice(0, 2)
    .sort((a, b) => a.name.localeCompare(b.name));

  return featuredProjects;
});
</script>
