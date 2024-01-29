<script setup lang="ts">
import { ref } from "vue";
const editorRef = ref();
const category = ref("개발");
const config = useRuntimeConfig();
console.log(config.public.apiBase);
const postData = ref<{
  contents: any;
  title: string;
  category: string;
}>({
  title: "",
  contents: undefined,
  category: "개발",
});

const writePost = () => {
  console.log(editorRef.value.getJSON().content);

  postData.value.contents = JSON.stringify(editorRef.value.getJSON().content);
  const data = $fetch(`https://back-owlblog.vercel.app/posts/write`, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",

      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: "POST",
    body: { ...postData.value },
  })
    .then((res) => console.log(res))
    .catch((a) => console.log(a));

  console.log(data);
};
</script>
<template>
  <div>
    <div class="flex justify-between">
      <Chips
        v-model="postData.category"
        :data="[{ category: '개발' }, { category: '일상' }]"
      >
      </Chips>

      <button
        @click.prevnet="writePost"
        class="border rounded-xl bg-indigo-500 text-white px-5 py-2"
      >
        <p>작성하기</p>
      </button>
    </div>
    <div class="my-6">
      <input
        v-model="postData.title"
        class="write-title-input text-4xl font-bold w-full h1 py-2 text-gray-700 focus:outline-none focus:shadow-outline"
        id="title"
        autofocus
        type="text"
        placeholder="제목을 입력하세요"
      />
    </div>
    <Tiptap
      :content="postData?.contents"
      :resize="true"
      ref="editorRef"
      :editable="true"
    />
  </div>
</template>
<style lang="scss">
.write-title-input {
}
</style>
