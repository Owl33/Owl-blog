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
      // Process the response data
      // console.log("res", response);
    },
    async onResponseError({ response }) {
      // if (response.status === 401) {
      //   await nuxtApp.runWithContext(() => navigateTo("/login"));
      // }
    },
  });

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
    },
  };
});
