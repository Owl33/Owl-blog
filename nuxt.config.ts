// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,

  app: {
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
  },

  robots: {
    // provide simple disallow rules for all robots `user-agent: *`
    // sitemap: "/sitemap.xml",
    // disallow: ["/login"],
    // allow: "/",
    mergeWithRobotsTxtPath: "robots.txt",
  },

  sitemap: {
    sources: ["/api/__sitemap__/urls"],
  },

  site: {
    url: "https://www.owlblog.org",
    trailingSlash: true,
    indexable: true,
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  ignore: ["**/resume/project/**", "**/components/**"],

  // image: {
  //   dir: "assets/images",
  // },

  runtimeConfig: {
    // The private keys which are only available within server-side
    public: {
      baseUrl:
        process.env.NODE_ENV == "production"
          ? "https://api.owlblog.org/v1"
          : "http://localhost:8080/v1",
    },
  },

  modules: [
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "nuxt-simple-robots",
    "@nuxtjs/sitemap",
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
  ],

  colorMode: {
    classSuffix: "",
  },

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "Ui",
    /**
     * Directory that the component lives in.
     */
    componentDir: "./components/ui",
  },

  // devServer: {
  //   https: {
  //     key: "./.cert/key.pem",
  //     cert: "./.cert/cert.pem",
  //   },
  // },
  components: [{ path: "~/components/base", prefix: "Base" }],

  compatibilityDate: "2025-08-14",
});