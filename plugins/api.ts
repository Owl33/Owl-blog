import { useUserStore } from "~/store/useUserStore";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const baseURL = config.public.baseUrl;
  const userStore = useUserStore();

  const api = $fetch.create({
    baseURL: baseURL,
    onRequest({ request, options, error }) {
      const headers = (options.headers ||= {});
      if (Array.isArray(headers)) {
        headers.push(["Authorization", `Bearer ${userStore.accessToken}`]);
      } else if (headers instanceof Headers) {
        headers.set("Authorization", `Bearer ${userStore.accessToken}`);
      } else {
        headers.Authorization = `Bearer ${userStore.accessToken}`;
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
