import { defineContentConfig, defineCollection } from "@nuxt/content";
import { z } from "zod";

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: "page",
      source: "**/*.md",
    }),
    projects: defineCollection({
      type: "data",
      source: "projects/**.json",
      schema: z.object({
        description: z.string(),
        isDraft: z.boolean(),
        name: z.string(),
        displayName: z.string().optional(),
        url: z.string().optional(),
      }),
    }),
  },
});
