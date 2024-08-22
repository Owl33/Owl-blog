import { useUserStore } from "~/store/useUserStore";
import { useUIStore } from "~/store/useUIStore"; // uiStore import 추가

export default defineNuxtPlugin((nuxtApp) => {
  // const { session } = useUserSession();

  const config = useRuntimeConfig();
  const baseURL = config.public.baseUrl;
  const userStore = useUserStore();
  const uiStore = useUIStore(); // uiStore 사용

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
      console.log("리스폰스", response.body);

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
