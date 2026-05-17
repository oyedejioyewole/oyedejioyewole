export default defineNuxtConfig({
  $development: {
    routeRules: {
      "/api/photos": { swr: true },
    },
  },
  app: {
    head: {
      link: [
        {
          href: "/favicon.svg",
          rel: "icon",
          type: "image/svg+xml",
        },
      ],
    },
  },
  compatibilityDate: "2026-01-10",
  content: {
    build: { markdown: { highlight: false } },
    experimental: { sqliteConnector: "native" },
  },
  devtools: {
    enabled: true,
  },
  experimental: {
    componentIslands: {
      selectiveClient: true,
    },
  },
  icon: {
    clientBundle: {
      scan: true,
    },
    componentName: "nuxt-icon",
    mode: "svg",
  },
  image: {
    github: {},
    ipx: {},
    none: {},
    provider: "ipx",
  },
  modules: [
    "@nuxt/content",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/color-mode",
    "@nuxtjs/tailwindcss",
    // "nuxt-og-image",
    "@vueuse/nuxt",
    "motion-v/nuxt",
  ],
  nitro: {
    // This prevents errors like ENOTDIR when navigating ISR routes in development
    // devStorage: {
    //   cache: {
    //     driver: "memory",
    //   },
    // },
    prerender: {
      crawlLinks: true,
      routes: ["/"],
    },
  },
  routeRules: {
    "/api/photos": { isr: 60 * 60 * 24 * 7 }, // 7 days
  },
  runtimeConfig: {
    pexels: {
      apiKey: "",
      showcaseCollectionId: "",
    },
  },
  // site: { url: "https://oyedejioyewole.vercel.app" },
  vite: {
    build: {
      terserOptions: {
        format: {
          comments: false,
        },
      },
    },
    esbuild: {
      legalComments: "none",
    },
    optimizeDeps: {
      include: [
        "@vue/devtools-core",
        "@vue/devtools-kit",
        "locomotive-scroll",
        "tailwind-merge",
        "motion-v",
      ],
    },
  },
});
