<template>
  <!-- Links -->
  <div class="max-xl:col-span-5">
    <!-- Mobile: animated overlay, only mounted when toggled -->
    <AnimatePresence>
      <motion.nav
        v-if="isNavigationToggled"
        class="group bg-primary-100 dark:bg-primary-900 fixed top-0 z-10 grid h-screen w-full rounded-b-xl border backdrop-blur-md"
        layout
        :initial="{ y: '-100%' }"
        :animate="{ y: 0 }"
        :transition="{ type: 'tween' }"
        :exit="{
          y: isNavigationToggled ? '100%' : '-100%',
        }"
      >
        <div class="row-span-3 grid place-content-center gap-y-8">
          <motion.h1 class="font-serif text-4xl">MENU</motion.h1>

          <hr
            class="w-full border transition-[width] duration-300 group-hover:w-full"
          />

          <ul class="flex flex-col gap-4">
            <li v-for="link in navigationLinks" :key="link.name">
              <UiButton :is-active="$route.path === link.to" :to="link.to">
                <PhosphorIcon class="size-5" :name="link.icon" />
                <span>{{ link.label }}</span>
              </UiButton>
            </li>
          </ul>
        </div>

        <div class="mx-auto space-y-4 p-8">
          <UiButton
            @click="
              $colorMode.preference =
                $colorMode.value === 'light' ? 'dark' : 'light'
            "
          >
            <ColorScheme>
              <PhosphorIcon
                :name="{
                  moon: $colorMode.value === 'light',
                  sun: $colorMode.value === 'dark',
                }"
                class="size-5"
                weight="duotone"
              />

              <span class="sr-only"
                >Toggle
                {{ $colorMode.value === "dark" ? "light" : "dark" }}
                mode</span
              >

              <template #placeholder>
                <PhosphorIcon class="size-5" name="desktop" weight="duotone" />
              </template>
            </ColorScheme>
          </UiButton>

          <UiButton @click="isNavigationToggled = false"
            ><PhosphorIcon class="size-5" name="x"
          /></UiButton>
        </div>
      </motion.nav>
    </AnimatePresence>

    <!-- Mobile header bar -->
    <nav class="flex w-full items-center justify-between xl:hidden">
      <AppBranding class="size-10" />

      <UiButton @click="isNavigationToggled = true">
        <PhosphorIcon class="size-5" name="list" />
      </UiButton>
    </nav>

    <!-- Desktop: always in the DOM, visible via CSS only — no JS, no flash -->
    <nav
      class="sticky top-0 hidden h-screen place-items-center border-r border-current/30 backdrop-blur-md transition-colors hover:border-current/70 xl:grid"
    >
      <ul class="flex flex-wrap justify-center gap-2">
        <li
          v-for="(link, index) in navigationLinks"
          :key="link.name"
          class="inline-flex items-center gap-x-2"
        >
          <NuxtLink
            class="inline-flex items-center gap-x-2 font-serif text-xl"
            :to="link.to"
          >
            <PhosphorIcon class="size-6" weight="duotone" :name="link.icon" />
            {{ link.label }}
          </NuxtLink>

          <PhosphorIcon
            v-show="index < navigationLinks.length - 1"
            class="size-10"
            name="line-vertical"
            weight="thin"
          />
        </li>
      </ul>
      <!-- <div class="flex items-center gap-x-4">
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
      </div> -->

      <AppBranding class="row-span-3 size-20" />

      <div class="space-y-4">
        <UiButton
          @click="
            $colorMode.preference =
              $colorMode.value === 'light' ? 'dark' : 'light'
          "
        >
          <ColorScheme>
            <PhosphorIcon
              :name="{
                moon: $colorMode.value === 'light',
                sun: $colorMode.value === 'dark',
              }"
              class="size-5"
              weight="duotone"
            />

            <span class="sr-only"
              >Toggle
              {{ $colorMode.value === "dark" ? "light" : "dark" }}
              mode</span
            >

            <template #placeholder>
              <PhosphorIcon class="size-5" name="desktop" weight="duotone" />
            </template>
          </ColorScheme>
        </UiButton>
      </div>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { AnimatePresence, motion } from "motion-v";

const isNavigationToggled = shallowRef(false);
const currentPath = inject("current-path") as Ref<string>;

const navigationLinks = computed(() =>
  [
    { to: "/", name: "index", label: "Home", icon: "house-simple" },
    { to: "/photos", name: "photos", label: "Photos", icon: "slideshow" },
    {
      to: "/projects",
      name: "projects",
      label: "Projects",
      icon: "folder-open",
    },
  ].filter((link) => link.to !== currentPath.value),
);
</script>
