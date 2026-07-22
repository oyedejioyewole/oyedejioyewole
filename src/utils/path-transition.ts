import { animate } from "motion";

export const pathTransition = document.querySelector<SVGElement>(
  "svg#path-transition",
)!;

export async function exitSequence() {
  await animate(
    pathTransition.querySelector("path"),
    {
      pathLength: [1, 0],
      pathOffset: [0, 1],
      ...(window.innerWidth >= 1280 && { strokeWidth: [250, 2] }),
    },
    {
      duration: 1,
      onComplete: () => {
        pathTransition.classList.add("invisible");
      },
    },
  );
}

export async function enterSequence(onComplete?: () => Promise<void> | void) {
  await animate(
    pathTransition.querySelector("path"),
    {
      pathLength: [0, 1],
      pathOffset: [0, 0],
      ...(window.innerWidth >= 1280 && { strokeWidth: [2, 250] }),
    },
    { duration: 1, onPlay: () => pathTransition.classList.remove("invisible") },
  );

  if (onComplete) await onComplete();
}
