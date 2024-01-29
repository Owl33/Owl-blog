export default <Type>(method: string, url: string, params?: any) => {
  const baseURL = "https://back-owlblog.vercel.app";

  if (method.toUpperCase() == "GET") {
    const { data, pending, error, refresh } = useAsyncData<Type>(
      `${url}key`,
      () =>
        $fetch(baseURL + url, {
          params,
          onRequest({ request, response, options }) {},
          onResponse({ request, response, options }) {
            // Process the response data
          },
          lazy: true,
        })
    );
    return { data, pending, error, refresh };
  } else {
    return useFetch(url, {
      method:
        method.toUpperCase() == "POST"
          ? "POST"
          : method.toUpperCase() == "PUT"
          ? "PUT"
          : "DELETE",
      baseURL,
      body: params,
      onRequest({ request, response, options }) {},
      onResponse({ request, response, options }) {
        // Process the response data
      },
    });
  }
};
