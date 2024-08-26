<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { type Posts } from "~/types/posts/posts";
const route = useRoute();
const router = useRouter();
const editorRef = ref();

const { data, refresh, error, status, clear, execute } = await useApi.get<Posts>(
  `/posts/${route.params.postId}`
);
const contents = computed(() => (data.value ? JSON.parse(data.value.data.contents) : {}));if (!data.value) {
  router.push({ name: "posts-list", });
}
useHead({
  link: [{
    rel: 'canonical',
    href: `https://owlblog.site/${route.fullPath}`,
  }]
})
useSeoMeta({
  title: `Owlblog - ${data.value!.data.title}`,
  description: data.value!.data.description.replace(/\r?\n/g, ' ').slice(0, 170),
  ogDescription: data.value!.data.description.replace(/\r?\n/g, ' ').slice(0, 170),
  ogUrl: `https://owlblog.site/${route.fullPath}`,
  ogImage: JSON.parse(data.value!.data.thumbnail).attrs.src,
})
</script>
<template>
  <section>
    <!-- <h1>{{ route.params.postId }}</h1> -->
    <div v-if="data">
      <article>
        <p class="text-sm text-slate-700">개발</p>
        <h1 class="my-4 text-4xl font-bold text-slate-700">
          {{ data.data.title }}
        </h1>
        <p class="text-sm text-slate-700">{{ data.data.creation_at }}</p>
      </article>
      <article class="mt-10">
        <Tiptap :content="contents" :resize="false" ref="editorRef" :editable="false" />
      </article>
    </div>
  </section>
</template>
