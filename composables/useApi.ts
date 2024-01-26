export default (method: string, url: string, params?: any) => {
  const baseURL = "https://back-owlblog.vercel.app";

  if (method.toUpperCase() == "GET") {
    return useAsyncData(`${url}key`, () =>
      $fetch(baseURL + url, {
        params,
        onRequest({ request, response, options }) {},
        onResponse({ request, response, options }) {
          // Process the response data
        },
      })
    );
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
