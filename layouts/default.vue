<script setup lang="ts">
import { useUserStore } from "../store/useUserStore";
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
    <div id="heelol" class="mx-auto w-[90vw] 2xl:w-[60vw] md:w-[85vw]  ">
      <NavigationBar />
      <div class="my-10">
        <slot></slot>
      </div>

    </div>
    <MenuButton v-if="userStore.accessToken"></MenuButton>
  </div>
</template>

<style></style>