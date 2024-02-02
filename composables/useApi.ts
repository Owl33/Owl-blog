export default async <Type>(method: string,url:string,params?:any) => {
  const baseURL = 'https://back-owlblog.vercel.app/v1'


  return await $fetch(baseURL+url, {
    method :'POST',
    body: params,
  })
}