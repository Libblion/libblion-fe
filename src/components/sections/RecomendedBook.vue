<template>
    <section class="min-h-80 flex flex-col gap-y-10 font-libre-text md:px-10">
        <div class="flex flex-row justify-between px-1">
            <h1 class="text-2xl font-bold max-sm:text-lg">Recomended Books</h1>
            <RouterLink to="/books">
                <p class="hover:underline max-sm:text-md">
                    See all <font-awesome-icon icon="fa-solid fa-arrow-right" />
                </p>
            </RouterLink>
        </div>
        <div class="flex flex-row justify-evenly max-sm:justify-center gap-1">
            <span class="text-4xl animate-spin" v-if="isLoading">
                <font-awesome-icon icon="fa-solid fa-spinner" />
            </span>
            <div v-for="book in books" class="flex flex-col gap-y-2 max-sm:w-[92px]">
                <figure class="max-w-64 max-sm:w-[92px]">
                    <img :src="cover11" alt="cover-img">
                </figure>
                <h1 class="font-semibold max-sm:text-xs">{{ book.title.length > 10 ? `${book.title.slice(0,10)}...` : book.title }}</h1>
                <h2 class="text-sm  max-sm:text-xs">By : {{ `${book.author.first_name} ${book.author.last_name}` }}</h2>
                <div class="flex flex-row  text-stone-400 text-sm gap-x-1 max-sm:text-[10px]">
                    <font-awesome-icon v-for="rate in book.rate" icon="fa-solid fa-star" />
                </div>
                <button class="bg-night-purple text-white h-14 w-40 rounded-md max-sm:h-6 max-sm:w-18 max-sm:text-xs cursor-pointer" @click="detailBooks(book)">
                    Borrow
                </button>
            </div>
        </div>
    </section>
</template>

<script setup>
import { bookStore } from '@/stores/bookStore'
import { storeToRefs } from 'pinia'

import cover11 from '../../assets/images/cover/Cover11.png'

import { useStore } from '@/stores/util'
import { onMounted, ref } from 'vue'

const store = useStore()
const storeBooks = bookStore()

const detailBooks = store.detailBooks

const books = ref([])
const isLoading = ref(false)


const getRecommendBooks = async ()=>{
    isLoading.value = true
    try {
        const response = await storeBooks.getRecommendedBooks(0,4)
        console.log(response.data);
        books.value = response.data.recommended_books
    } catch (error) {
        console.log(error);
        
    }finally{
        isLoading.value = false
    }
}

onMounted(()=>{
    getRecommendBooks()
})

</script>