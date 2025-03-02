import { api } from "@/services/api";
import { defineStore } from "pinia";

export const userBorrowStore = defineStore("borrows", {
    state: () => ({
        borrowings: [],
    }),
    getters: {
        getAllBorrowings: (state) => state.borrowings,
    },
    actions: {
        async getBorrowing() {
            try {
                const response = await api.get("/borrowings", {
                    params: {
                        status: "returned",
                    },
                });
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        async createBorrowing(payload) {
            try {
                const response = await api.post("/borrowings", payload);

                return response.data;
            } catch (error) {
                console.log(payload);
                throw error;
            }
        },
        async getBorrowingOverdue() {
            try {
                const response = await api.get("/borrow/overdue");
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        async fetchBorrowings() {
            try {
                const { data } = await api.get("/borrowings");
                this.borrowings = data.data;
                return data;
            } catch (error) {
                console.error("Error fetching borrowings:", error);
                throw error;
            }
        },
        async searchBorrowings(query, filters) {
            try {
                let params = {};

                if (query) {
                    params.search = query;
                }

                if (filters && filters.status) {
                    params.status = filters.status;
                }

                console.log("Search params:", params);

                const { data } = await api.get("/borrowings", { params });
                this.borrowings = data.data;
                return data;
            } catch (error) {
                console.error("Error searching borrowings:", error);
                throw error;
            }
        },
        async updateBorrow (id,payload){
            try {
                const response = await api.post(`/borrowings/${id}`,{
                    "_method" : "PUT",
                    ...payload
                })
                return response.data
            } catch (error) {
                throw error
            }
        }
    },
});
