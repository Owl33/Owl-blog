import { useUserStore } from "../store/useUserStore";
export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore();
  const refreshToken = useCookie("refreshToken");
  if (!userStore.accessToken && to.name == "posts-postId-write") {
    return navigateTo("/");
  }
  if (refreshToken.value && to.name == "login") {
    return navigateTo("/");
  }
});
