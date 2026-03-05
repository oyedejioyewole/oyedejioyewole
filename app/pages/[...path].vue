<template>
  <div v-if="content">
    <Title>{{ content.title }}</Title>

    <AnimatePresence>
      <AppSplashScreen
        v-if="showSplashScreen"
        @animation-loop-finish="hasAnimationLoopFinished = !pending"
      />

      <ContentRenderer
        v-show="!showSplashScreen"
        :class="['space-y-6', $route.path !== '/' && 'm-8']"
        :value="content"
      />
    </AnimatePresence>
  </div>
</template>

<script lang="ts" setup>
import { AnimatePresence } from "motion-v";

const route = useRoute();

const { data: content, pending } = useLazyAsyncData(
  `content-${route.path}`,
  () => queryCollection("content").path(route.path).first(),
  {
    watch: [route],
    getCachedData: (key, nuxtApp) =>
      nuxtApp.payload.data[key] || nuxtApp.static.data[key],
  },
);

const hasAnimationLoopFinished = shallowRef(false);
const showSplashScreen = computed(
  () => pending.value || !hasAnimationLoopFinished.value,
);

watchEffect(() => {
  if (!content.value && !pending.value)
    throw showError({
      message: "You tried visiting a non-existent page.",
      status: 404,
      statusText: "Page not found",
    });
});
</script>
