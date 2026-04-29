<template>
  <section class="grid grid-cols-12 xl:grid-cols-8">
    <div class="col-[2/12] space-y-8 xl:col-[2/8]">
      <div class="flex min-h-[50vh] items-center">
        <div class="flex w-full flex-wrap items-end justify-between gap-y-8">
          <div class="space-y-8 md:max-w-sm lg:max-w-md">
            <slot />
          </div>

          <Motion as-child :while-press="{ scale: 0.9 }">
            <NuxtLink
              class="group hover:text-primary-300 dark:hover:text-primary-700 dark:before:bg-primary-300 before:bg-primary-700 relative isolate flex size-fit h-15 w-40 cursor-pointer items-center justify-around overflow-hidden rounded-full bg-current/10 px-5 duration-300 before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:rounded-full before:transition before:duration-300 hover:before:scale-x-100"
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
      </div>

      <PagesProjectsGrid />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { Motion } from "motion-v";

const { socialLinks } = useAppConfig();
</script>
