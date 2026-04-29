<template>
  <AppEffectsPathTransition ref="transition" />

  <NuxtLayout v-slot="{ pathTransition, updateCurrentPath }">
    <NuxtPage
      :transition="
        !pathTransition.skipTransition && {
          css: false,
          onAfterLeave: updateCurrentPath,
          onLeave: (_, done) => pathTransition.enter?.(done),
          onEnter: (_, done) => pathTransition.exit?.(done),
          mode: 'out-in',
        }
      "
    />
  </NuxtLayout>
</template>
