import { defineStore } from "pinia";
import { api } from "@/services/api";
import { toast } from "vue3-toastify";
import { useAuthStore } from "@/stores/auth";

export const useAuthorStore = defineStore("author", {
    state: () => ({
        authors: [], // Pastikan ini array kosong saat awal
        isLoading: false,
        error: null,
    }),

    getters: {
        getAllAuthors: (state) => state.authors, // Pastikan ini hanya array
    },

    actions: {
        async fetchAuthors() {
            this.isLoading = true;
            this.error = null;
            const authStore = useAuthStore();
            try {
                const response = await api.get("/authors", {
                    headers: {
                        Authorization: `Bearer ${authStore.token}`,
                    },
                });
                // Perbaikan: Ambil array dari `response.data.data`
                this.authors = response.data.data;
            } catch (error) {
                this.error =
                    error.response?.data?.message ||
                    error.message ||
                    "Failed to fetch authors";
                toast.error(this.error);
            } finally {
                this.isLoading = false;
            }
        },

        async searchAuthors(query, noLoading = false) {
            if (!noLoading) {
                this.isLoading = true;
            }
            this.error = null;
            const authStore = useAuthStore();
            try {
                // Karena backend tidak memiliki endpoint khusus untuk pencarian author,
                // kita akan mengambil semua author terlebih dahulu dan melakukan filter di sisi klien
                const response = await api.get("/authors", {
                    headers: {
                        Authorization: `Bearer ${authStore.token}`,
                    },
                });

                const allAuthors = response.data.data;

                // Jika query kosong, kembalikan semua author
                if (!query || query.trim() === "") {
                    this.authors = allAuthors;
                    return;
                }

                // Filter author berdasarkan query (case insensitive)
                const lowercaseQuery = query.toLowerCase();
                this.authors = allAuthors.filter(
                    (author) =>
                        author.first_name
                            .toLowerCase()
                            .includes(lowercaseQuery) ||
                        author.last_name
                            .toLowerCase()
                            .includes(lowercaseQuery) ||
                        author.email.toLowerCase().includes(lowercaseQuery) ||
                        author.no_telp.includes(query)
                );
            } catch (error) {
                this.error =
                    error.response?.data?.message ||
                    error.message ||
                    "Failed to search authors";
                toast.error(this.error);
            } finally {
                if (!noLoading) {
                    this.isLoading = false;
                }
            }
        },

        async addAuthor(payload) {
            this.isLoading = true;
            this.error = null;
            const authStore = useAuthStore();
            try {
                const response = await api.post("/authors", payload, {
                    headers: {
                        Authorization: `Bearer ${authStore.token}`,
                    },
                });

                if (response.data) {
                    this.authors.push(response.data.data); // Perbaikan: Ambil dari `data.data`
                    toast.success(
                        response.data?.message || "Author added successfully!"
                    );
                }
            } catch (error) {
                this.error =
                    error.response?.data?.message ||
                    error.message ||
                    "Failed to add author";
                toast.error(this.error);
            } finally {
                this.isLoading = false;
            }
        },

        async updateAuthor(id, payload) {
            this.isLoading = true;
            this.error = null;
            const authStore = useAuthStore();
            try {
                const response = await api.put(`/authors/${id}`, payload, {
                    headers: {
                        Authorization: `Bearer ${authStore.token}`,
                    },
                });

                const index = this.authors.findIndex(
                    (author) => author.id === id
                );
                if (index !== -1) {
                    this.authors[index] = response.data.data; // Perbaikan: Ambil dari `data.data`
                }

                toast.success(
                    response.data?.message || "Author updated successfully!"
                );
            } catch (error) {
                this.error =
                    error.response?.data?.message ||
                    error.message ||
                    "Failed to update author";
                toast.error(this.error);
            } finally {
                this.isLoading = false;
            }
        },

        async deleteAuthor(id) {
            this.isLoading = true;
            this.error = null;
            const authStore = useAuthStore();
            try {
                await api.delete(`/authors/${id}`, {
                    headers: {
                        Authorization: `Bearer ${authStore.token}`,
                    },
                });

                this.authors = this.authors.filter(
                    (author) => author.id !== id
                );
                toast.success("Author deleted successfully!");
            } catch (error) {
                this.error =
                    error.response?.data?.message ||
                    error.message ||
                    "Failed to delete author";
                toast.error(this.error);
            } finally {
                this.isLoading = false;
            }
        },
    },
});
