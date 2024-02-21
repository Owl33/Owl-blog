<script setup lang="ts">
import { nextTick } from 'vue'
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const editorRef = ref();
interface res {
  data: {
    postId: number;
    category: string;
    title: string;
    description?: string;
    contents: string | any;
    creation_at: string;
  }
}

const { data, pending, error, refresh } = await getApi<res>(`/posts/${route.params.postId}`)
const contents = computed(() => data.value ? JSON.parse(data.value.data.contents) : {});

if (!data.value) {
  router.push({ name: "posts-list", });
}

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
