<template>
  <PagesSection v-if="photos" class="xl:grid-cols-5" multi-column>
    <!-- Left column: Masonry gallery -->
    <section
      class="col-span-3 p-8"
      data-allow-mismatch
      data-scroll
      data-scroll-speed="0.5"
    >
      <MasonryWall
        ref="photography-wall"
        :column-width="200"
        :gap="16"
        :items="photos.media"
        :max-columns="2"
        :ssr-columns="2"
        @redraw="onRedraw"
      >
        <template #default="{ item }">
          <NuxtImg
            class="rounded-lg outline-offset-4 brightness-70 sepia duration-300 hover:outline hover:brightness-100 hover:sepia-0"
            data-snap-cursor
            format="webp"
            placeholder
            :src="item!.src"
            :width="item!.width"
          />
        </template>
      </MasonryWall>
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
import { MasonryWall } from "@yeger/vue-masonry-wall";

const { socialLinks } = useAppConfig();

const { data: photos } = await useFetch("/api/photos/showcase", {
  getCachedData: (key, nuxtApp) =>
    nuxtApp.payload.data[key] || nuxtApp.static.data[key],
});

const { completeTask } = useTasks();
const photographyWallRef = useTemplateRef("photography-wall");

async function onRedraw() {
  const imgs = [
    ...(photographyWallRef.value?.$el.querySelectorAll("img") ?? []),
  ] as HTMLImageElement[];

  await Promise.all(
    imgs.map((img) =>
      img.complete
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            img.onload = () => resolve();
            img.onerror = () => resolve();
          }),
    ),
  );

  completeTask("photography-wall");
}
</script>
