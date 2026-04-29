<template>
  <Html lang="en" />

  <Head>
    <Title>{{ $props.error.status }}</Title>
  </Head>

  <NuxtLayout>
    <section class="grid min-h-screen place-content-center gap-y-4 text-center">
      <ProseP>Hmm, that's weird, a</ProseP>

      <ProseH1 class="text-[10dvw]">
        {{ $props.error.status }}
      </ProseH1>

      <ProseP class="max-w-sm text-pretty"
        ><ProseStrong>Reason:</ProseStrong> {{ $props.error.message }}</ProseP
      >

      <ProseA class="mx-auto w-fit" href="/">Go home</ProseA>
    </section>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { NuxtError } from "#app";

defineProps<{ error: NuxtError }>();
</script>
