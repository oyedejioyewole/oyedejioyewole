<template>
  <section class="grid min-h-screen grid-cols-8 place-items-center">
    <div class="col-[2/8]">
      <section class="space-y-8">
        <div class="flex justify-between">
          <h3 class="font-display text-[3vw]">My projects.</h3>

          <Motion as-child :while-press="{ scale: 0.9 }">
            <NuxtLink
              class="group hover:text-primary-300 dark:hover:text-primary-700 dark:before:bg-primary-300 before:bg-primary-700 relative isolate flex w-[10vw] cursor-pointer items-center justify-around overflow-hidden rounded-full bg-current/10 duration-300 before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:rounded-full before:transition before:duration-300 hover:before:scale-x-100"
              data-snap-cursor
              target="_blank"
              :to="socialLinks[0].url"
            >
              View all
              <PhosphorIcon
                class="size-5 transition duration-300 group-hover:-rotate-45"
                name="arrow-right"
              />
            </NuxtLink>
          </Motion>
        </div>

        <AppProjects />
      </section>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { Motion } from "motion-v";

const { socialLinks } = useAppConfig();
</script>
