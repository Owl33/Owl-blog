<script setup lang="ts">
import { useUserStore } from "@/store/useUserStore";

const userStore = useUserStore();
console.log(userStore);
</script>
<template>
  <nav><NuxtLink to="/login">Go to login</NuxtLink></nav>
  <div>index</div>
</template>
