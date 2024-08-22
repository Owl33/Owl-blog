<script setup lang="ts">
import { defineProps, defineEmits } from "@vue/runtime-core";
import { type Posts } from "~/types/posts/posts"

const { post } = defineProps<{
  post: Posts;

}>();
const emits = defineEmits<{
  onClickEvent: any;
}>();
// const image = JSON.parse(post.contents).content.find((item: any) => item.type == 'image')
const image: any = post.thumbnail

</script>

<template>
  <div style="background-color: white" class="shadow rounded-xl hover:cursor-pointer
  hover:scale-105
  transition
  " @click.prevent="emits('onClickEvent')">
    <NuxtImg v-if="image" fit="contain" loading="lazy" preload :alt="image.attrs.alt ?? 'img alt'"
      :src="image.attrs.src" class="rounded-t-xl object-cover w-full 
    2xl:h-64 
    xl:h-56 
    md:h-[18vh]
      sm:h-[32vh]" />

    <div class="p-6">
      <div class="flex items-center justify-between text-sm text-slate-400">
        <p class="">{{ post.category }}</p>
        <p class="">{{ post.creation_at }}</p>
      </div>

      <h2 class="my-3 text-2xl font-bold text-slate-700 truncate">
        {{ post.title }}
      </h2>
      <p class="line-clamp-3 leading-6 text-sm text-gray-400">
        {{ post.description ?? '' }} </p>
    </div>
  </div>
</template>
