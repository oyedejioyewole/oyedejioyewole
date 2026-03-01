<template>
  <Html lang="en" />

  <Body
    class="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 selection:bg-primary-500/50 cursor-crosshair overflow-x-hidden"
    data-scroll-container
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

  <AppEffectsCursorTracking v-show="showCursorFx" />

  <main class="grid min-h-screen grid-cols-5">
    <!-- Left Sidebar -->
    <AppLeftSidebar />

    <!-- Content -->
    <main
      :class="[
        'ease-in-out-circ col-span-3 mx-auto w-[90%] transition-all duration-300',
        hasRightSidebarBeenHovered ? 'xl:w-full' : 'xl:w-[125%]',
      ]"
    >
      <slot />
    </main>

    <!-- Right Sidebar -->
    <AppRightSidebar
      v-model:cursorFx="enableCursorFx"
      v-model:hovered="hasRightSidebarBeenHovered"
    />
  </main>
</template>

<script lang="ts" setup>
const enableCursorFx = shallowRef(true);
const showCursorFx = computed(() => enableCursorFx.value);
const hasRightSidebarBeenHovered = shallowRef(false);

useHead({
  titleTemplate: "%s · Oyedeji Oyewole",
});
</script>
