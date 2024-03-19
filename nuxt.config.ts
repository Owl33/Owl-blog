// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,

  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  site: {
    url: "https://www.owlblog.site",
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
        process.env.NODE_ENV == "prod"
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
