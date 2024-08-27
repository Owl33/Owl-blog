import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const accessToken = ref();
  const refreshToken = useCookie("refreshToken");
  const refresh = async () => {
    const expiredDate = new Date(useCookie<string>("expired").value);
    const currentDate = new Date();
    if (currentDate < expiredDate) {
      const { data } = await useApi.post("/auth/refresh");
      console.log(data);
      if (data.value.statusCode == 200) {
        accessToken.value = data.value.data;
      } else {
        refreshToken.value = undefined;
      }
    } else {
      refreshToken.value = undefined;
    }
  };
  return { accessToken, refresh };
});
