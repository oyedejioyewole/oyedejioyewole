<template>
  <ul class="grid gap-4 lg:grid-cols-3">
    <li
      v-for="(project, index) of showcaseProjects"
      :key="index"
      :class="['grid', [0, 3, 4].includes(index) && 'lg:col-span-2']"
    >
      <AppEffectsSpotlightCard
        class="group"
        data-snap-cursor
        :to="project.url"
        spotlight-color="var(--spotlight-color)"
      >
        <div class="space-y-4">
          <div class="flex w-full items-center justify-between">
            <div
              class="bg-primary-900/10 dark:bg-primary-100/10 inline-flex w-fit items-center gap-x-2 rounded-full px-3 py-1 max-2xl:text-sm"
            >
              <component
                :is="project.isDraft ? PencilLineDuotone : PackageDuotone"
                class="size-5"
              />

              {{ project.isDraft ? "In progress" : "Completed" }}
            </div>

            <ArrowUpRightIcon
              v-show="project.url"
              class="size-5 -translate-x-1 translate-y-1 scale-0 transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-100"
            />
          </div>

          <p
            class="font-bold group-hover:font-serif group-hover:tracking-wider group-hover:italic"
          >
            {{ project.displayName ?? project.name }}
          </p>

          <Suspense>
            <Comark
              :components="{ p: ContentParagraph, a: ContentLink }"
              :markdown="project.description"
              class="text-sm text-current/70"
            />
          </Suspense>
        </div>
      </AppEffectsSpotlightCard>
    </li>
  </ul>
</template>

<script lang="ts">
import ArrowUpRightIcon from "~icons/ph/arrow-up-right";
import PackageDuotone from "~icons/ph/package-duotone";
import PencilLineDuotone from "~icons/ph/pencil-line-duotone";

import { Comark } from "@comark/vue";
import { Suspense } from "vue";

import AppEffectsSpotlightCard from "../../app/effects/SpotlightCard.vue";

import ContentLink from "../../content/Link.vue";
import ContentParagraph from "../../content/Paragraph.vue";

import { shuffleArray } from "../../../utils/array";

import type { CollectionEntry } from "astro:content";

export interface GridProps {
  data: Array<CollectionEntry<"projects">["data"]>;
}
</script>

<script lang="ts" setup>
const { data: projects } = defineProps<GridProps>();

const showcaseProjects = shuffleArray(projects).slice(0, 6);
</script>
