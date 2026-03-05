<template>
  <footer
    class="flex items-center justify-around border-t p-8 backdrop-blur-md"
  >
    <div class="space-y-2">
      <slot />

      <ProseP class="font-bold" has-accent
        >&copy; 2024 - {{ new Date().getFullYear() }}.</ProseP
      >
    </div>

    <div class="mt-2 flex items-center gap-x-8">
      <MotionNuxtLink
        v-for="social in socialLinks"
        :key="social.icon"
        data-snap-cursor
        target="_blank"
        :to="social.url"
      >
        <span class="sr-only">{{ social.label }}</span>
        <UiPexelsLogo
          v-if="social.icon === 'pexels-logo'"
          class="size-5 fill-current/20"
        />

        <PhosphorIcon
          v-else
          class="size-5.5"
          weight="duotone"
          :name="social.icon"
        />
      </MotionNuxtLink>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { NuxtLink } from "#components";
import { motion } from "motion-v";

const MotionNuxtLink = motion.create(NuxtLink);

const { socialLinks } = useAppConfig();
</script>
