import { defineStore } from 'pinia'
import { bookStore } from './bookStore'

export const useStore = defineStore('store', {
  state: () => ({
    isOpenModalBorrow : false,
    theme : ""
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
    },
    setTheme (){
      const htmlTag = document.documentElement; 
      
      if (this.theme === "dark") {
        this.theme = "";
        htmlTag.classList.remove("dark"); // Hapus class dark jika ada
      } else {
        this.theme = "dark";
        htmlTag.classList.add("dark"); // Tambah class dark jika belum ada
      }
      
      console.log("Theme updated to:", this.theme);
    }
  },
  persist: {
    pick : ['theme']
  }
})