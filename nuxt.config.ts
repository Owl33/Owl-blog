// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  runtimeConfig: {
    public: {
      apiBase: "https://back-owlblog.vercel.app",
    },
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
      key: "./cert/owl-key.pem",
      cert: "./cert/owl.pem",
    },
    port: 8080,
  },
  vite: {
    server: {
      hmr: {
        protocol: "wss",
      },
    },
  },
});
