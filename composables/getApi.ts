import { useUserStore } from "~/store/useUserStore";

export default <Type>(url: string, params?: any) => {
  const config = useRuntimeConfig();
  const baseURL = config.public.baseUrl;
  // const baseURL = "http://localhost:8080/v1";
  const userStore = useUserStore();

  return useAsyncData<Type>(url, () =>
    $fetch(baseURL + url, {
      params,
      onRequest({ request, response, options }) {},
      onResponse({ request, response, options }) {},
    })
  );
};
