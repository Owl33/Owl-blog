// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,

  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  robots: {
    UserAgent: "*",
    Disallow: "/login",
  },
  site: {
    url: "https://www.owlblog.site",
    sitemaps: true,
    cacheMaxAgeSeconds: 3600, // 1 hour

    urls: async () => {
      const data = await fetch("https://back.owlblog.site/v1/posts")
        .then((res) => res.json())
        .then((data) => data.data);
      return data.map((post: any) => `v1/${post.postId}`);
    },
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
