<script setup lang="ts">
import { defineProps, defineEmits } from "@vue/runtime-core";

const { category, title, date, contents } = defineProps<{
  category: string;
  image: string;
  title: string;
  description: string;
  date: string;
  contents: string;
}>();
const emits = defineEmits<{
  onClickEvent: any;
}>();
</script>

<template>
  <div style="background-color: white" class="shadow rounded-xl hover:cursor-pointer
  hover:scale-105
  transition
  " @click.prevent="emits('onClickEvent')">
    <NuxtImg fit="contain" loading="lazy" preload alt="Card Image" :src="image"
      class="rounded-t-xl object-cover h-64 w-full" />
    <div class="p-6">
      <div class="flex items-center justify-between text-sm text-slate-400">
        <p class="">{{ category }}</p>
        <p class="">{{ date }}</p>
      </div>

      <h1 class="my-3 text-2xl text-slate-700 truncate">
        {{ title }}
      </h1>
      <p class="line-clamp-3 leading-6 text-sm text-gray-400">
        {{ description ?? '' }} </p>
    </div>
  </div>
</template>
