export default <Type>(url:string,params?:any) => {
     const baseURL = 'https://back-owlblog.vercel.app'
     console.log(import.meta.env.MODE)
     const base =   import.meta.env.MODE == "production" ? baseURL : '/api'
   
       return  useAsyncData<Type>(url,
        () => $fetch(base+url, {
          params,
          onRequest({ request, response, options }) {},
          onResponse({ request, response, options }) {
          }  
        }))
    };