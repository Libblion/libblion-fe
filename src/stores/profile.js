import { api } from "@/services/api";
import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    profile: [],
  }),

  actions: {
    async getProfile() {
      const stores = useAuthStore();

      try {
        const { data } = await api.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${stores.token}`,
          },
        });
        this.profile = data.user;
      } catch (error) {
        console.log(error);
      }
    },
  },

  persist: true,
});
