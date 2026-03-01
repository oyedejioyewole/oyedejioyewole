<template>
  <nav
    class="max-xl:bg-primary-900/10 max-xl:dark:bg-primary-100/10 ease-in-out-circ flex translate-x-3/4 flex-col items-center justify-center gap-y-8 border-l backdrop-blur-md transition duration-300 hover:translate-x-0 max-xl:rounded-b-xl max-xl:border max-xl:border-t-0 max-xl:py-20 xl:sticky xl:top-0 xl:right-0 xl:h-screen"
    @mouseenter="hasRightSidebarBeenHovered = true"
    @mouseleave="hasRightSidebarBeenHovered = false"
  >
    <div class="grid place-items-center gap-y-6">
      <h2 class="font-serif xl:text-2xl 2xl:text-4xl">ACTIONS</h2>

      <hr class="w-1/2 border" />

      <ul class="items-center justify-center space-y-4">
        <!-- Toggle theme -->
        <li>
          <UiButton
            class="max-2xl:text-sm"
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
        </li>

        <!-- Toggle cursor effects -->
        <li>
          <UiButton
            class="hidden max-2xl:text-sm xl:block"
            type="button"
            @click="enableCursorFx = !enableCursorFx"
          >
            <span class="sr-only">Disable cursor effect</span>
            <PhosphorIcon class="size-5" name="sparkle" weight="duotone" />
          </UiButton>
        </li>
      </ul>
    </div>

    <div class="flex flex-col items-center gap-y-6">
      <h2 class="font-serif xl:text-2xl 2xl:text-4xl">SOCIALS</h2>

      <hr class="w-1/2 border" />

      <ul class="items-center justify-center space-y-4">
        <li v-for="social in socialLinks" :key="social.label">
          <UiButton
            :aria-label="social.label + ' (open in a new window)'"
            target="_blank"
            :to="social.url"
          >
            <span class="sr-only">{{ social.label }}</span>
            <UiPexelsLogo
              v-if="social.icon === 'pexels-logo'"
              class="size-5 fill-current/20"
            />

            <PhosphorIcon
              class="size-5"
              weight="duotone"
              v-else
              :name="social.icon"
            />
          </UiButton>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts" setup>
const hasRightSidebarBeenHovered = defineModel<boolean>("hovered", {
  default: false,
});

const enableCursorFx = defineModel<boolean>("cursorFx", { default: true });

const { socialLinks } = useAppConfig();
</script>
