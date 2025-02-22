import { defineStore } from "pinia";
import router from "@/router";
import { api } from "@/services/api";
import { toast } from "vue3-toastify";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoading: false,
    isGenerate: false,
    error: null,
    token: null,
    currentUser: null,
    isLogged: false,
  }),
  actions: {
    async register(payload) {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await api.post("/auth/register", payload);
        const {
          data: { message },
        } = response;

        toast.success(message);
        setTimeout(() => {
          return router.push("/sign-in");
        }, 2500);
      } catch (error) {
        this.error = error.response?.data?.message || "Something went wrong";
        toast.error(this.error);
      } finally {
        this.isLoading = false;
      }
    },
    async login(payload) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await api.post("/auth/login", payload);
        const {
          data: { token, user, message },
        } = response;

        this.token = token;
        this.currentUser = user;

        if (user.email_verified_at === null) {
          toast.warning("Harap verifikasi email Anda terlebih dahulu!");
          setTimeout(() => {
            return router.push("/verify-account");
          }, 2500);
          return;
        }

        toast.success(message);
        this.isLogged = true
        setTimeout(() => {
          return router.push("/");
        }, 2500);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong your Email / password");
      } finally {
        this.isLoading = false;
      }
    },

    async logout() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await api.post("/auth/logout", null, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        const { data } = response;

        this.token = null;
        this.currentUser = null;
        this.isLogged = false

        toast.success(data.message);
        setTimeout(() => {
          return router.push("/sign-in");
        }, 2500);
      } catch (error) {
        toast.error(error.response?.data?.error || "Something went wrong");
      } finally {
        this.isLoading = false;
      }
    },

    async userLogged() {
      if (!this.token) {
        throw new Error("No token found");
      }

      try {
        const response = await api.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        const { data } = response;
        this.currentUser = data.user;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },

    async verifyAccount(payload) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await api.post(
          "/auth/account-verification",
          { otp: payload },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        this.userLogged();
        this.isLogged = true
        toast.success(response.data.message);
        setTimeout(() => {
          router.push("/");
        }, 2500);
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        this.isLoading = false;
      }
    },

    async generateOtp(payload) {
      this.isGenerate = true;
      this.error = null;
      try {
        const response = await api.post(
          "/auth/generate-otp-code",
          { email: payload },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        toast.success(response.data.message);
      } catch (error) {
        this.error = error.response?.data?.message || "Something went wrong";
        toast.error(this.error);
      } finally {
        this.isGenerate = false;
      }
    },
  },

  persist: {
    pick: ["token", "currentUser", "isLogged"],
  },
});
