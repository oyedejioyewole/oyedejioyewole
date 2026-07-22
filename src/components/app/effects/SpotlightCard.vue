<template>
  <component
    :is="$props.to ? 'a' : 'div'"
    :href="$props.to"
    :rel="$props.to && 'noopener noreferrer'"
    :target="$props.to && '_blank'"
    class="relative bg-current/10 backdrop-blur-sm p-8 border border-current/30 hover:border-current/70 rounded-2xl overflow-hidden text-left transition duration-300"
    data-spotlight-card
    style="--spotlight-opacity: 0; --spotlight-x: 0px; --spotlight-y: 0px"
    @mousemove="handleMouseMove"
    @focus="handleFocus"
    @blur="handleBlur"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      class="absolute inset-0 opacity-0 rounded-2xl transition-opacity duration-300 pointer-events-none"
      :style="spotlightStyle"
    />

    <slot />
  </component>
</template>

<script lang="ts">
interface Props {
  spotlightColor: string;
  to?: string;
}
</script>

<script setup lang="ts">
const props = defineProps<Props>();

const spotlightStyle = {
  opacity: `var(--spotlight-opacity)`,
  background: `radial-gradient(circle at var(--spotlight-x) var(--spotlight-y), ${props.spotlightColor}, transparent 70%)`,
};

function handleMouseMove(event: MouseEvent) {
  const button = event.currentTarget as
    | HTMLButtonElement
    | HTMLAnchorElement
    | null;

  if (!button) return;

  const rect = button.getBoundingClientRect();

  button.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
  button.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
}

function handleFocus(event: FocusEvent) {
  setSpotlightOpacity(event.currentTarget, "0.5");
}

function handleBlur(event: FocusEvent) {
  setSpotlightOpacity(event.currentTarget, "0");
}

function handleMouseEnter(event: MouseEvent) {
  console.info(event.currentTarget);
  setSpotlightOpacity(event.currentTarget, "0.5");
}

function handleMouseLeave(event: MouseEvent) {
  console.info(event.currentTarget);
  setSpotlightOpacity(event.currentTarget, "0");
}

function setSpotlightOpacity(target: EventTarget | null, value: string) {
  if (!(target instanceof HTMLElement)) return;

  target.style.setProperty("--spotlight-opacity", value);
}
</script>
