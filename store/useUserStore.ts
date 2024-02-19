import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const accessToken = ref();

  const refresh = async () => {
    const data = await useApi("POST", "/auth/refresh");
    if (data.statusCode == 200) {
      accessToken.value = data.data;
    } else {
      return;
    }
  };
  return { accessToken, refresh };
});
