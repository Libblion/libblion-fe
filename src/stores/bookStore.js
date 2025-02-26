import { api } from "@/services/api"
import { defineStore } from "pinia"

export const bookStore = defineStore('books',{
    state : ()=>({
        books : [],
        detailBook : {},
    }),
    actions : {
        async getBooks (id,search){
            try {
                const response = await api.get('/books',{
                    params : {
                        category_id : id,
                        search
                    }
                })

                const {data,message} = response.data
                
                this.books = data

                console.log(response.data);
                
                return response.data
                
            } catch (error) {
                console.log(error);
                throw error
            }
        },
        async getRecommendedBooks (skip,limit){
            try {
                const response = await api.get('/books/most/recommended',{
                    params : {
                        skip,
                        limit
                    }
                })
                
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
    persist : {
        pick : ['books']
    }
})
