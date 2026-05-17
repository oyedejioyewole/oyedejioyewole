<template>
  <AnimatePresence>
    <motion.div
      v-show="!shouldSnap"
      :initial="{ opacity: 0, scale: 0 }"
      :animate="{ opacity: 1, scale: 1 }"
      :exit="{ opacity: 0, scale: 0 }"
      :class="
        twMerge([
          'pointer-events-none fixed grid aspect-square h-20 place-items-center rounded-full border',
          shouldMorph ? 'z-10 border-0 bg-current' : '-z-10 border-dashed',
        ])
      "
      :style="{
        x: replicatedX,
        y: replicatedY,
        translate: '-50% -50%',
      }"
    >
      <NuxtIcon
        v-if="shouldMorph"
        class="z-10 size-7.5 mix-blend-difference"
        name="ph:arrow-up-right"
      />
    </motion.div>
  </AnimatePresence>
</template>

<script lang="ts" setup>
import { animate, motion, useMotionValue } from "motion-v";
import { twMerge } from "tailwind-merge";

const replicatedX = useMotionValue(0);
const replicatedY = useMotionValue(0);

const shouldMorph = shallowRef(false);
const shouldSnap = shallowRef(true);

const { x, y, pointerType } = usePointer();
watch([x, y, pointerType], ([newX, newY, newPointerType]) => {
  if (newPointerType !== "mouse") return;

  // elementFromPoint uses viewport-relative coordinates
  const currentElement = document.elementFromPoint(newX, newY);

  const isMorphTarget = Boolean(currentElement?.closest("[data-morph-cursor]"));
  shouldMorph.value = isMorphTarget;

  shouldSnap.value =
    !isMorphTarget && Boolean(currentElement?.closest("[data-snap-cursor]"));

  animate(replicatedX, newX, { type: "tween" });
  animate(replicatedY, newY, { type: "tween" });
});
</script>
