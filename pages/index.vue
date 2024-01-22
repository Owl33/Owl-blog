<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

const goToPost = (postId: number) => {
  router.push({ name: "posts-post_id", params: { post_id: postId } });
};
</script>

<template>
  <div>
    <button @click="goToPost(12)">Go to post</button>
  </div>
</template>
