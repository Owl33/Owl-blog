// https://nuxt.com/docs/api/configuration/nuxt-config
import mkcert from "vite-plugin-mkcert";

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  vite: {
    plugins: [mkcert()],
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
    host: {
      https: false,
      port: 8080,
    },
  },
});
