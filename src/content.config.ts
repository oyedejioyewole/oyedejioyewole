import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "*.yml", base: "./src/data/projects" }),
  schema: z.object({
    description: z.string(),
    displayName: z.string().optional(),
    isDraft: z.boolean(),
    name: z.string(),
    url: z.url().optional(),
  }),
});

export const collections = { projects };
