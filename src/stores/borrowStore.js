import { api } from "@/services/api";
import { defineStore } from "pinia";

export const userBorrowStore = defineStore("borrows", {
    state: () => ({}),
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
    },
});
