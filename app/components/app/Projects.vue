<script lang="ts" setup>
import { parseMarkdown } from "@nuxtjs/mdc/runtime";

const props = defineProps<{ isFeatured?: boolean }>();

const { data: projects } = await useAsyncData(
  props.isFeatured ? "featuredProjects" : "allProjects",
  async () => {
    const allProjects = await queryCollection("projects").all();

    const transformedProjects = await Promise.all(
      allProjects.map(async (project) => ({
        ...project,
        description: await parseMarkdown(project.description),
      })),
    );

    if (!props.isFeatured) return transformedProjects;

    const featuredProjects = transformedProjects
      .sort(() => 0.5 - Math.random())
      .slice(0, 5)
      .sort((a, b) => a.name.localeCompare(b.name));
    return featuredProjects;
  },
);
</script>

<template>
  <div class="grid grid-cols-3 gap-4">
    <button
      v-for="project in projects"
      class="bg-primary-900/10 border dark:bg-primary-100/10 p-5 rounded-2xl space-y-4 block backdrop-blur-sm hover:ring group"
      data-snap-cursor
      :key="project.name"
      :class="{ 'cursor-pointer': project.url }"
      @click="navigateTo(project.url, { external: true })"
    >
      <!-- Project status -->

      <div class="flex justify-between">
        <div
          class="inline-flex bg-primary-100 dark:bg-primary-900 px-3 py-1 font-sans rounded-full items-center gap-x-2 w-fit"
        >
          <PhosphorIcon
            :name="{
              'pencil-line': project.isDraft,
              package: !project.isDraft,
            }"
            weight="duotone"
            size="20"
          />

          {{ project.isDraft ? "In progress" : "Completed" }}
        </div>

        <PhosphorIcon
          v-show="project.url"
          class="opacity-0 group-hover:opacity-100 transition"
          name="arrow-square-out"
          weight="duotone"
          size="20"
        />
      </div>

      <p class="font-bold w-fit">{{ project.displayName ?? project.name }}</p>
      <ContentRenderer class="text-left" :value="project.description" />
    </button>
  </div>
</template>
