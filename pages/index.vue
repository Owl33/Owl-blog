<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

// SEO 메타데이터 설정
useHead({
  link: [
    {
      rel: "canonical",
      href: "https://www.owlblog.org/",
    },
  ],
});

useSeoMeta({
  title: "Owlblog - 박건민의 개발 블로그",
  description: "박건민의 개인 개발 블로그입니다. 웹 개발, 프로그래밍 기록 및 취미 생활 등이 올라옵니다.",
  ogTitle: "Owlblog - 박건민의 개발 블로그",
  ogDescription: "박건민의 개인 개발 블로그입니다. 웹 개발, 프로그래밍 기록 및 취미 생활 등이 올라옵니다.",
  ogUrl: "https://www.owlblog.org/",
  ogType: "website",
  ogSiteName: "OwlBlog",
  twitterCard: "summary_large_image",
});

router.push({ name: "posts-list" });
</script>

<template></template>
