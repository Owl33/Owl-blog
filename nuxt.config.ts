// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,

  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  robots: [
    {
      UserAgent: "Googlebot",
      Disallow: "/login",
    },
    {
      UserAgent: "Yeti",
      Disallow: "/login",
    },
    {
      UserAgent: "*",
      Disallow: "/login",
    },
  ],
  sitemap: {
    sources: ["/api/__sitemap__/urls"],
  },
  site: {
    url: "https://www.owlblog.site",
    trailingSlash: true,
  },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    // The private keys which are only available within server-side
    public: {
      baseUrl:
        process.env.NODE_ENV == "production"
          ? "https://back.owlblog.site/v1"
          : "http://localhost:8080/v1",
    },
  },

  modules: [
    // ...
    "@nuxt/image",
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
    "@pinia/nuxt",
  ],
  devServer: {
    https: {
      key: "./.cert/key.pem",
      cert: "./.cert/cert.pem",
    },
  },
  vite: {
    server: {
      hmr: {
        protocol: "wss",
      },
    },
  },
});
