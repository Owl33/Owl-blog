<script setup lang="ts">

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