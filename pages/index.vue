<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

const goToPost = (postId: number) => {
  router.push({ name: "posts-post_id", params: { post_id: postId } });
};
</script>

<template>
  <section>
    <article>
      <div class="flex justify-between mt-10 items-center">
        <div>
          <span>개발 (3)</span>
          <span class="mx-4">일상 (2)</span>
        </div>
        <div class="w-72">
          <div class="relative w-full min-w-[200px] h-10">
            <input
              class="peer w-full h-full bg-transparent text-blue-gray-700 outline outline-1 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
              placeholder=" "
            /><label
              class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900"
              >검색어를 입력해주세요
            </label>
          </div>
        </div>
      </div>
    </article>
    <article>
      <div
        class="mt-12 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 lg:gap-24 md:gap-16 sm:gap-8"
      >
        <div v-for="(item, index) in 30">
          <img
            class="rounded-md w-100 aspect-square"
            :src="`https://source.unsplash.com/random/192${index}×1080`"
          />
          <div
            class="mt-4 mb-2 flex items-center justify-between text-sm text-slate-400"
          >
            <p class="">개발</p>
            <p class="">2023-01-23</p>
          </div>

          <h1 class="mb-4 text-2xl text-slate-700 truncate">
            [Project] #2 에러를 소통해보자
          </h1>
          <p class="line-clamp-4 text-gray-400">
            규격화된 에러 설계는 왜 필요한가 프로젝트 개발을 진행하면서 가장
            먼저 구축에 들어갔던 작업이 "에러 공통 응답 객체" 설계였다. 여태껏
            클라이언트와의 소통 없이 오로지 백엔드의 입장에서만 코드를
            작성해왔던 나에게 에러를 던진다는 것은 그다지 큰 의미가 없었다.
          </p>
        </div>
      </div>
    </article>
  </section>
</template>
