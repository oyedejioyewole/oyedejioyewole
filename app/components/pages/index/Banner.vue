<template>
  <PagesSection no-divider>
    <!-- Identity x profile picture -->
    <div class="mx-auto flex items-center gap-x-8">
      <NuxtLink to="/">
        <AppBranding class="size-30 rounded-lg blur-sm" />
      </NuxtLink>

      <PhosphorIcon class="size-10" name="x" weight="thin" />

      <NuxtImg
        class="size-30 rounded-lg outline outline-offset-4 outline-dashed hover:outline-solid"
        data-snap-cursor
        placeholder
        provider="github"
        src="oyedejioyewole"
      />
    </div>

    <slot />

    <!-- Scroll indicator -->
    <motion.button
      data-snap-cursor
      class="group absolute bottom-8 flex cursor-pointer gap-x-2"
      :animate="scrollY >= 40 ? { opacity: 0 } : { opacity: 1 }"
      :transition="{ ease: 'circInOut' }"
    >
      <PhosphorIcon
        class="ease-in-out-circ size-7.5 rotate-180 animate-bounce"
        name="mouse-simple"
      />
    </motion.button>
  </PagesSection>
</template>

<script lang="ts" setup>
import { motion } from "motion-v";

const { y: scrollY } = useWindowScroll();
</script>
