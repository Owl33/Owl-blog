<script setup lang="ts">
import { useUserStore } from "./store/useUserStore";
import { onMounted } from "vue";
import Spiner from "./components/spiner/Spiner.vue";
const userStore = useUserStore();

onMounted(async () => {
  if (!userStore.accessToken) {
    await userStore.refresh();
  }
});
useHead({
  link: [
    {
      rel: "canonical",
      href: "https://www.owlblog.org",
    },
  ],
  meta: [
    {
      name: "naver-site-verification",
      content: "2f77fab011a308c514f4e1bfff6f8add26138239",
    },
    {
      name: "google-site-verification",
      content: "ypMm1kBRl9fA2uWAZWVDUi_UhA36GpdTl-4NFBMx-rU",
    },
  ],
});
useSeoMeta({
  title: "Owlblog",
  ogTitle: "Owlblog",
  description: "박건민의 개인 개발 블로그 입니다. 개발 기록 및 취미 생활등이 올라옵니다.",
  ogDescription: "박건민의 개인 개발 블로그 입니다. 개발 기록 및 취미 생활등이 올라옵니다.",
  ogUrl: "https://www.owlblog.org",
  ogImage: "https://s3.ap-northeast-2.amazonaws.com/owl--server-bucket/Owlblog.png",
  ogType: "website",
  ogSiteName: "OwlBlog",
  twitterCard: "summary_large_image",
});

// 구조화된 데이터 추가 (JSON-LD)
useSchemaOrg([
  defineWebSite({
    name: "OwlBlog",
    description: "박건민의 개인 개발 블로그 입니다. 개발 기록 및 취미 생활등이 올라옵니다.",
    url: "https://www.owlblog.org",
  }),
  definePerson({
    name: "박건민",
    url: "https://www.owlblog.org",
    sameAs: ["https://github.com/your-github"],
  }),
]);
</script>
<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
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
