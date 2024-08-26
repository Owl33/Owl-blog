<script setup lang="ts">
//@ts-ignore
import { MoonStar, SunMoon } from "lucide-vue-next";

const colorMode = useColorMode();
colorMode.preference = "system";
const changeTheme = () => {
  colorMode.value == "light" ? (colorMode.preference = "dark") : (colorMode.preference = "light");
};
</script>
<template>
  <nav class="mx-auto flex h-16 items-center justify-between">
    <div class="flex">
      <NuxtLink
        href="/"
        class="">
        <img
          class="h-8 w-auto"
          src="../../public/images/light-logo.png"
          alt="" />
      </NuxtLink>
    </div>

    <div class="flex items-center">
      <NuxtLink
        to="resume"
        target="_blank"
        class="ml-5 text-sm"
        >Resume</NuxtLink
      >
      <!-- <NuxtLink href="/" class="text-sm">Log in </NuxtLink> -->
      <NuxtLink
        href="https://github.com/Owl33?tab=repositories"
        target="_blank"
        class="ml-5 text-sm"
        >Github
      </NuxtLink>

      <UiButton
        class="ml-3"
        variant="ghost"
        size="sm"
        @click.prevent="changeTheme()">
        <SunMoon
          v-show="colorMode.value == 'light'"
          class="h-5 w-5" />
        <MoonStar
          v-show="colorMode.value == 'dark'"
          class="h-5 w-5" />
      </UiButton>
    </div>
  </nav>
</template>
