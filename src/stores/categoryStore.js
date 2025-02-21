import { api } from "@/services/api";
import { defineStore } from "pinia";

export const useCategoryStore = defineStore('categories',{
    state : ()=>({
        categories : []
    }),
    actions : {
        async getCategories(){
            try {
                const response = await api.get('/categories')
                this.categories = response.data
                return response.data
            } catch (error) {
                console.log(error);
                throw error
            }
        }
    },
    persist : true
})