<script setup lang="ts">
import { useUserStore } from "./store/useUserStore";
import { onMounted } from "vue";
const userStore = useUserStore();

onMounted(async () => {

  if (!userStore.accessToken) {
    await userStore.refresh();
  }
})
</script>
<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
  <Teleport to="body">

    <Spiner></Spiner>
  </Teleport>
</template>

<style>
/* 페이지 글로벌 라우팅 트렌지션 */
.page-enter-active,
.page-leave-active {
  transition: all 0.2s ease-out;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(0.2rem);
}
</style>