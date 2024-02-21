<script setup lang="ts">
import { type Posts } from '../../types/posts/posts'
import { useRouter } from "vue-router";
const router = useRouter();


const { data, pending, refresh, error, status } = await getApi<{ data: Posts[] }>('/posts');
const categorys = ref({});
const originData = data.value?.data;
const posts = ref(data.value?.data);
const test = () => {
  refresh()
  console.log(data.value);

}
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
  if (category == '전체') {
    posts.value = originData
  } else {

    posts.value = originData?.filter((post) => post.category == category)
  }
}
</script>
<template>
  <section>
    <article>
      <div class="flex justify-between items-center">
        <div class="hover:cursor-pointer">
          <span @click="onClickCategory('전체')">전체</span>

          <span @click="onClickCategory(category)" class="ml-4" v-for="(number, category) in categorys">
            {{ `${category} (${number})` }}
          </span>
        </div>
        <!-- <div class="w-72">
          <div class="relative w-full min-w-[200px] h-10">
            <input
              class="peer w-full h-full bg-transparent text-blue-gray-700 outline outline-1 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
              placeholder=" " /><label
              class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">검색어를
              입력해주세요
            </label>
          </div>
        </div> -->
      </div>
    </article>
    <article>
      <div class="mt-12 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 lg:gap-16 md:gap-8 sm:gap-4">
        <!-- <Spiner
      
        ></Spiner> -->

        <div v-if="pending">loading</div>
        <Cards v-if="posts && posts.length > 0 && !pending" v-for="( item, index ) in  posts "
          :image="`https://source.unsplash.com/random/192${index}×1080`" :category="item.category"
          :description="item.description" :date="item.creation_at" :title="item.title" :contents="item.contents"
          @onClickEvent="goToPost(item.postId)">
        </Cards>
        <div v-else>
          <div class="">
            <button @click.prevent="test">reload</button>
            <p>게시글이 없습니다.</p>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>