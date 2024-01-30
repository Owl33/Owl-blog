<script setup lang="ts">
import { SquarePen } from "lucide-vue-next";
import { useRouter } from "vue-router";
const router = useRouter();
const goToWrite = () => {
  router.push({ name: "posts-PostWrite" });
};
</script>
<template>
  <div>
    <div style="width: 65vw" id="heelol" class="mx-auto">
      <NavigationBar class="mb-10" />
      <slot></slot>
    </div>
    <div>
      <button
        @click.prevnet="goToWrite"
        class="posts-btn border bg-indigo-500 w-14 h-14 rounded-full"
      >
        <SquarePen stroke-width="2" class="mx-auto" color="white"></SquarePen>
      </button>
    </div>
  </div>
</template>
<style>
.posts-btn {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
}
</style>
