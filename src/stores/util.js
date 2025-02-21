import { defineStore } from 'pinia'
import { bookStore } from './bookStore'

export const useStore = defineStore('store', {
  state: () => ({
    isOpenModalBorrow : false,
  }),
  actions : {
    openModalBorrow (){
      this.isOpenModalBorrow = true
    },
    closeModalBorrow (){
      this.isOpenModalBorrow = false
    },
    detailBooks(book){
      const books = bookStore()
      books.detailBook = book
      return this.openModalBorrow()
    }
  },
})