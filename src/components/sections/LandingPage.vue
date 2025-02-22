<template>
    <section
        class="w-full min-h-[85vh] grid grid-cols-6 items-center md:px-16 px-6 font-libre-text gap-6 pt-16 pb-16 md:pt-0 md:pb-0">
        <div class="col-span-6 md:col-span-2 space-y-6">
            <h2 class="text-5xl md:text-6xl font-bold text-center md:text-left">
                Find Your Next Book
            </h2>
            <p class="text-gray-600 text-lg text-center md:text-left">
                Commodo eiusmod id duis ad cillum ad exercitation magna eiusmod
                ullamco
            </p>
            <div class="flex justify-center md:justify-start">
                <RouterLink to="/books">
                    <button class="bg-black cursor-pointer text-white px-6 py-3 text-lg rounded">
                        Explore Now
                    </button>
                </RouterLink>
            </div>
        </div>
        <div class="col-span-6 md:col-span-4 flex flex-col md:flex-row justify-center items-center gap-6">
            <span class="text-4xl animate-spin" v-if="isLoading">
                <font-awesome-icon icon="fa-solid fa-spinner" />
            </span>
            <div class="relative w-40 h-72 md:w-48 md:h-80  overflow-hidden" v-for="(book, i) in books"
                :class="i % 2 !== 0 ? 'rounded-b-full' : 'rounded-t-full'" v-else>
                <img :src="i % 2 !== 0 ? cover2 : cover3" alt="Darkness" class="w-full h-full object-cover" />
                <div class="absolute w-full bg-white text-center py-3" :class="i % 2 !== 0 ? 'top-0' : 'bottom-0'">
                    <p class="font-bold text-lg">
                        {{ book.title.length > 5 ? `${book.title.slice(0, 5)}...` : book.title }}</p>
                    <p class="text-sm">{{ `${book.author.first_name} ${book.author.last_name}` }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import cover1 from "../../assets/images/cover/Cover1.png";
import cover2 from "../../assets/images/cover/Cover2.jpg";
import cover3 from "../../assets/images/cover/Cover3.jpg";

import { onMounted, ref } from "vue";
import { bookStore } from "@/stores/bookStore";
const storeBook = bookStore()
const isLoading = ref(false)

const books = ref([]);
const getRecommendBooks = async () => {
    isLoading.value = true
    try {
        const response = await storeBook.getRecommendedBooks(0, 3)
        books.value = response.data.most_borrowed_books
    } catch (error) {
        console.log(error);

    } finally {
        isLoading.value = false
    }

}

onMounted(async () => {
    await getRecommendBooks()
})
</script>
