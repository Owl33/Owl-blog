import { useUserStore } from "../store/useUserStore";
export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore();
  const refreshToken = useCookie("refreshToken");

  if (!userStore.accessToken && to.name == "posts-postId-write") {
    return navigateTo("/");
  }
  // console.log(userStore.accessToken);
  // if (to.params.id === '1') {
  //   return abortNavigation()
  // }
  // // In a real app you would probably not redirect every route to `/`
  // // however it is important to check `to.path` before redirecting or you
  // // might get an infinite redirect loop
  // if (to.path !== '/') {
  //   return navigateTo('/')
  // }
});
