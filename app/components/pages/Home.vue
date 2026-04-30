<template>
  <section
    class="xl:min grid min-h-[calc(96dvh-46px)] grid-cols-12 xl:min-h-dvh xl:grid-cols-4"
  >
    <div
      class="col-[2/12] grid place-content-center place-items-center gap-y-8 text-center text-pretty xl:col-[2/4]"
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
