import { defineStore } from 'pinia';
import { api } from '@/services/api';
import { toast } from 'vue3-toastify';
import { useAuthStore } from '@/stores/auth';

export const useAuthorStore = defineStore('author', {
  state: () => ({
    authors: null,
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchAuthors() {
      this.isLoading = true;
      this.error = null;
      const authStore = useAuthStore();
      try {
        const response = await api.get('/authors', {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        this.authors = response.data;
      } catch (error) {
        this.error =
          error.response?.data?.message ||
          error.message ||
          'Failed to fetch authors';
        toast.error(this.error);
      } finally {
        this.isLoading = false;
      }
    },

    async addAuthor(payload) {
      this.isLoading = true;
      this.error = null;
      const authStore = useAuthStore();
      try {
        const response = await api.post('/authors', payload, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });

        // Handle the response data properly
        if (response.data) {
          // If authors is null or not an array, initialize it
          if (!Array.isArray(this.authors?.data)) {
            this.authors = { data: [] };
          }

          // Add the new author to the data array
          this.authors.data.push(response.data);

          // Get success message from response or use default
          const message =
            response.data?.message || 'Author added successfully!';
          toast.success(message);
        }
      } catch (error) {
        this.error =
          error.response?.data?.message ||
          error.message ||
          'Failed to add author';
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

        // Ensure authors.data is an array before updating
        if (Array.isArray(this.authors?.data)) {
          const index = this.authors.data.findIndex(
            (author) => author.id === id
          );
          if (index !== -1) {
            this.authors.data[index] = response.data;
          }
        } else {
          console.error('this.authors.data is not an array', this.authors);
          this.authors = { data: [response.data] }; // Fallback if null
        }

        const message =
          response.data?.message || 'Author updated successfully!';
        toast.success(message);
      } catch (error) {
        this.error =
          error.response?.data?.message ||
          error.message ||
          'Failed to update author';
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
        const response = await api.delete(`/authors/${id}`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });

        // Ensure authors.data is an array before filtering
        if (Array.isArray(this.authors?.data)) {
          this.authors.data = this.authors.data.filter(
            (author) => author.id !== id
          );

          // Get success message from response or use default
          const message =
            response.data?.message || 'Author deleted successfully!';
          toast.success(message);
        }
      } catch (error) {
        this.error =
          error.response?.data?.message ||
          error.message ||
          'Failed to delete author';
        toast.error(this.error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
