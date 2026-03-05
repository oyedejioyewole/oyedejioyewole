<template>
  <!-- OG image template for social media sharing -->
  <div class="w-full">
    <div class="relative mx-auto h-screen w-[90%] py-20">
      <h1 class="text-5xl font-extrabold">{{ $props.title }}</h1>
      <p class="text-4xl">{{ $props.description }}</p>

      <!-- Decorative gradient blob -->
      <div
        class="absolute right-10 bottom-20 size-50 rounded-full"
        style="
          background: linear-gradient(
            45deg,
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0.8)
          );
        "
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
interface PageProps {
  description: string;
  title: string;
}

defineProps<PageProps>();
</script>
