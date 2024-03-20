<script setup lang="ts">
import { Trash, FilePlus2, FilePen, MoreVertical, X, Plus } from "lucide-vue-next";
import { useRouter, useRoute } from "vue-router";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";

const router = useRouter();
const route = useRoute();
const goToWrite = () => {
  // router.push({ name: "posts-PostWrite" });
};
const deletePost = async () => {
  // $fetch('')
  const data = await useApi(`DELETE`, `/posts/${route.params.postId}`)
  if (data.statusCode == 200) {
    console.log('success!')
    router.push({ name: 'posts-list' })
  }
}
</script>
<template>
  <Menu as="div" class="posts-btn relative inline-block text-left">
    <div>


      <MenuButton id="headlessui-menu-button" v-slot="{ open }"
        class="posts-btn border bg-indigo-500 w-14 h-14 rounded-full">
        <Transition name="fade">
          <div v-if="!open">
            <Plus stroke-width="2" class="mx-auto" color="white"></Plus>
          </div>
          <div v-else>
            <X stroke-width="2" class="mx-auto" color="white"></X>
          </div>
        </Transition>
      </MenuButton>


    </div>

    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <MenuItems class="absolute right-0 bottom-16 rounded-lg">
        <MenuItem v-slot="{ active, close }">
        <NuxtLink :to="{ name: 'posts-postId-write', params: { postId: 'new' } }">
          <button @click="close" :class="[active ? 'bg-red-500' : '']"
            class="border bg-indigo-500 w-14 h-14 rounded-full">
            <FilePlus2 stroke-width="2" class="mx-auto" color="white"></FilePlus2>
          </button>
        </NuxtLink>
        </MenuItem>
        <template v-if="route.params.postId">

          <MenuItem v-slot="{ active, close }" v-if="route.params.postId != 'new'">
          <NuxtLink :to="{ name: 'posts-postId-write', params: { postId: route.params.postId } }">
            <button @click="close" :class="[
              active
                ? 'bg-red-500'
                : ''
            ]" class="border bg-indigo-500 w-14 h-14 rounded-full my-2">
              <FilePen stroke-width="2" class="mx-auto" color="white"></FilePen>
            </button>
          </NuxtLink>
          </MenuItem>
          <MenuItem v-slot="{ active }" v-if="route.name == 'posts-postId'">
          <button @click="deletePost" :class="[
            active
              ? 'bg-red-500'
              : ''
          ]" class="border bg-indigo-500 w-14 h-14 rounded-full">
            <Trash stroke-width="2" class="mx-auto" color="white"></Trash>
          </button>
          </MenuItem>
        </template>


      </MenuItems>
    </transition>
  </Menu>
</template>
<style>
.posts-btn {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
}

.fade-enter-active {
  transition: all 0.3s ease-in;
}

.fade-leave-active {
  position: fixed;
  width: 100%;
  transition: all 0.3s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  /* transform: translateX(20px); */
  opacity: 0;
}
</style>
