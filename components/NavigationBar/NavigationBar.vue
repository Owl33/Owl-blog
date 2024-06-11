<template>
  <nav class="mx-auto flex h-16 items-center justify-between">
    <div class="flex">
      <NuxtLink href="/" class="">
        <img class="h-8 w-auto" src="../../assets/images/light-logo.png" alt="" />
      </NuxtLink>
    </div>

    <div>
      <NuxtLink to="resume" target="_blank" class="ml-5 text-sm">Resume</NuxtLink>
      <!-- <NuxtLink href="/" class="text-sm">Log in </NuxtLink> -->
      <NuxtLink href="https://github.com/Owl33?tab=repositories" target="_blank" class="ml-5 text-sm">Github
      </NuxtLink>
    </div>
  </nav>
</template>
