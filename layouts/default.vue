<script setup lang="ts">
import { useUserStore } from "../store/useUserStore";
import NavigationBar from "~/components/navigationBar/NavigationBar.vue";
import MenuButton from "~/components/menuButton/MenuButton.vue";
const userStore = useUserStore();

const nuxtApp = useNuxtApp();
// const loading = ref(false);
// nuxtApp.hook("page:start", () => {
//   loading.value = true;
// });
// nuxtApp.hook("page:finish", () => {
//   loading.value = false;
// });
</script>
<template>
  <div
    class="h-screen flex flex-col mx-auto w-[90vw] 2xl:w-[65vw] md:w-[85vw]">
    <NavigationBar />
    <div class="grow">
      <slot></slot>
    </div>
  </div>
  <MenuButton
    v-if="
      userStore.accessToken
    "></MenuButton>
</template>

<style></style>
