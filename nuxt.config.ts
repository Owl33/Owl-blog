// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,

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
