import { api } from "@/services/api"
import { defineStore } from "pinia"

export const bookStore = defineStore('books',{
    state : ()=>({
        books : []
    }),
    actions : {
        async getBooks (){
            try {
                const response = await api.get('/books')

                const {data,message} = response.data
                
                this.books = data

                console.log(response.data);
                
                return response.data
                
            } catch (error) {
                console.log(error);
                throw error
            }
        },
        async getRecommendedBooks (){
            try {
                const response = await api.get('/books/most/recommended')
                return response.data
                
            } catch (error) {
                console.log(error);
                throw error
            }
        }
    },
    getters : {
        getAllBooks : (state) => state.books
    },
    persist : true
})