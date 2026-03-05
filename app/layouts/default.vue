<template>
  <Html data-scroll-container lang="en" />

  <Body
    class="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 selection:bg-primary-500/50 cursor-crosshair overflow-x-hidden"
  />

  <AppEffectsCursorTracking />

  <main class="grid min-h-screen grid-cols-5">
    <!-- Left Sidebar -->
    <AppNavigation />

    <!-- Content -->
    <main
      class="ease-in-out-circ col-span-4 mx-auto w-[90%] transition-all duration-300 xl:w-full"
    >
      <slot />
    </main>
  </main>
</template>

<script lang="ts" setup>
useHead({
  titleTemplate: "%s · Oyedeji Oyewole",
});
</script>
