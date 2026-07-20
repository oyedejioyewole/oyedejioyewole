<template>
  <component
    :is="$props.to ? 'a' : 'button'"
    :href="$props.to"
    :rel="$props.to && 'noopener noreferrer'"
    :target="$props.to && '_blank'"
    data-spotlight-card
    class="relative overflow-hidden rounded-2xl border-[1.5px] border-current/30 bg-current/10 p-8 text-left backdrop-blur-sm transition duration-300 hover:border-current/70"
    style="--spotlight-opacity: 0; --spotlight-x: 0px; --spotlight-y: 0px"
    @mousemove="handleMouseMove"
    @focus="handleFocus"
    @blur="handleBlur"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      class="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300"
      :style="spotlightStyle"
    />

    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  spotlightColor: string;
  to?: string;
}

const props = defineProps<Props>();

const spotlightStyle = computed(() => ({
  opacity: `var(--spotlight-opacity)`,
  background: `radial-gradient(circle at var(--spotlight-x) var(--spotlight-y), ${props.spotlightColor}, transparent 80%)`,
}));

function handleMouseMove(event: MouseEvent) {
  const button = event.currentTarget as
    HTMLButtonElement | HTMLAnchorElement | null;

  if (!button) return;

  const rect = button.getBoundingClientRect();

  button.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
  button.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
}

function handleFocus(event: FocusEvent) {
  setSpotlightOpacity(event.currentTarget, "0.6");
}

function handleBlur(event: FocusEvent) {
  setSpotlightOpacity(event.currentTarget, "0");
}

function handleMouseEnter(event: MouseEvent) {
  console.info(event.currentTarget);
  setSpotlightOpacity(event.currentTarget, "0.6");
}

function handleMouseLeave(event: MouseEvent) {
  console.info(event.currentTarget);
  setSpotlightOpacity(event.currentTarget, "0");
}

function setSpotlightOpacity(target: EventTarget | null, value: string) {
  if (!(
    target instanceof HTMLButtonElement || target instanceof HTMLAnchorElement
  ))
    return;

  target.style.setProperty("--spotlight-opacity", value);
}
</script>
