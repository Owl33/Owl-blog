import { useUIStore } from "../store/useUIStore";
import { useUserStore } from "~/store/useUserStore";
interface responseObj {
  data: any;
  statusCode: number;
  path: string;
  message: string;
  timestamp: string;
}
export default async <Type>(method: string, url: string, params?: any) => {
  const baseURL = "https://back.owlblog.site/v1";

  // const baseURL = "http://localhost:8080/v1";
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
