<template>
  <div
    ref="cursor-sprite"
    :class="[
      'fixed -z-10 aspect-square h-20 rounded-full border border-dashed',
      !(x || y) && 'scale-0',
    ]"
  />
</template>

<script lang="ts" setup>
import { createAnimatable } from "animejs/animatable";

const isElementSnappable = (element: Element | null) =>
  element?.closest("[data-snap-cursor]") !== null;

const ANIMATION_DURATION = 300;

const cursorSprite = useTemplateRef("cursor-sprite");
const cursorSpriteAnimatable = computed(() => {
  if (!cursorSprite.value) return;

  const animatable = createAnimatable(cursorSprite.value, {
    x: ANIMATION_DURATION,
    y: ANIMATION_DURATION,
    scale: ANIMATION_DURATION,
    opacity: ANIMATION_DURATION,
    ease: "out(3)",
  });

  // Position the element at the viewport center immediately (duration 0)
  // so animejs tracks this as its starting value. The first mousemove will
  // then animate from center → cursor, not from (0,0) → cursor.
  animatable.x(window.innerWidth / 2);
  animatable.y(window.innerHeight / 2);

  return animatable;
});

const { x, y, pointerType } = usePointer();
watch(
  [x, y, pointerType, cursorSpriteAnimatable],
  ([newX, newY, newPointerType, newCursorSpriteAnimatable]) => {
    if (!newCursorSpriteAnimatable || newPointerType !== "mouse") return;

    // elementFromPoint uses viewport-relative coordinates
    const currentElement = document.elementFromPoint(newX, newY);
    const shouldSnap = isElementSnappable(currentElement);

    newCursorSpriteAnimatable.scale(shouldSnap ? 0 : 1);
    newCursorSpriteAnimatable.opacity(shouldSnap ? 0 : 1);

    newCursorSpriteAnimatable.x(newX - 40);
    newCursorSpriteAnimatable.y(newY - 40);
  },
);
</script>
