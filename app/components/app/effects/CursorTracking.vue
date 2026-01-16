<script lang="ts" setup>
import { createAnimatable } from "animejs/animatable";

const ANIMATION_DURATION = 300;

const { x, y } = useMouse({ touch: false });

const cursorSprite = useTemplateRef("cursor-sprite");
const cursorSpriteAnimatable = computed(() => {
  if (!cursorSprite.value) return null;
  return createAnimatable(cursorSprite.value, {
    x: ANIMATION_DURATION,
    y: ANIMATION_DURATION,
    scale: ANIMATION_DURATION,
    opacity: ANIMATION_DURATION,
    ease: "out(3)",
  }) as any;
});

const isElementSnappable = (element: Element | null) => {
  return element?.closest("[data-snap-cursor]") !== null;
};

watch([x, y], ([newX, newY]) => {
  if (!cursorSpriteAnimatable.value) return;

  const currentElement = document.elementFromPoint(
    newX - window.pageXOffset,
    newY - window.pageYOffset,
  );
  const shouldSnap = isElementSnappable(currentElement);

  cursorSpriteAnimatable.value.scale(shouldSnap ? 0 : 1);
  cursorSpriteAnimatable.value.opacity(shouldSnap ? 0 : 1);

  cursorSpriteAnimatable.value.x(newX - 40);
  cursorSpriteAnimatable.value.y(newY - 40);
});
</script>

<template>
  <div
    class="-z-10 absolute opacity-0 hidden aspect-square h-20 rounded-full border lg:block"
    ref="cursor-sprite"
  />
</template>
