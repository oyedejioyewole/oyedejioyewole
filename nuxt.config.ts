export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/favicon.svg",
        },
      ],
    },
  },
  content: {
    experimental: { sqliteConnector: "native" },
    build: {
      markdown: {
        highlight: {
          theme: {
            dark: "github-dark",
            default: "github-light",
          },
        },
      },
    },
  },
  compatibilityDate: "2026-01-10",
  devtools: { enabled: true },
  image: {
    github: {},
    ipx: {},
    none: {},
    provider: "ipx",
  },
  modules: [
    "@nuxt/content",
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxtjs/color-mode",
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    // "nuxt-og-image",
    "nuxt-phosphor-icons",
    // "nuxt-security",
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
  // security: {
  //   headers: {
  //     contentSecurityPolicy: false,
  //   },
  // },
  // site: { url: "https://oyedejioyewole.vercel.app" },
  vite: {
    esbuild: {
      legalComments: "none",
    },
    build: {
      terserOptions: {
        format: {
          comments: false,
        },
      },
    },
  },
  $development: {
    routeRules: {
      "/api/photos": { swr: true },
    },
  },
});
