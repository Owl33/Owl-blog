<script setup lang="ts">
import { useUserStore } from "./store/useUserStore";
import { onMounted } from "vue";
const userStore = useUserStore();
console.log(process)
const config = useRuntimeConfig()


onMounted(async () => {
  if (!userStore.accessToken) {
    await userStore.refresh();
  }
})
useHead({
  link: [{
    rel: 'canonical',
    href: 'https://owlblog.site',
  }]
})
useSeoMeta({
  title: 'Owlblog',
  ogTitle: 'Owlblog',
  description: '박건민의 개인 개발 블로그 입니다. 개발 기록 및 취미 생활등이 올라옵니다.',
  ogDescription: '박건민의 개인 개발 블로그 입니다. 개발 기록 및 취미 생활등이 올라옵니다.',
  ogUrl: 'https://owlblog.site',
  ogImage: 'https://s3.ap-northeast-2.amazonaws.com/owl--server-bucket/Owlblog.png',
  ogType: 'website',
  ogSiteName: 'OwlBlog',
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