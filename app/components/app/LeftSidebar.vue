<script lang="ts" setup>
const navigationLinks = [
  { to: "/", name: "index", label: "Home", icon: "house-simple" },
  { to: "/lab", name: "lab", label: "Lab", icon: "flask" },
];
</script>

<template>
  <!-- Links -->
  <nav
    class="max-xl:bg-primary-900/10 max-xl:dark:bg-primary-100/10 flex flex-col items-center justify-center gap-y-8 border-r backdrop-blur-md transition-colors max-xl:rounded-b-xl max-xl:border max-xl:border-t-0 max-xl:py-20 xl:sticky xl:top-0 xl:left-0 xl:h-screen"
  >
    <h1 class="font-serif xl:text-2xl 2xl:text-4xl">MENU</h1>

    <hr class="w-1/2 border" />

    <ul class="flex items-center gap-4 xl:flex-col">
      <li v-for="link in navigationLinks" :key="link.name">
        <UiButton :is-active="$route.path === link.to" :to="link.to">
          <PhosphorIcon class="size-5" :name="link.icon" />
          <span :class="[$route.name !== link.name && 'max-xl:hidden']">{{
            link.label
          }}</span>
        </UiButton>
      </li>
    </ul>
  </nav>
</template>
