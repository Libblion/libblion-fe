import { api } from "@/services/api";
import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    profile: [],
    isLoading: false,
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

    async updateProfile(formData) {
      this.isLoading = true;
      const stores = useAuthStore();
      try {
        const { data } = await api.post("/profile", formData, {
          headers: {
            Authorization: `Bearer ${stores.token}`,
          },
        });

        this.profile = data.user.profile;
      } catch (error) {
        console.log("error", error);
      } finally {
        this.isLoading = false;
      }
    },
  },

  persist: true,
});
