<template>
  <nav
    class="mx-auto flex max-w-7xl items-center justify-between p-6"
    aria-label="Global"
  >
    <div class="flex lg:flex-1">
      <NuxtLink href="/" class="p-1.5">
        <span class="sr-only">Your Company</span>
        <img
          class="h-8 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt=""
        />
      </NuxtLink>
    </div>
    <div class="flex lg:hidden">
      <button
        type="button"
        class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
      >
        <span class="sr-only">Open main menu</span>
        <Bars3Icon class="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
    <NuxtLink href="/login" class="text-sm font-semibold"
      >Log in <span aria-hidden="true">&rarr;</span></NuxtLink
    >
  </nav>
</template>
