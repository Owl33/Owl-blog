<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();
</script>
<template>
  <section>
    <!-- <h1>{{ route.params.post_id }}</h1> -->
    <div>
      <article>
        <p class="text-sm text-slate-700">개발</p>
        <h1 class="my-4 text-4xl font-bold text-slate-700">
          [Project] #2 에러를 소통해보자
        </h1>
        <p class="text-sm text-slate-700">2023-03-21</p>
      </article>
      <article class="mt-10">
        <NuxtImg
          class="rounded-xl aspect-video w-full"
          :src="`https://source.unsplash.com/random/1920×1080`"
        />
      </article>
    </div>
  </section>
</template>
