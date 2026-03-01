<template>
  <section class="flex items-center gap-x-2">
    <!-- Blob-shaped container with project count -->
    <div
      :class="[
        'bg-primary-900/10 dark:bg-primary-100/10 grid size-15 place-items-center font-serif text-lg font-bold transition-all duration-300',
        !blobPath && 'rounded-full',
      ]"
      :style="[blobPath && { 'clip-path': `path('${blobPath}')` }]"
    >
      <b>{{ showcasePhotosCount }}+</b>
    </div>

    <!-- Link with hover animation triggered by blob hover state -->
    <ProseA @mouseenter="refreshBlobPath"> photos </ProseA> shared on

    <ProseStrong> <i>Pexels</i> </ProseStrong>
  </section>
</template>

<script lang="ts" setup>
import * as blobs2 from "blobs/v2";

interface PhotographerInfoProps {
  showcasePhotosCount: number;
}

defineProps<PhotographerInfoProps>();

// Generate animated blob shape and refresh on mouseenter for the link to create an interactive effect
const { data: blobPath, refresh: refreshBlobPath } = await useAsyncData(
  async () =>
    blobs2.svgPath({
      seed: Math.random(),
      extraPoints: 3,
      randomness: 3,
      size: 60,
    }),
);
</script>
