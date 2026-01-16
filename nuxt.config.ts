export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: "%s · Oyedeji Oyewole",
    },
  },
  content: {
    // highlight: {
    //   theme: {
    //     dark: "github-dark",
    //     default: "github-light",
    //   },
    // },
    experimental: { sqliteConnector: "native" },
  },
  compatibilityDate: "2026-01-10",
  devtools: { enabled: true },
  modules: [
    "@nuxt/content",
    "@nuxt/fonts",
    "@nuxtjs/color-mode",
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "notivue/nuxt",
    "nuxt-og-image",
    "nuxt-phosphor-icons",
  ],
  notivue: {
    position: "bottom-center",
  },
  runtimeConfig: {
    vercel: {
      bearerToken: "",
      initialDeploymentId: "",
    },
  },
  site: { url: "https://oyedejioyewole.vercel.app" },
});
