import { tv } from "tailwind-variants";

export const buttonVariants = tv({
  base: "group cursor-pointer rounded-full px-5 py-3 text-sm backdrop-blur-sm outline-none transition duration-300 focus:ring has-[svg]:inline-flex has-[svg]:items-center has-[svg]:gap-x-4 disabled:opacity-50",
  variants: {
    iconOnly: {
      true: "border hover:ring",
      false:
        "bg-current/10 overflow-hidden rounded-full shadow shadow-current/30 before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-primary-700 before:duration-300 before:origin-left before:scale-x-0 before:transition dark:before:bg-primary-300 hover:text-primary-300 hover:before:scale-x-100 dark:hover:text-primary-700",
    },
  },
});
