<script setup lang="ts">
import { nextTick } from 'vue'

import { useRouter } from "vue-router";
const router = useRouter();
const email = ref("")
const password = ref("");

const login = async () => {
  const data = await useApi(`POST`, '/auth/login', {
    email: email.value,
    password: password.value
  });
  if (data.statusCode == 200) {
    // router.push({ name: "posts-list" });

  }
  console.log(data)

}
// const refresh = async () => {
//   const data = await useApi(`POST`, '/auth/refresh')
//   console.log(data)
// }
const goToPost = (postId: any) => {
  // console.log(item)


  // router.push({ name: "posts-postId", params: { postId: postId } });
};
</script>
<template>
  <div class="flex ">


    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST" @submit.prevent="login">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <input v-model="email" id="email" name="email" type="email" autocomplete="email"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div class="mt-2">
            <input v-model="password" id="password" name="password" type="password" autocomplete="current-password"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <button type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
            in</button>

        </div>
      </form>

    </div>
  </div>
</template>