<template>
  <!-- Links -->
  <div class="max-xl:col-span-5">
    <!-- Mobile: animated overlay, only mounted when toggled -->
    <AnimatePresence
      @exit-complete="$emit('navigation:close', onNavigationClosed)"
    >
      <nav
        v-show="isNavigationToggled"
        class="group dark:text-primary-700 text-primary-300 fixed top-0 z-20 grid h-dvh w-full"
      >
        <ul class="row-span-2 grid place-items-center">
          <Motion
            v-for="(link, index) in navigationLinks"
            :key="link.name"
            as="li"
            :initial="{ opacity: 0, y: 40 }"
            :animate="{ opacity: 1, y: 0 }"
            :exit="{ opacity: 0, y: 40 }"
            :transition="{ delay: index * 0.1 }"
          >
            <NuxtLink
              class="inline-flex items-center gap-x-4 font-serif text-4xl"
              :to="link.to"
              @click="skipPageTransition = true"
            >
              {{ link.label }}
            </NuxtLink>
          </Motion>
        </ul>

        <div class="mx-auto space-y-4 self-center">
          <UiButton
            @click="
              $colorMode.preference =
                $colorMode.value === 'light' ? 'dark' : 'light'
            "
          >
            <ColorScheme>
              <NuxtIcon :name="themeIcon" class="size-5" />

              <span class="sr-only"
                >Toggle
                {{ $colorMode.value === "dark" ? "light" : "dark" }}
                mode</span
              >

              <template #placeholder>
                <NuxtIcon class="size-5" name="ph:desktop-duotone" />
              </template>
            </ColorScheme>
          </UiButton>

          <UiButton @click="isNavigationToggled = false"
            ><NuxtIcon class="size-5" name="ph:x"
          /></UiButton>
        </div>
      </nav>
    </AnimatePresence>

    <!-- Mobile header bar -->
    <nav class="mt-[4dvh] grid grid-cols-12 xl:hidden">
      <div class="col-[2/12] flex items-center justify-between">
        <AppBranding class="size-10" />

        <UiButton @click="$emit('navigation:open', onNavigationOpened)">
          <NuxtIcon class="size-5" name="ph:list" />
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
            <NuxtIcon :name="link.icon" />
            {{ link.label }}
          </NuxtLink>

          <NuxtIcon
            v-show="index < navigationLinks.length - 1"
            class="size-10"
            name="ph:line-vertical-thin"
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
            <NuxtIcon :name="themeIcon" class="size-5" />

            <span class="sr-only"
              >Toggle
              {{ $colorMode.value === "dark" ? "light" : "dark" }}
              mode</span
            >

            <template #placeholder>
              <NuxtIcon class="size-5" name="ph:desktop-duotone" />
            </template>
          </ColorScheme>
        </UiButton>
      </div>
    </nav>
  </div>
</template>

<script lang="ts" setup>
const isNavigationToggled = shallowRef(false);

defineEmits<{
  "navigation:open": [onComplete: () => void];
  "navigation:close": [onComplete: () => void];
}>();

const skipPageTransition = defineModel<boolean>({ required: true });

const theme = useColorMode();
const themeIcon = computed(() =>
  theme.value === "light" ? "ph:moon-duotone" : "ph:sun-duotone",
);

const { currentPath } = useCurrentPath();
const navigationLinks = computed(() =>
  [
    { to: "/", name: "index", label: "Home", icon: "ph:house-duotone" },
    {
      to: "/photos",
      name: "photos",
      label: "Photos",
      icon: "ph:slideshow-duotone",
    },
    {
      to: "/projects",
      name: "projects",
      label: "Projects",
      icon: "ph:folder-duotone",
    },
  ].filter((link) => link.to !== currentPath.value),
);

const nuxtApp = useNuxtApp();
nuxtApp.hook("page:loading:end", () => {
  isNavigationToggled.value = false;
});

function onNavigationClosed() {
  currentPath.value = nuxtApp._route.path;
}

function onNavigationOpened() {
  isNavigationToggled.value = true;
}
</script>
