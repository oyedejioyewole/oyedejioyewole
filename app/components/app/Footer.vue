<template>
  <footer
    class="flex flex-wrap items-center justify-around gap-y-8 border-t border-current/30 p-8 backdrop-blur-md transition duration-300 hover:border-current/70"
  >
    <div class="space-y-2">
      Made with ♥️ while using 🎧

      <ProseP class="font-bold" has-accent>
        &copy; 2024 - {{ new Date().getFullYear() }} Oyedeji Oyewole.
      </ProseP>
    </div>

    <div class="grid place-items-center gap-y-4">
      <ul class="flex items-center gap-x-4">
        <NuxtLink
          v-for="social in socialLinks"
          :key="social.icon"
          class="rounded-full px-3 py-1 outline-offset-8 hover:outline"
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
        </NuxtLink>
      </ul>

      <p class="font-serif font-bold"><i>or</i></p>

      <Motion as-child :while-press="{ scale: 0.9 }">
        <NuxtLink
          class="group hover:text-primary-300 dark:hover:text-primary-700 dark:before:bg-primary-300 before:bg-primary-700 relative isolate flex cursor-pointer items-center gap-x-4 overflow-hidden rounded-full bg-current/10 px-5 py-3 duration-300 before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:rounded-full before:transition before:duration-300 hover:before:scale-x-100"
          data-snap-cursor
          target="_blank"
          to="mailto://oyedejioyewole.q4e75@passinbox.com"
        >
          Drop a message
          <PhosphorIcon class="size-5 transition duration-300" name="mailbox" />
        </NuxtLink>
      </Motion>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { Motion } from "motion-v";

const { socialLinks } = useAppConfig();
</script>
