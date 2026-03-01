<template>
  <div
    ref="spotlight-card"
    :class="
      twMerge(
        'relative overflow-hidden rounded-3xl border p-8',
        $attrs.class as string | undefined,
      )
    "
    @blur="handleBlur"
    @focus="handleFocus"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousemove="handleMouseMove"
  >
    <div
      class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
      :style="{
        opacity,
        background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
      }"
    />

    <slot />
  </div>
</template>

<script lang="ts" setup>
import { twMerge } from "tailwind-merge";

interface Position {
  x: number;
  y: number;
}

interface SpotlightCardProps {
  spotlightColor?: string;
}

withDefaults(defineProps<SpotlightCardProps>(), {
  spotlightColor:
    "color-mix(in srgb, var(--color-primary-500), transparent 50%)",
});

const spotlightCardRef = useTemplateRef("spotlight-card");
const isFocused = shallowRef(false);
const position = shallowRef<Position>({ x: 0, y: 0 });
const opacity = shallowRef(0);

const handleMouseMove = (event: MouseEvent) => {
  if (!spotlightCardRef.value || isFocused.value) return;

  const rect = spotlightCardRef.value.getBoundingClientRect();
  position.value = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
};

const handleFocus = () => {
  isFocused.value = true;
  opacity.value = 0.6;
};

const handleBlur = () => {
  isFocused.value = false;
  opacity.value = 0;
};

const handleMouseEnter = () => {
  opacity.value = 0.6;
};

const handleMouseLeave = () => {
  opacity.value = 0;
};
</script>
