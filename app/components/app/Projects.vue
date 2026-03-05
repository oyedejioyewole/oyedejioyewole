<template>
  <div class="flex gap-x-8">
    <!-- Custom vertical navigation -->
    <div class="flex flex-col justify-center gap-y-2">
      <button
        id="swiper-previous"
        class="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        data-snap-cursor
      >
        <PhosphorIcon class="size-5" name="caret-up" />
      </button>

      <button
        id="swiper-next"
        class="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        data-snap-cursor
      >
        <PhosphorIcon class="size-5" name="caret-down" />
      </button>
    </div>

    <Swiper
      class="h-[30vh]"
      centered-slides
      direction="vertical"
      :modules="[Navigation]"
      :navigation="{
        nextEl: '#swiper-next',
        prevEl: '#swiper-previous',
      }"
      slides-per-view="auto"
    >
      <SwiperSlide
        v-for="project in projects"
        :key="project.name"
        class="grid h-fit place-content-center"
      >
        <AppEffectsSpotlightCard
          data-snap-cursor
          :class="[
            'group flex max-w-xs flex-col items-start gap-y-4 rounded-2xl border border-dashed backdrop-blur-sm 2xl:max-w-sm',
            project.url && 'cursor-pointer',
          ]"
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
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import { parseMarkdown } from "#imports";

import "swiper/css";

// Fetch and transform all projects, sorted alphabetically
const { data: projects } = useLazyAsyncData(
  "featuredProjects",
  async () => {
    const allProjects = await queryCollection("projects").all();

    const transformedProjects = await Promise.all(
      allProjects.map(async (project) => ({
        ...project,
        description: await parseMarkdown(project.description),
      })),
    );

    return transformedProjects.sort(() => 0.5 - Math.random()).slice(0, 6);
  },
  { server: false },
);
</script>
