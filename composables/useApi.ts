import type { AsyncDataOptions, AsyncData, NuxtError, AsyncDataRequestStatus } from "nuxt/app";
type HttpMethod =
  | "GET"
  | "HEAD"
  | "PATCH"
  | "POST"
  | "PUT"
  | "DELETE"
  | "CONNECT"
  | "OPTIONS"
  | "TRACE";

interface Response<T> {
  data: T | any;
  statusCode: number;
  path: string;
  message: string;
  timestamp: string;
}

class useApi {
  private static instance: useApi;

  private constructor() {}

  public static createInstance() {
    if (!useApi.instance) {
      useApi.instance = new useApi();
    }
    return useApi.instance;
  }

  public async get<T>(
    url: string,
    params?: AsyncDataOptions<any>
  ): Promise<AsyncData<Response<T>, Error>> {
    const { $api } = useNuxtApp();
    //@ts-ignore
    const response = await useAsyncData<Response<T>>(url, () => $api(url, { body: params }));

    return response as AsyncData<Response<T>, Error>;
  }

  private async request<T>(
    method: HttpMethod,
    url: string,
    params?: T | any
  ): Promise<AsyncData<Response<T>, Error>> {
    const { $api } = useNuxtApp();
    //@ts-ignore
    const response = await $api<Response<T>>(url, { method: method, body: params });
    const data = {
      data: ref<Response<T>>(response),
    };
    return data as AsyncData<Response<T>, Error>;
  }

  public async post<T>(url: string, params: T | any) {
    return await this.request<T>("POST", url, params);
  }
  public async put<T>(url: string, params: T | any) {
    return await this.request<T>("PUT", url, params);
  }

  public async patch<T>(url: string, params: T | any) {
    return await this.request<T>("PATCH", url, params);
  }

  public async delete<T>(url: string, params: T | any) {
    return await this.request<T>("DELETE", url, params);
  }
}

export default useApi.createInstance();
