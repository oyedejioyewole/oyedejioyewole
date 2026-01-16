<script lang="ts" setup>
defineOgImageComponent("Page");

const { width: browserWidth } = useWindowSize();

const enableCursorFx = shallowRef(true);
const showCursorFx = computed(
  () => browserWidth.value > 1024 && enableCursorFx.value,
);

const navigationLinks = [
  { to: "/", name: "index", label: "Home", icon: "house-simple" },
  { to: "/lab", name: "lab", label: "Lab", icon: "flask" },
  { to: "/projects", name: "projects", label: "Projects", icon: "code" },
];
</script>

<template>
  <Head lang="en" />

  <Body
    class="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 selection:bg-primary-500/50"
  />

  <ClientOnly>
    <NuxtLoadingIndicator
      :color="
        $colorMode.value === 'light'
          ? 'var(--color-primary-700)'
          : 'var(--color-primary-300)'
      "
    />
  </ClientOnly>

  <div class="overflow-hidden relative">
    <AppEffectsCursorTracking v-show="showCursorFx" />

    <main class="min-h-screen grid grid-cols-5 gap-x-10">
      <!-- Links -->
      <nav
        class="py-20 lg:py-0 max-lg:bg-primary-900/10 max-lg:dark:bg-primary-100/10 max-lg:rounded-b-xl max-lg:border max-lg:border-t-0 col-span-5 lg:col-span-1 flex flex-col justify-center gap-y-10 items-center lg:h-screen"
      >
        <h1 class="font-serif text-4xl">Navigation</h1>

        <hr class="border w-1/2" />

        <ul class="flex lg:flex-col items-center gap-4">
          <li v-for="link in navigationLinks" :key="link.name">
            <Button :to="link.to" :is-active="$route.name === link.name">
              <PhosphorIcon
                :name="link.icon"
                class="scale-75 lg:scale-100"
                size="30"
              />
              <span :class="{ 'max-lg:hidden': $route.name !== link.name }">{{
                link.label
              }}</span>
            </Button>
          </li>
        </ul>
      </nav>

      <!-- Content -->
      <div class="col-span-5 lg:col-span-3 w-[90%] mx-auto lg:w-full py-10">
        <slot />
      </div>

      <!-- Actions & Socials -->
      <nav
        class="col-span-5 lg:col-span-1 bg-primary-900/10 dark:bg-primary-100/10 backdrop-blur-sm flex flex-col items-center gap-y-10 justify-around rounded-t-xl lg:rounded-tr-none lg:rounded-l-xl lg:translate-x-3/4 hover:translate-x-0 transition-transform duration-300 border max-lg:border-b-0 lg:border-r-0 ease-in-out-circ py-20 lg:h-screen"
      >
        <div class="space-y-5 text-center">
          <h1 class="font-serif text-4xl">Actions</h1>

          <ul class="flex justify-center lg:flex-col items-center gap-4">
            <!-- Toggle theme -->
            <li>
              <Button
                for-icon
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
                    weight="duotone"
                    size="24"
                  />

                  <span class="sr-only"
                    >Toggle
                    {{ $colorMode.value === "dark" ? "light" : "dark" }}
                    mode</span
                  >

                  <template #placeholder>
                    <PhosphorIcon name="desktop" weight="duotone" size="24" />
                  </template>
                </ColorScheme>
              </Button>
            </li>

            <!-- Toggle cursor effects -->
            <li>
              <Button
                class="hidden lg:block"
                type="button"
                :for-icon="true"
                @click="enableCursorFx = !enableCursorFx"
              >
                <span class="sr-only">Disable cursor effect</span>
                <PhosphorIcon name="sparkle" weight="duotone" size="24" />
              </Button>
            </li>
          </ul>
        </div>

        <hr class="border w-[90%]" />

        <div class="space-y-5 text-center">
          <h1 class="font-serif text-4xl">Socials</h1>

          <ul class="flex lg:flex-col items-center gap-4">
            <!-- GitHub profile -->
            <li class="contents">
              <Button
                aria-label="My GitHub profile (open in a new window)"
                target="_blank"
                to="https://github.com/oyedejioyewole"
                :for-icon="true"
              >
                <span class="sr-only">My GitHub</span>
                <PhosphorIcon name="github-logo" size="30" />
              </Button>
            </li>

            <!-- Instagram -->
            <li class="contents">
              <Button
                aria-label="My Instagram account (open in a new window)"
                target="_blank"
                to="https://instagram.com/oyedeji.oyewole"
                :for-icon="true"
              >
                <span class="sr-only">My Instagram</span>
                <PhosphorIcon name="instagram-logo" size="30" />
              </Button>
            </li>

            <!-- Send me a message -->
            <li class="contents">
              <Button
                aria-label="Send me a message (open in your default email client)"
                target="_blank"
                to="mailto://oyedejioyewolemaxwell@proton.me"
                :for-icon="true"
              >
                <span class="sr-only">Send me a message</span>
                <PhosphorIcon name="envelope-simple" size="30" />
              </Button>
            </li>
          </ul>
        </div>
      </nav>
    </main>
  </div>
</template>
