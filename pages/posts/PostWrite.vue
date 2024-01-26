<script setup lang="ts">
import { ref } from "vue";
const editorRef = ref();
const category = ref("개발");
const postsData = ref({
  title: "",
  contents: undefined,
  category: "개발",
});

const writePost = () => {
  console.log(postsData.value);
  console.log(editorRef.value.getJSON());
};
</script>
<template>
  <div>
    <div class="flex justify-between">
      <Chips
        v-model="postsData.category"
        :data="[{ category: '개발' }, { category: '일상' }]"
      >
      </Chips>

      <button
        @click.prevnet="writePost"
        class="border rounded-xl bg-green-500 text-white px-4 py-2"
      >
        작성하기
      </button>
    </div>
    <div class="my-6">
      <input
        v-model="postsData.title"
        class="write-title-input text-4xl font-bold w-full h1 py-2 text-gray-700 focus:outline-none focus:shadow-outline"
        id="title"
        autofocus
        type="text"
        placeholder="제목을 입력하세요"
      />
    </div>
    <Tiptap
      :content="postsData?.contents"
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
