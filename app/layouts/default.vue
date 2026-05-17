<template>
  <Html data-scroll-container lang="en" />

  <Body
    class="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 selection:bg-primary-500/50 cursor-crosshair overflow-x-hidden"
  />

  <AppEffectsCursorTracking />
  <AppEffectsPathTransition ref="transition" />

  <main class="grid grid-cols-5">
    <!-- Left Sidebar -->
    <AppNavigation
      v-model="skipPageTransition"
      @navigation:close="pageTransition?.onEnter"
      @navigation:open="pageTransition?.onLeave"
    />

    <!-- Content -->
    <main class="col-span-5 xl:col-span-4">
      <div class="relative">
        <slot
          :skip-path-transition="skipPageTransition"
          :page-transition="pageTransition"
        />
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

const skipPageTransition = shallowRef(false);

const { currentPath, route } = useCurrentPath();
const transitionRef = useTemplateRef("transition");
const pageTransition = computed(() => {
  return (
    transitionRef.value && {
      onLeave: (onComplete: () => void) =>
        transitionRef.value?.enter(onComplete),
      onEnter: (onComplete: () => void) =>
        transitionRef.value?.exit(onComplete),
      onAfterLeave: () => {
        currentPath.value = route.path;
      },
    }
  );
});
</script>
