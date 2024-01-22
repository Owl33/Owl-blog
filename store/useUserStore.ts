import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  getters: {
    doubleCount: (state) => state.user,
  },
  actions: {
    save(user?: any) {
      this.user = user;
    },
  },
});
