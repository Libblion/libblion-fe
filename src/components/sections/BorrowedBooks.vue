<template>
  <section class="min-h-80 md:p-10 px-10 max-sm:p-1 font-libre-text">
    <div class="flex flex-row justify-between px-1 items-center w-full mb-6">
      <h1 class="text-2xl font-bold max-sm:text-lg  dark:!bg-red-900 dark:text-white p-1">Top - 10 Most Borrowed</h1>
      <RouterLink to="/books">
        <p class="hover:underline max-sm:text-sm">
          See all <font-awesome-icon icon="fa-solid fa-arrow-right" />
        </p>
      </RouterLink>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-if="isLoading" class="text-center animate-spin">
        <span class="text-4xl animate-spin">
          <font-awesome-icon icon="fa-solid fa-spinner" />
        </span>
      </div>
      <CardMostBorrowed v-for="(book, index) in books" :key="index" :image="cover12" :bookName="book.title" :author="{
        first_name: book.author.first_name,
        last_name: book.author.last_name
      }" :rating="book.rating" v-else />
    </div>
  </section>
</template>
<script setup>
import { onMounted, ref } from "vue";
import CardMostBorrowed from "@/components/sections/CardMostBorrowed.vue";
import cover12 from '@/assets/images/cover/cover12.png'
import { bookStore } from "@/stores/bookStore";
const storeBook = bookStore()
const isLoading = ref(false)

const books = ref([]);
const getRecommendBooks = async () => {
  isLoading.value = true
  try {
    const response = await storeBook.getRecommendedBooks(4, 4)
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
