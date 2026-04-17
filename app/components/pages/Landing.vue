<template>
  <section class="grid min-h-screen grid-cols-4">
    <div
      class="col-[2/4] flex flex-col items-center justify-center gap-y-8 text-center"
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
