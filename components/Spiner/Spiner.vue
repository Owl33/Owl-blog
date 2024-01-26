<script setup lang="ts">
const { data, pending, error, refresh } = await useApi("get", "/posts");

</script>
<template>
  <div>
    <h1 class="text-3xl font-bold">Home</h1>
    <div v-if="pending">Loading..</div>
    <template v-else>
      <div v-if="error">Sorry, error occured.</div>
      <!-- <div v-else>{{ data }}</div> -->
    </template>

    <button @click="refresh()">Refresh</button>
  </div>
</template>
