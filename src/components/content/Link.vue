<template>
  <a
    class="group/link inline-block relative font-serif hover:text-primary-700 dark:hover:text-primary-300 tracking-wide"
    data-snap-cursor
  >
    <slot />

    <span
      class="bottom-0 group-hover/link:bottom-[35%] absolute inset-x-0 bg-current h-px group-hover/link:h-0.5 origin-bottom transition-all duration-300"
    ></span>
  </a>
</template>
