<script setup lang="ts">
import { defineProps, defineEmits } from "@vue/runtime-core";
import { type Posts } from "~/types/posts/posts";
import { cn } from "@/lib/utils";

const { post } = defineProps<{
  post: Posts;
}>();
const emits = defineEmits<{
  onClickEvent: any;
}>();
// const image = JSON.parse(post.contents).content.find((item: any) => item.type == 'image')
const image: any = post.thumbnail;
</script>

<template>
  <UiCard class="hover:cursor-pointer hover:scale-[1.02] transition duration-300">
    <UiCardHeader class="p-0">
      <UiAspectRatio :ratio="2 / 1">
        <NuxtImg
          v-if="image"
          fit="contain"
          loading="lazy"
          preload
          :alt="image.attrs.alt ?? 'img alt'"
          :src="image.attrs.src"
          class="rounded-t-lg object-cover w-full h-full" />
      </UiAspectRatio>
    </UiCardHeader>

    <UiCardContent class="pt-6">
      <div class="flex items-center justify-between text-sm text-muted-foreground">
        <p class="">{{ post.category }}</p>
        <p class="">{{ post.creation_at }}</p>
      </div>

      <h2 class="my-3 text-2xl font-bold text-foreground">
        {{ post.title }}
      </h2>
      <p class="line-clamp-3 leading-6 text-sm text-muted-foreground">
        {{ post.description ?? "" }}
      </p>
    </UiCardContent>
  </UiCard>
</template>
