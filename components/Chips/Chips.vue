<script setup lang="ts">
const modelValue = defineModel();
const { data } = defineProps<{
  data: any;
}>();
</script>

<template>
  <div class="flex items-center">
    <div
      v-for="chip in data"
      style="width: 60px; height: 30px"
      @click.prevent="modelValue = chip.category"
      class="transition ease-in-out delay-100 hover:bg-gray-300 cursor-pointer mr-2 flex justify-center items-center font-medium py-1 rounded-full border"
      :class="
        modelValue == chip.category
          ? ' hover:bg-green-500 bg-green-500 text-white'
          : ''
      "
    >
      <div class="text-xs font-normal leading-none max-w-full flex-initial">
        {{ chip?.category }}
      </div>
    </div>
  </div>
</template>
