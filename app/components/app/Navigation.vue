<template>
  <!-- Links -->
  <div class="max-xl:col-span-5">
    <!-- Mobile: animated overlay, only mounted when toggled -->
    <AnimatePresence @exit-complete="pathTransition.exit?.(onNavigationClosed)">
      <nav
        v-show="isNavigationToggled"
        class="group dark:text-primary-700 text-primary-300 fixed top-0 z-20 grid h-dvh w-full"
      >
        <ul class="row-span-2 grid place-items-center">
          <motion.li
            v-for="(link, index) in navigationLinks"
            :key="link.name"
            :initial="{ opacity: 0, y: 40 }"
            :animate="{ opacity: 1, y: 0 }"
            :exit="{ opacity: 0, y: 40 }"
            :transition="{ duration: 0.3, delay: index * 0.05 }"
          >
            <NuxtLink
              class="inline-flex items-center gap-x-4 font-serif text-4xl"
              :to="link.to"
              @click="pathTransition.skipTransition = true"
            >
              {{ link.label }}
            </NuxtLink>
          </motion.li>
        </ul>

        <div class="mx-auto space-y-4 self-center">
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
      </nav>
    </AnimatePresence>

    <!-- Mobile header bar -->
    <nav class="mt-[4dvh] grid grid-cols-12 xl:hidden">
      <div class="col-[2/12] flex items-center justify-between">
        <AppBranding class="size-10" />

        <UiButton @click="pathTransition.enter?.(onNavigationOpened)">
          <PhosphorIcon class="size-5" name="list" />
        </UiButton>
      </div>
    </nav>

    <!-- Desktop: always in the DOM, visible via CSS only — no JS, no flash -->
    <nav
      class="sticky top-0 hidden h-screen place-items-center border-r border-current/30 backdrop-blur-md transition-colors hover:border-current/70 xl:grid"
    >
      <ul class="flex flex-wrap justify-center gap-y-2">
        <li
          v-for="(link, index) in navigationLinks"
          :key="link.name"
          class="inline-flex items-center"
        >
          <NuxtLink
            class="inline-flex items-center gap-x-2 font-serif"
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
import type { PathTransitionExposeT } from "~/layouts/default.vue";

const isNavigationToggled = shallowRef(false);

const currentPath = inject("current-path") as Ref<string>;
const pathTransition = inject("path-transition") as PathTransitionExposeT;

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

const nuxtApp = useNuxtApp();

nuxtApp.hook("page:loading:end", () => {
  isNavigationToggled.value = false;
});

function onNavigationOpened() {
  isNavigationToggled.value = true;
}

function onNavigationClosed() {
  currentPath.value = nuxtApp._route.path;
}
</script>
