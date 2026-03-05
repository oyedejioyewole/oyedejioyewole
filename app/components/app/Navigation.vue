<template>
  <!-- Links -->
  <nav
    class="max-xl:bg-primary-900/10 max-xl:dark:bg-primary-100/10 group grid grid-rows-[1fr_auto] border-r backdrop-blur-md transition-colors max-xl:rounded-b-xl max-xl:border max-xl:border-t-0 max-xl:py-20 xl:sticky xl:top-0 xl:left-0 xl:h-screen"
  >
    <div class="row-span-3 grid place-content-center gap-y-8">
      <h1 class="font-serif xl:text-2xl 2xl:text-4xl">MENU</h1>

      <hr
        class="w-1/2 border transition-[width] duration-300 group-hover:w-full"
      />

      <ul class="flex gap-4 xl:flex-col">
        <li v-for="link in navigationLinks" :key="link.name">
          <UiButton :is-active="$route.path === link.to" :to="link.to">
            <PhosphorIcon class="size-5" :name="link.icon" />
            <span :class="[$route.name !== link.name && 'max-xl:hidden']">{{
              link.label
            }}</span>
          </UiButton>
        </li>
      </ul>
    </div>

    <div class="p-8">
      <UiButton
        class="mx-auto size-fit"
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
</template>

<script lang="ts" setup>
const navigationLinks = [
  { to: "/", name: "index", label: "Home", icon: "house-simple" },
  { to: "/lab", name: "lab", label: "Lab", icon: "flask" },
];
</script>
