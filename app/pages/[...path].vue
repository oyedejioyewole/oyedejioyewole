<template>
  <div v-if="content">
    <Title>{{ content.title }}</Title>

    <AppSplashScreen
      v-if="showSplashScreen"
      :number-of-tasks="content.numberOfTasks!"
    />

    <ContentRenderer
      v-show="!showSplashScreen"
      :class="['space-y-6', $route.path !== '/' && 'm-8']"
      :value="content"
    />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const { numberOfCompletedTasks } = useTasks();

const { data: content } = await useAsyncData(
  `content-${route.path}`,
  () => queryCollection("content").path(route.path).first(),
  { watch: [route] },
);

const showSplashScreen = computed(
  () =>
    content.value &&
    content.value.numberOfTasks &&
    numberOfCompletedTasks.value < content.value.numberOfTasks,
);

watchEffect(() => {
  if (!content.value)
    throw showError({
      message: "You tried visiting a non-existent page.",
      status: 404,
      statusText: "Page not found",
    });
});
</script>
