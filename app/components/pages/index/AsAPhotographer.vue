<template>
  <PagesSection v-if="photos" class="xl:grid-cols-5" multi-column no-divider>
    <!-- Photo showcase -->
    <section class="col-span-3 columns-2 space-y-4 gap-x-4 p-8">
      <MotionNuxtImg
        v-for="(photo, index) in photos.media"
        :key="photo!.id"
        class="rounded-lg outline outline-offset-2 brightness-70 sepia outline-dashed hover:brightness-100 hover:sepia-0"
        data-snap-cursor
        format="webp"
        placeholder
        :in-view-options="{ once: true }"
        :src="photo!.src"
        :while-hover="{ scale: 0.9 }"
        :while-in-view="
          animateImages
            ? {
                x: [-60, 0],
                opacity: [0, 1],
                transition: { delay: (index % 2) * 0.2 },
              }
            : {}
        "
        :width="960"
        @load="loadedImages++"
      />
    </section>

    <!-- Right column: intro and slot content -->
    <section
      class="sticky top-0 col-span-2 flex min-h-screen max-w-sm flex-col items-end justify-center gap-y-4 self-start text-right"
    >
      <slot />

      <PagesIndexPhotographerInfo :showcase-photos-count="photos!.totalMedia" />

      <UiButton class="group w-fit border-dashed" :to="socialLinks[2].url"
        >View all
        <PhosphorIcon
          class="ease-in-out-circ size-5 transition-transform duration-300 group-hover:translate-x-2"
          name="arrow-square-out"
      /></UiButton>
    </section>
  </PagesSection>
</template>

<script lang="ts" setup>
import { motion } from "motion-v";

const MotionNuxtImg = motion.create(resolveComponent("NuxtImg"));

const { socialLinks } = useAppConfig();

const { data: photos } = useLazyFetch("/api/photos/showcase", {
  getCachedData: (key, nuxtApp) =>
    nuxtApp.payload.data[key] || nuxtApp.static.data[key],
  server: false,
});

const loadedImages = shallowRef(0);
const animateImages = computed(
  () => loadedImages.value === (photos.value?.media.length ?? 0),
);
</script>
