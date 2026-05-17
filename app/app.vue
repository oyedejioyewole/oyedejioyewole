<template>
  <NuxtLayout v-slot="{ skipPathTransition, pageTransition }">
    <NuxtPage
      :transition="
        !skipPathTransition && {
          css: false,
          mode: 'out-in',
          onAfterLeave: pageTransition?.onAfterLeave,
          onLeave: (_, done) => pageTransition?.onLeave(done),
          onEnter: (_, done) => pageTransition?.onEnter(done),
        }
      "
    />
  </NuxtLayout>
</template>
