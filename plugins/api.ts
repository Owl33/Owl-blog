import { useUserStore } from "~/store/useUserStore";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const baseURL = config.public.baseUrl;
  const userStore = useUserStore();

  const api = $fetch.create({
    baseURL: baseURL,
    onRequest({ request, options, error }) {
      if (options.method && options.method.toUpperCase() !== "GET") {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${userStore.accessToken}`,
        };
      }
    },
    onResponse({ request, response, options }) {
      // console.log("res", response);
    },
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
