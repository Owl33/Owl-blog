<script setup lang="ts">
import { type Posts } from "~/types/posts/posts";
import { useRouter } from "vue-router";
import { useUIStore } from "~/store/useUIStore";
import PostCard from "./components/PostCard.vue";
import { cn } from "@/lib/utils";
const router = useRouter();
const uiStore = useUIStore();

const { data, refresh, error, status, clear, execute } = await useApi.get<Posts[]>("/posts");

// const { data, refresh, error, status, clear, execute } = await useApi<Posts[]>("GET", "/posts");
// const data = await cccApi(`POST`, "/posts/save", {
//   // ...postData,
// });

// const { data, refresh, error, status } = await getApi<{ data: Posts[] }>("/posts");
const categories = ref<any>([]);
const selectedCategory = ref("전체");
const originData = ref(data.value?.data);
const posts = ref(data.value?.data);
const refreshPosts = async () => {
  console.log("hi");
  await refresh();
};
if (data.value) {
  const createCategories = () => {
    let categorys;
    categorys = posts.value.reduce((acc: any, post: Posts) => {
      let category = post.category;

      if (acc[category]) {
        acc[category]++;
      } else {
        acc[category] = 1;
      }
      return acc;
    }, {});
    const categoryArray = Object.keys(categorys).map((category) => ({
      name: category,
      length: categorys[category],
    }));

    const totalPosts = posts.value.length;
    categoryArray.unshift({ name: "전체", length: totalPosts });

    return categoryArray;
  };
  categories.value = createCategories();
}
const goToPost = (postId: any) => {
  router.push({
    name: "posts-postId",
    params: { postId: postId },
  });
};

const onClickCategory = (category: string) => {
  console.log("hi");
  if (category == "전체") {
    posts.value = originData.value.filter((post: Posts) => post);
  } else {
    posts.value = originData.value.filter((post: Posts) => post.category == category);
  }
  selectedCategory.value = category;
};
</script>
<template>
  <main
    class="max-md:flex-wrap lg:flex-nowrap justify-center"
    v-if="posts && posts.length > 0">
    <section class="">
      <ul class="mb-6">
        <UiBadge
          class="mr-1"
          v-for="(category, index) in categories"
          :key="category.name"
          :variant="category.name == selectedCategory ? 'selected' : undefined"
          @click="onClickCategory(category.name)">
          {{ `${category.name} (${category.length})` }}
        </UiBadge>
      </ul>
    </section>
    <section class="">
      <article
        v-for="(post, index) in posts"
        :class="index != 0 && 'mt-6'">
        <PostCard
          :post="post"
          @click="goToPost(post.postId)">
        </PostCard>
      </article>
    </section>
  </main>
  <div
    class="h-full"
    v-else>
    <div>
      loading
      <!-- <Spiner></Spiner> -->
    </div>
    <div class="h-full flex justify-center items-center">
      <div class="text-center">
        <p class="mb-4">조회 된 컨텐츠가 없습니다.</p>
        <BaseButton @click.prevent="refreshPosts"> 다시 조회하기 </BaseButton>
      </div>
    </div>
  </div>
</template>
