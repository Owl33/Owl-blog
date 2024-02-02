export default async <Type>(method: string,url:string,params?:any) => {
  const baseURL = 'https://back-owlblog.vercel.app'
  console.log(import.meta.env.MODE)
  const base =   import.meta.env.MODE == "production" ? baseURL : '/api'

  return await $fetch(base+url, {

    method :'POST',
    body: params,
  })
}