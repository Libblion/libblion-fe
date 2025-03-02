<template>
    <section
        class="w-full min-h-[85vh] grid grid-cols-6 items-center md:px-16 px-6 font-libre-text gap-6 pt-16 pb-16 md:pt-0 md:pb-0 bg-white dark:bg-gray-950 dark:text-white"
    >
        <div class="col-span-6 md:col-span-2 space-y-6">
            <h2
                class="text-5xl md:text-6xl font-bold text-center md:text-left dark:text-red-900"
            >
                Find Your Next Book
            </h2>
            <p class="text-gray-600 text-lg text-center md:text-left">
                Discover thousands of books in our extensive library collection.
                Browse, borrow, and enjoy your reading journey with us.
            </p>
            <div class="flex justify-center md:justify-start">
                <RouterLink to="/books">
                    <button
                        class="bg-black cursor-pointer text-white px-6 py-3 text-lg rounded dark:!bg-red-900"
                    >
                        Explore Now
                    </button>
                </RouterLink>
            </div>
        </div>
        <div v-if="errors" class="border text-center col-span-4">
            {{ errors }}
        </div>
        <div
            class="col-span-6 md:col-span-4 flex flex-col md:flex-row justify-center items-center gap-6"
            v-else
        >
            <span class="text-4xl animate-spin" v-if="isLoading">
                <font-awesome-icon icon="fa-solid fa-spinner" />
            </span>
            <div
                class="relative w-40 h-72 md:w-48 md:h-80 overflow-hidden"
                v-for="(book, i) in books"
                :class="i % 2 !== 0 ? 'rounded-b-full' : 'rounded-t-full'"
                v-else
            >
                <img
                    :src="book.cover_image"
                    alt="Darkness"
                    class="w-full h-full object-cover"
                />
                <div
                    class="absolute w-full bg-white dark:bg-gray-950 text-center py-3"
                    :class="i % 2 !== 0 ? 'top-0' : 'bottom-0'"
                >
                    <p class="font-bold text-lg">
                        {{
                            book.title.length > 5
                                ? `${book.title.slice(0, 5)}...`
                                : book.title
                        }}
                    </p>
                    <p class="text-sm">
                        {{
                            `${book.author.first_name} ${book.author.last_name}`
                        }}
                    </p>
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
const storeBook = bookStore();
const isLoading = ref(false);
const errors = ref("");

const books = ref([]);
const getRecommendBooks = async () => {
    isLoading.value = true;
    try {
        const response = await storeBook.getRecommendedBooks(0, 3);
        books.value = response.data.most_borrowed_books;
    } catch (error) {
        console.log(error.response.data);
        errors.value = error.response.data.message;
    } finally {
        isLoading.value = false;
    }
};

onMounted(async () => {
    await getRecommendBooks();
});
</script>
