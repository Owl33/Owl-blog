import { useUIStore } from "../store/useUIStore";

interface responseObj {
  data: any;
  statusCode: number;
  path: string;
  message: string;
  timestamp: string;
}
export default async <Type>(method: string, url: string, params?: any) => {
  const baseURL = "https://back-owlblog.vercel.app/v1";
  // const baseURL = "http://127.0.1:3000/v1";
  const uiStore = useUIStore();

  uiStore.startLoading();
  try {
    const res: responseObj = await $fetch(baseURL + url, {
      method:
        method.toUpperCase() == "POST"
          ? "POST"
          : method.toUpperCase() == "PUT"
          ? "PUT"
          : method.toUpperCase() == "DELETE"
          ? "DELETE"
          : undefined,
      body: params,
      credentials: "include",
    });
    uiStore.finishLoading();
    return res;
  } catch {
    uiStore.finishLoading();
    return { data: undefined, statusCode: 400, message: "Fail" };
  }
};
