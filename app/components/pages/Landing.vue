<template>
  <section class="xl:min grid min-h-dvh grid-cols-12 xl:grid-cols-4">
    <div
      class="col-[2/12] flex flex-col items-center justify-center gap-y-8 text-center xl:col-[2/4]"
    >
      <!-- Identity x profile picture -->
      <NuxtImg
        class="size-40 rounded-lg outline outline-offset-4 transition duration-300 outline-dashed hover:-translate-y-2 hover:rotate-5 hover:outline-solid"
        data-snap-cursor
        format="webp"
        placeholder
        provider="github"
        src="oyedejioyewole"
      />

      <slot />
    </div>
  </section>
</template>
