import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const accessToken = ref();
  const refreshToken = useCookie("refreshToken");
  const refresh = async () => {
    const expiredDate = new Date(useCookie<string>("expired").value);
    const currentDate = new Date();
    console.log("refresh");
    if (currentDate < expiredDate) {
      const { data } = await useApi.post("/auth/refresh");
      if (data.value.statusCode == 200) {
        accessToken.value = data.value.data;
      } else {
        alert("기간 만료, 재 로그인 필요");

        refreshToken.value = undefined;
      }
    } else {
      refreshToken.value = undefined;
    }
  };
  return { accessToken, refresh };
});
