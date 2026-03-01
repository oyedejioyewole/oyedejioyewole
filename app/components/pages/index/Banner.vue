<template>
  <PagesSection>
    <!-- Logo and profile image with divider -->
    <div class="mx-auto flex items-center gap-x-8">
      <NuxtLink to="/">
        <AppBranding class="size-30 rounded-lg blur-sm" />
      </NuxtLink>

      <PhosphorIcon class="size-10" name="x" weight="thin" />

      <NuxtImg
        class="size-30 rounded-lg border border-dashed p-1 transition hover:ring"
        data-snap-cursor
        format="webp"
        placeholder
        provider="github"
        src="oyedejioyewole"
        @load="completeTask('profile-image')"
      />
    </div>

    <slot />

    <!-- Scroll indicator with animated mouse icon -->
    <button
      ref="scroll-for-more-button"
      data-snap-cursor
      class="group absolute bottom-8 flex cursor-pointer gap-x-2"
    >
      <PhosphorIcon
        class="ease-in-out-circ size-5 rotate-180 animate-bounce 2xl:size-7.5"
        name="mouse-simple"
      />
    </button>
  </PagesSection>
</template>

<script lang="ts" setup>
import { animate } from "animejs/animation";

const { y } = useWindowScroll();
const { completeTask } = useTasks();

const scrollForMoreButtonRef = useTemplateRef("scroll-for-more-button");
watch([scrollForMoreButtonRef, y], ([element, scrollY]) => {
  if (!element || !scrollY || scrollY < 40) return;

  animate(element, {
    opacity: 0,
    duration: 300,
    ease: "inOutCirc",
    onComplete: () => {
      element.style.visibility = "hidden";
    },
  });
});
</script>
