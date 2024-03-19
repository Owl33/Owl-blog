import { useUIStore } from "../store/useUIStore";
import { useUserStore } from "~/store/useUserStore";
interface responseObj {
  data: any;
  statusCode: number;
  path: string;
  message: string;
  timestamp: string;
}
type Method =
  | "POST"
  | "PATCH"
  | "PUT"
  | "DELETE"
  | "post"
  | "patch"
  | "put"
  | "delete"
  | undefined;

export default async <Type>(method: Method, url: string, params?: any) => {
  const config = useRuntimeConfig();
  const baseURL = config.public.baseUrl;
  const uiStore = useUIStore();
  const userStore = useUserStore();

  // if (!accessToken) {
  //   await userStore.refresh();
  // }
  uiStore.startLoading();
  try {
    const res: responseObj = await $fetch(baseURL + url, {
      headers: {
        Authorization: userStore.accessToken
          ? `Bearer ${userStore.accessToken}`
          : "",
      },
      method: method,
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
