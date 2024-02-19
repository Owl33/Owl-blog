// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,

  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },

  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
    // ...
    "@nuxt/image",

    "@pinia/nuxt",
  ],
  devServer: {
    https: {
      key: "./cert/key.pem",
      cert: "./cert/cert.pem",
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
