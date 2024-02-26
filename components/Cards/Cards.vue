<script setup lang="ts">
import { defineProps, defineEmits } from "@vue/runtime-core";
import { type Posts } from "~/types/posts/posts"

const { post } = defineProps<{
  post: Posts;

}>();
const emits = defineEmits<{
  onClickEvent: any;
}>();
const image = JSON.parse(post.contents).content.find((item: any) => item.type == 'image')

</script>

<template>
  <div style="background-color: white" class="shadow rounded-xl hover:cursor-pointer
  hover:scale-105
  transition
  " @click.prevent="emits('onClickEvent')">
    <NuxtImg v-if="image" fit="contain" loading="lazy" preload alt="Card Image" :src="image.attrs.src"
      class="rounded-t-xl object-cover h-64 w-full" />
    <div v-else class="flex justify-center items-center bg-gray-200 rounded-t-xl object-cover h-64 w-full">
      <span class="Courgette text-3xl">

        Owl33
      </span>
    </div>
    <div class="p-6">
      <div class="flex items-center justify-between text-sm text-slate-400">
        <p class="">{{ post.category }}</p>
        <p class="">{{ post.creation_at }}</p>
      </div>

      <h1 class="my-3 text-2xl text-slate-700 truncate">
        {{ post.title }}
      </h1>
      <p class="line-clamp-3 leading-6 text-sm text-gray-400">
        {{ post.description ?? '' }} </p>
    </div>
  </div>
</template>
