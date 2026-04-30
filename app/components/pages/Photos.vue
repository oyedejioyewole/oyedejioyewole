<template>
  <section class="grid min-h-screen grid-cols-12 xl:grid-cols-8">
    <section class="col-[2/12] xl:col-[2/8]">
      <div class="flex h-[50vh] items-center">
        <div
          class="flex w-full justify-between gap-y-8 max-xl:flex-col xl:items-end"
        >
          <div class="space-y-8 xl:max-w-md">
            <slot />
          </div>

          <div class="flex items-center gap-x-4" data-snap-cursor>
            <button
              class="cursor-pointer rounded-full border border-current/30 bg-current/10 px-5 py-3 backdrop-blur-lg transition duration-300 hover:border-current/70 disabled:cursor-not-allowed disabled:opacity-50"
              :disabled="isFirstPage"
              @click="prev"
            >
              <PhosphorIcon name="caret-left" />
            </button>

            <button
              class="cursor-pointer rounded-full border border-current/30 bg-current/10 px-5 py-3 backdrop-blur-lg transition duration-300 hover:border-current/70 disabled:cursor-not-allowed disabled:opacity-50"
              :disabled="isLastPage"
              @click="next"
            >
              <PhosphorIcon name="caret-right" />
            </button>
          </div>
        </div>
      </div>

      <!-- Photo showcase -->
      <section
        class="group mb-[16.65vh] grid place-items-center space-y-4 rounded-2xl border border-current/30 bg-current/10 p-8 backdrop-blur-lg transition duration-300 hover:border-current/70"
        data-snap-cursor
      >
        <div v-if="resolvedMedia" class="space-y-4 md:columns-2">
          <motion.button
            v-for="photo in resolvedMedia.media.slice(startIndex, endIndex)"
            :key="photo!.id"
            class="rounded-4xl outline-offset-4 outline-current"
            data-morph-cursor
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            @press="
              navigateTo(photo!.externalUrl, {
                external: true,
                open: { target: '_blank' },
              })
            "
          >
            <NuxtImg
              class="brightness-90 transition duration-300 hover:brightness-100"
              format="webp"
              placeholder
              width="960"
              :src="photo!.src"
            />
          </motion.button>
        </div>
        <div v-else>
          <AppBranding
            class="size-20 opacity-70 transition duration-300 group-hover:opacity-100"
          />
        </div>
      </section>
    </section>
  </section>
</template>

<script lang="ts" setup>
import { motion } from "motion-v";

const { data: resolvedMedia } = usePhotos();
const totalMedia = computed(() => resolvedMedia.value?.totalMedia ?? 0);

const { currentPage, currentPageSize, isFirstPage, isLastPage, next, prev } =
  useOffsetPagination({
    total: totalMedia,
    pageSize: 4,
  });

const startIndex = computed(
  () => (currentPage.value - 1) * currentPageSize.value,
);
const endIndex = computed(() => startIndex.value + currentPageSize.value);

watchEffect(() => {
  if (!resolvedMedia.value || isLastPage.value) return;

  resolvedMedia.value.media
    .slice(endIndex.value, endIndex.value + currentPageSize.value)
    .forEach((media) => {
      new Image().src = media!.src;
    });
});
</script>
