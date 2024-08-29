import { useUserStore } from "~/store/useUserStore";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const baseURL = config.public.baseUrl;
  const userStore = useUserStore();

  const api = $fetch.create({
    baseURL: baseURL,
    credentials: "include",

    async onRequest({ request, options, error }) {
      if (options.method && options.method.toUpperCase() !== "GET") {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${userStore.accessToken}`,
        };
      }
    },
    async onResponse({ request, response, options }) {},
    async onResponseError({ request, options, response }) {
      if (response.status === 401) {
        await userStore.refresh(); // refresh() 함수 실행
      }
    },
  });

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
    },
  };
});
