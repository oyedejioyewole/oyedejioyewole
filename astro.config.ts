// @ts-check
import { defineConfig, envField, fontProviders } from "astro/config";

import vue from "@astrojs/vue";
import tailwindcss from "@tailwindcss/vite";

import Icons from "unplugin-icons/vite";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      PEXELS_API_KEY: envField.string({ context: "server", access: "secret" }),
      PEXELS_SHOWCASE_COLLECTION_ID: envField.string({
        context: "server",
        access: "secret",
      }),
    },
    validateSecrets: true,
  },

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Croissant One",
      cssVariable: "--font-croissant-one",
    },
    {
      provider: fontProviders.fontsource(),
      name: "Playfair Display",
      cssVariable: "--font-playfair-display",
    },
    {
      provider: fontProviders.fontsource(),
      name: "Poppins",
      cssVariable: "--font-poppins",
    },
  ],

  image: {
    domains: ["avatars.githubusercontent.com", "images.pexels.com"],
  },

  integrations: [vue()],

  vite: {
    plugins: [tailwindcss(), Icons({ compiler: "astro" })],
  },

  adapter: netlify(),
});
