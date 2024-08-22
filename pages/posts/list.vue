<script setup lang="ts">
import { type Posts } from "~/types/posts/posts";
import { useRouter } from "vue-router";
import { useUIStore } from "~/store/useUIStore";
import Cards from "~/components/cards/Cards.vue";
import Spiner from "~/components/spiner/Spiner.vue";
const router = useRouter();
const uiStore = useUIStore();
const { data, refresh, error, status, clear, execute } = await useApi.get<Posts[]>("/posts");

// const { data, refresh, error, status, clear, execute } = await useApi<Posts[]>("GET", "/posts");
// const data = await cccApi(`POST`, "/posts/save", {
//   // ...postData,
// });

// const { data, refresh, error, status } = await getApi<{ data: Posts[] }>("/posts");
const categorys = ref({});
const originData = data.value?.data;
const posts = ref(data.value?.data);
const refreshPosts = async () => {
  await refresh();
};
if (data.value) {
  categorys.value = data.value.data.reduce((acc: any, post: Posts) => {
    let category = post.category;

    if (acc[category]) {
      acc[category]++;
    } else {
      acc[category] = 1;
    }
    return acc;
  }, {});
}
const goToPost = (postId: any) => {
  router.push({
    name: "posts-postId",
    params: { postId: postId },
  });
};

const onClickCategory = (category: string) => {
  if (category == "전체") {
    posts.value = originData;
  } else {
    posts.value = originData?.filter((post: Posts) => post.category == category);
  }
};
</script>
<template>
  <section class="h-full">
    <article
      class="h-full"
      v-if="posts && posts.length > 0">
      <div class="my-12 flex justify-between items-center">
        <div class="hover:cursor-pointer">
          <span @click="onClickCategory('전체')">전체</span>
          <span
            @click="onClickCategory(category)"
            class="ml-4"
            v-for="(number, category) in categorys">
            {{ `${category} (${number})` }}
          </span>
        </div>
      </div>

      <div class="grid gap-10 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
        <Cards
          v-for="(post, index) in posts"
          :post="post"
          @onClickEvent="goToPost(post.postId)">
        </Cards>
      </div>
    </article>
    <div
      class="h-full"
      v-else>
      <div>
        loading
        <Spiner></Spiner>
      </div>
      <div class="h-full flex justify-center items-center">
        <div class="text-center">
          <p class="mb-4">조회 된 컨텐츠가 없습니다.</p>
          <BaseButton @click.prevent="refreshPosts"> 다시 조회하기 </BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>
