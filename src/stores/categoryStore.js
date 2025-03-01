import { api } from "@/services/api";
import { defineStore } from "pinia";
import { useLoadingStore } from "@/stores/loadingStore";
import { useAuthStore } from "@/stores/auth";

export const useCategoryStore = defineStore("categories", {
    state: () => ({
        categories: [],
    }),
    actions: {
        async getCategories() {
            const loadingStore = useLoadingStore();
            loadingStore.start();
            try {
                const authStore = useAuthStore();
                const response = await api.get("/categories", {
                    headers: {
                        Authorization: `Bearer ${authStore.token}`,
                    },
                });
                this.categories = response.data;
                return response.data;
            } catch (error) {
                console.log(error);
                throw error;
            } finally {
                loadingStore.stop();
            }
        },

        async searchCategories(query, noLoading = false) {
            const loadingStore = useLoadingStore();

            // Hanya tampilkan loading jika noLoading adalah false
            if (!noLoading) {
                loadingStore.start();
            }

            try {
                const authStore = useAuthStore();
                // Ambil semua kategori terlebih dahulu
                const response = await api.get("/categories", {
                    headers: {
                        Authorization: `Bearer ${authStore.token}`,
                    },
                });

                const allCategories = response.data;

                // Jika query kosong, kembalikan semua kategori
                if (!query || query.trim() === "") {
                    this.categories = allCategories;
                    return;
                }

                // Filter kategori berdasarkan query (case insensitive)
                const lowercaseQuery = query.toLowerCase();
                this.categories = allCategories.filter((category) =>
                    category.name.toLowerCase().includes(lowercaseQuery)
                );
            } catch (error) {
                console.log(error);
                throw error;
            } finally {
                // Hanya matikan loading jika noLoading adalah false
                if (!noLoading) {
                    loadingStore.stop();
                }
            }
        },
    },
    persist: true,
});
