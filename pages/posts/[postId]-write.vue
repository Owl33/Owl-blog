<script setup lang="ts">
import { useRouter } from "vue-router";
import { type Posts } from "~/types/posts/posts"
import { ref } from "vue";
const editorRef = ref();
const router = useRouter();
const route = useRoute();

const postData = reactive<{
  title: string;
  contents: any;
  description: string;
  thumbnail: string;
  category: string;
}>({
  title: '',
  contents: undefined,
  description: '',
  thumbnail: '',
  category: "개발",
});


if (route.params.postId && route.params.postId !== 'new') {
  const { data, pending, error } = await getApi<{ data: Posts }>(`/posts/${route.params.postId}`)
  if (data.value) {
    postData.title = data.value.data.title;
    postData.contents = data.value.data.contents;
    postData.category = data.value.data.category;
    postData.description = data.value.data.description;
  }

}


const onSavePost = async () => {
  //200자 제한, 줄바꿈 공백으로 치환
  postData.description = editorRef.value.getText().replace(/\r?\n/g, ' ').slice(0, 200)
  postData.contents = JSON.stringify(editorRef.value.getJSON())
  postData.thumbnail = JSON.stringify(editorRef.value.getJSON().content.find(
    (item: any) => item.type == "image"
  ))

  if (route.params.postId == 'new') {

    const data = await useApi(`POST`, '/posts/save',
      {
        ...postData
      });

    if (data.statusCode == 200) {
      router.push({ name: 'posts-list' })
    }
  } else {

    const data = await useApi(`PUT`, `/posts/save/${route.params.postId}`,
      {
        ...postData
      });

    if (data.statusCode == 200) {
      router.push({ name: 'posts-list' })
    }
  }

};

</script>
<template>
  <div>
    <div class="flex justify-between">
      <Chips v-model="postData.category" :data="[{ category: '개발' }, { category: '일상' }]">
      </Chips>

      <button @click.prevnet="onSavePost" class="border rounded-xl bg-indigo-500 text-white px-5 py-2">
        <p>작성하기</p>
      </button>
    </div>
    <div class="my-6">
      <input v-model="postData.title"
        class="write-title-input text-4xl font-bold w-full h1 py-2 text-gray-700 focus:outline-none focus:shadow-outline"
        id="title" autofocus type="text" placeholder="제목을 입력하세요" />
    </div>
    <Tiptap :content="!!postData?.contents ?
        JSON.parse(postData?.contents)
        : postData?.contents
        " :resize="true" ref="editorRef" :editable="true" />
  </div>
</template>
<style lang="scss"></style>
