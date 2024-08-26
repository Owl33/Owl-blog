<script setup lang="ts">
import { type Posts } from "~/types/posts/posts";
const router = useRouter();

const { data, pending, refresh, error, status } = await getApi<{ data: Posts[] }>("/posts");

const categorys = ref({});
const originData = data.value?.data;
const posts = ref(data.value?.data);
const refreshPosts = () => {
  refresh();
};
if (data.value) {
  categorys.value = data.value.data.reduce((acc: any, post) => {
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
  router.push({ name: "posts-postId", params: { postId: postId } });
};

const onClickCategory = (category: string) => {
  if (category == "전체") {
    posts.value = originData;
  } else {
    posts.value = originData?.filter((post) => post.category == category);
  }
};
</script>
<template>
  <section>
    <article>
      <div class="flex justify-between items-center">
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
    </article>
    <article>
      <div class="mt-12 grid gap-10 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
        <div v-if="pending">loading</div>
        <Cards
          v-if="posts && posts.length > 0 && !pending"
          v-for="(post, index) in posts"
          :post="post"
          @onClickEvent="goToPost(post.postId)">
        </Cards>
        <div v-else>
          <div>
            <p>게시글이 없습니다.</p>
            <button @click.prevent="refreshPosts">다시 조회하기</button>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>
