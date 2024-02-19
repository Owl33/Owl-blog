<script setup lang="ts">

import { useRouter } from "vue-router";
const router = useRouter();
interface res {
  data:{  
    category: string;
    title: string;
    contents: string;
    creation_at: string;
  }[]
}
router.push({ name: "posts-list",  });

</script>

<template>

</template>
