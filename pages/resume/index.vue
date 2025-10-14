<script setup>
import data from "./project";
const projects = ref(data);

// SEO 메타데이터 설정
useHead({
  link: [
    {
      rel: "canonical",
      href: "https://www.owlblog.org/resume/",
    },
  ],
});

useSeoMeta({
  title: "박건민 기술 이력서 - Owlblog",
  ogTitle: "박건민 기술 이력서 - Owlblog",
  description:
    "박건민의 기술 이력서입니다. 웹 개발 경력, 프로젝트 경험, 사용 기술 스택을 소개합니다.",
  ogDescription:
    "박건민의 기술 이력서입니다. 웹 개발 경력, 프로젝트 경험, 사용 기술 스택을 소개합니다.",
  ogUrl: "https://www.owlblog.org/resume/",
  ogType: "profile",
  twitterCard: "summary",
});
</script>
<template>
  <section>
    <article class="">
      <div>
        <h1 class="text-4xl font-bold">박건민</h1>
        <p class="text-muted-foreground">ahsxkc@gmail.com</p>
      </div>
      <div class="mt-4">
        <p>안녕하세요, 박건민 입니다.</p>
        <p>
          UI의 통일성을 유지하고 반복적인 코딩을 최소화하는 것을 중요하게 생각하며, 효율적이고
          재사용 가능한 컴포넌트를 만드는 것을 즐깁니다.
        </p>
        <p>
          제가 작성한 코드가 다른 이들에게 부끄럽지 않게, 그리고 자랑스럽게 '내가 이걸 만들었다'라고
          말할 수 있는 개발자가 되기 위해 항상 노력하겠습니다.
        </p>
      </div>
    </article>
    <article class="my-16">
      <h2 class="text-4xl font-bold">Job</h2>
      <p class="mt-8">다이아랩</p>
      <p class="my-1 text-sm text-foreground">2022-05 ~ 2024-01</p>
    </article>
    <article>
      <h2 class="text-4xl font-bold">Project</h2>
      <div
        v-for="(project, idx) in projects"
        :key="idx"
        class="mt-8 my-4">
        <div class="xl:flex gap-10">
          <div class="w-full xl:w-[50%]">
            <div>
              <p class="text-2xl font-semibold">{{ project.title }}</p>
              <p class="text-sm text-foreground">
                <NuxtLink
                  class="py-1"
                  v-if="project.url"
                  target="_blank"
                  :to="project.url">
                  {{ ` ${project.url}` }}
                </NuxtLink>
                <span v-else>-</span>
              </p>
              <p class="my-2 text-sm text-foreground">{{ project.date }}</p>
              <p class="text-muted-foreground">
                {{ project.subtitle }}
              </p>
            </div>
            <div class="mt-4">
              <p class="text-xl font-bold">주요 작업</p>
              <p class="mt-1">{{ project.task }}</p>
            </div>
            <div class="mt-4">
              <p class="text-xl font-bold">사용 기술</p>
              <p class="mt-1">{{ project.skill }}</p>
            </div>
          </div>
          <div class="w-full xl:w-[50%]">
            <div class="mt-4 xl:mt-0">
              <p class="text-xl font-bold">작업 내용</p>
              <ul class="mt-2 list-disc list-inside">
                <li
                  class="my-1 marker:text-blue-600"
                  v-for="detail in project.details">
                  {{ detail }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          v-if="project.more.length > 0"
          class="mt-12 xl:grid grid-cols-1 justify-between gap-4">
          <div
            v-for="item in project.more"
            class="xl:w-full h-full">
            <div class="rounded-xl overflow-auto max-h-[620px] m-auto">
              <div
                v-if="item.type == 'video'"
                class="w-full h-full relative">
                <iframe
                  :src="item.src"
                  class="absolute w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen></iframe>
              </div>

              <NuxtImg
                v-else
                class="w-full m-auto rounded-xl"
                :src="item.src"
                :alt="item.src" />
            </div>
            <div class="text-center mt-4 text-slate-500">
              <NuxtLink
                v-if="!!item.source == true"
                class="underline text-slate-500"
                :href="item.source">
                <p>
                  {{ item.subtitle }}
                </p>
              </NuxtLink>
              <p v-else>{{ item.subtitle }}</p>
            </div>
          </div>
        </div>
        <div
          v-if="projects.length - 1 !== idx"
          class="my-16 h-0.5 w-full bg-gray-100"></div>
      </div>
    </article>
  </section>
</template>
