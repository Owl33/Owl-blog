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
  <div>
    <div class="mx-auto 2xl:w-[45vw] lg:w-[50vw] max-lg:w-[90vw]">
      <NavigationBar />
      <div class="my-10">
        <slot></slot>
      </div>
    </div>
  </div>
  <MenuButton
    v-if="
      userStore.accessToken
    "></MenuButton>
</template>

<style></style>
