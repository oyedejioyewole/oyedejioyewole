<template>
  <Html data-scroll-container lang="en" />

  <Body
    class="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 selection:bg-primary-500/50 cursor-crosshair overflow-x-hidden"
  />

  <AppEffectsCursorTracking />

  <main class="grid grid-cols-5">
    <!-- Left Sidebar -->
    <AppNavigation />

    <!-- Content -->

    <main class="col-span-5 xl:col-span-4">
      <div class="relative min-h-screen">
        <slot />
      </div>

      <!-- Footer -->
      <AppFooter v-show="currentPath !== '/'" />
    </main>
  </main>
</template>

<script lang="ts" setup>
useHead({
  titleTemplate: "%s · Oyedeji Oyewole",
});

const currentPath = inject("current-path") as Ref<string>;
</script>
