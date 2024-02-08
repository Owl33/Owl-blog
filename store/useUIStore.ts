import { defineStore } from "pinia";

export const useUIStore = defineStore("ui", () => {
  const loading = ref(false);
  const isLoading = computed(() => loading.value);
  const startLoading = () => {
    loading.value = true;
  };
  const finishLoading = () => {
    loading.value = false;
  };

  return { isLoading, startLoading, finishLoading };
});
