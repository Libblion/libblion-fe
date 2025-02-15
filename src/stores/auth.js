import { defineStore } from "pinia";
import router from "@/router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    users: [
      {
        email: "user@example.com",
        password: "password123",
      },
      {
        email: "user2@example.com",
        password: "password1234",
      },
    ],
  }),
  actions: {
    register(payload) {
      const availableUser = this.users.find(
        (user) => user.email === payload.email
      );

      if (availableUser) {
        return "Email sudah terdaftar";
      }

      this.users.push(payload);
      return router.push("/sign-in");
    },
    login(payload) {
      const availableUser = this.users.find(
        (user) =>
          user.email === payload.email && user.password === payload.password
      );

      if (!availableUser) {
        return "Email Atau password salah";
      }
      return router.push("/");
    },
  },

  logout() {
    return router.push("/sign-in");
  },
  persist: true,
});
