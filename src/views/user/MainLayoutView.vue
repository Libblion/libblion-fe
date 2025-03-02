<template>
    <ModalFormBorrow />
    <MainLayout>
        <template #content>
            <!-- Rekomendation Most Borrowed Books -->
            <h1 class="pl-4 text-3xl font-bold p-10">Most Borrowed Books</h1>
            <section
                class="grid grid-cols-2  items-center place-items-center sm:place-items-baseline md:place-items-center sm:p-2 sm:gap-x-2 mb-10 mt-10">
                <div v-if="errors" class="w-full text-center border col-span-2">
                    {{ errors
                     }}
                </div>
                <div v-else v-for="(borrowed, i) in recommend.most_borrowed_books"
                    class="shadow-md flex flex-col gap-y-2 w-42 h-72 sm:w-full lg:w-[500px] sm:flex-row sm:h-full dark:!bg-red-900">
                    <figure class="w-96  max-md:w-42 max-md:h-32">
                        <img :src="borrowed.cover_image ?? `https://placehold.co/500x800?text=Cover+Image`" alt="cover-image" class="w-full h-full object-cover">
                    </figure>
                    <div class="flex flex-col justify-evenly w-full">
                        <div class="pl-2">
                            <h1 class="text-sm font-semibold sm:text-2xl">
                                {{ borrowed.title.length > 12 ? `${borrowed.title.slice(0, 20)}...` : borrowed.title }}
                            </h1>
                            <h2 class="text-[12px] sm:text-lg">By :
                                {{ `${borrowed.author?.first_name} ${borrowed.author?.last_name}` ?? borrowed.author }}
                            </h2>
                        </div>
                        <div class="pl-2 text-[10px] sm:text-[14px]">
                            <p>
                                <span>
                                    Year
                                </span>
                                :
                                <span>
                                    {{ borrowed.release_year ?? borrowed.year }}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div class="flex justify-end items-end gap-x-2 px-2 py-1 sm:flex-col ">
                        <h1 class="text-center w-24 text-sm  max-sm:text-[10px]">
                            <p class="text-xl font-bold">
                                {{ borrowed.borrowings_count }}
                            </p>
                            <p>
                                Borrowed
                            </p>
                        </h1>
                        <button
                            class="bg-night-green text-white hover:bg-slate-800 transition-colors  w-full rounded-md h-8 text-[10px] cursor-pointer lg:w-24 lg:h-10 lg:text-sm"
                            @click="detailBooks({
                                ...borrowed,
                                cover: i % 2 == 0 ? cover6 : cover5,
                            })">
                            Borrow
                        </button>
                    </div>
                </div>
            </section>
            <!-- Recomendation Books -->
            <h1 class="pl-4 text-3xl font-bold p-10">Recomendation Books</h1>
            <section class="grid max-md:grid-rows-3 gap-y-2 p-2 lg:grid-cols-3 gap-x-3 mb-10">
                <div v-if="errors" class="w-full text-center border">
                    {{ errors
                     }}
                </div>
                <div v-else v-for="(recommend, i) in recommend.recommended_books"
                    class="h-32 overflow-hidden flex flex-row gap-4 shadow-md lg:h-52 dark:!bg-red-900">
                    <figure class="w-64 h-full max-md:h-32 max-md:w-32 overflow-hidden">
                        <img :src="recommend.cover_image ?? `https://placehold.co/800x1000?text=Cover+Image`" alt="image-cover" class="h-full w-full object-cover">
                    </figure>
                    <div class="flex flex-col gap-y-2 lg:between lg:gap-y-4 pb-2">
                        <div class="lg:h-full flex justify-center flex-col">
                            <h1 class="text-md font-bold lg:text-xl">{{ recommend.title.length > 10 ? `${recommend.title.slice(0,10)}...` : recommend.title }}</h1>
                            <h2 class="text-[12px] lg:text-lg">By :
                                {{ `${recommend.author.first_name} ${recommend.author.last_name}` }}</h2>
                            <small class="block max-w-96">
                                {{ recommend.description.length > 50 ? `${recommend.description.slice(0, 50)}...` : recommend.description }}
                            </small>
                        </div>
                        <div class="flex flex-row justify-between max-sm:pr-2 items-center px-2">
                            <small class="font-bold text-[8px]lg:text-sm">
                                {{ recommend.release_year }}
                            </small>
                            <button
                                class="bg-night-green text-white hover:bg-slate-800 transition-colors rounded-md text-[10px] p-1 w-18 h-8 lg:w-24 lg:h-10 lg:text-sm cursor-pointer"
                                @click="detailBooks({
                                    ...recommend,
                                    cover: i % 2 == 0 ? cover2 : cover3,
                                })">
                                Borrow
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <!-- Categories -->
            <section class="flex flex-wrap justify-center gap-4 lg:justify-around mb-10">
                <div
                    class="w-14 h-14 rounded-full flex justify-center items-center text-[10px] lg:h-20 lg:w-20 lg:text-lg bg-night-purple text-white cursor-pointer  dark:!bg-red-900"
                    @click="categoryBooks(null)">
                    <small>
                        All
                    </small>
                </div>
                <div v-for="category in getCategories"
                    class="w-14 h-14 rounded-full flex justify-center items-center text-[10px] lg:h-20 lg:w-20 lg:text-lg bg-night-purple text-white cursor-pointer  dark:!bg-red-900"
                    @click="categoryBooks(category.id)">
                    <small>
                        {{ category.name }}
                    </small>
                </div>
            </section>
            <!-- Search Input -->
            <section class="p-2 mb-2 lg:pl-[140px]">
                <div class="w-1/2 max-md:w-full">
                    <label for="search" class="relative">
                        <input v-model="search" type="text" id="search" placeholder="search book here..."
                            class="border rounded-md h-10  pl-5 w-full">
                        <button class="absolute top-0 right-4" @click="search = ''">
                            <font-awesome-icon icon="fa-solid fa-xmark" />
                        </button>
                    </label>
                </div>
            </section>
            <!-- List Books -->
            <section class="flex flex-wrap p-2 gap-4 justify-center mb-10 overflow-y-auto max-h-screen text-white bg-black">
                <div v-if="isLoading" class="flex justify-center items-center">
                    <span class="animate-spin text-4xl">
                        <font-awesome-icon icon="fa-solid fa-spinner" />
                    </span>
                </div>
                <div v-else-if="books.length == 0">
                    {{ errors }}
                </div>
                <div v-for="(book, i) in books" class="flex flex-col gap-y-1 shadow-md bg-white/30" v-else>
                    <figure class="h-72 w-52 lg:w-64 lg:h-72 overflow-hidden">
                        <img :src="book.cover_image ?? `https://placehold.co/800x900?text=Cover+Image`" alt="image-cover" class="w-full h-full object-cover">
                    </figure>
                    <h1 class="font-light px-4">
                        {{ book.title.length > 15 ? `${book.title.slice(0, 10)}...` : book.title }}</h1>
                    <div class="flex flex-row justify-between p-4">
                        <button
                            class="bg-night-green text-white hover:bg-slate-800 transition-colors p-1 rounded-md text-sm md:w-20 lg: w-40 h-10 max-md:w-12 max-md:h-8 max-md:text-[10px] cursor-pointer"
                            @click="detailBooks({
                                ...book,
                                cover: i % 2 == 0 ? cover8 : cover7,
                            })">
                            Borrow
                        </button>
                        <small class="font-bold lg:text-md flex items-center mb-2">
                            {{ book.release_year }}
                        </small>
                    </div>
                    <small class="bg-red-700 p-1 flex justify-center items-center">{{ book.category.name }}</small>
                </div>
            </section>
        </template>
    </MainLayout>
</template>

<script setup>
import MainLayout from "@/layouts/MainLayout.vue";
import ModalFormBorrow from "@/components/modal/ModalFormBorrow.vue";
import cover2 from "@/assets/images/cover/Cover2.jpg";
import cover3 from "@/assets/images/cover/Cover3.jpg";
import cover5 from "@/assets/images/cover/Cover5.jpg";
import cover6 from "@/assets/images/cover/Cover6.jpg";
import cover7 from "@/assets/images/cover/Cover7.jpg";
import cover8 from "@/assets/images/cover/Cover8.png";

import { bookStore } from "@/stores/bookStore";
import { computed, onMounted, ref, watch } from "vue";
import { useLoadingStore } from "@/stores/loadingStore";
import { useCategoryStore } from "@/stores/categoryStore";
import { useStore } from "@/stores/util";

const store = useStore();
const storeBooks = bookStore();
const category = useCategoryStore();

const detailBooks = store.detailBooks;
const getCategories = computed(() => category.categories);

const books = computed(() => {
  return storeBooks.getAllBooks;
});

const errors = ref("");

const recommend = ref([]);

const recommendationBooks = async () => {
  try {
    const response = await storeBooks.getRecommendedBooks();
    console.log(response);
    recommend.value = response.data;
  } catch (error) {
    console.log(error);
    errors.value = error.response.data.message;
  }
};

const loading = useLoadingStore();
const isLoading = ref(false);

const categoryBooks = async (id) => {
  isLoading.value = true;
  try {
    await storeBooks.getBooks(id);
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

const search = ref("");

watch(
  () => search.value,
  async () => {
    try {
      isLoading.value = true;
      return await storeBooks.getBooks(null, search.value);
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  }
);

onMounted(async () => {
  try {
    await Promise.all([storeBooks.getBooks(), recommendationBooks(),category.getCategories()]);
  } catch (error) {
    console.error("Error in onMounted:", error);
  } finally {
    loading.stop();
  }
});
</script>

<style scoped>
::-webkit-scrollbar {
  width: 0px;
}
</style>
