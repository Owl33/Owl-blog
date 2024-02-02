export default <Type>(url:string,params?:any) => {
     const baseURL = 'https://back-owlblog.vercel.app/v1'

       return  useAsyncData<Type>(url,
        () => $fetch(baseURL+url, {
          params,
          onRequest({ request, response, options }) {},
          onResponse({ request, response, options }) {
          }  
        }))
    };