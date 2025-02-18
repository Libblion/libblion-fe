<template>
    <MainLayout>
        <template #content>
            <!-- Rekomendation Most Borrowed Books -->
            <h1 class="pl-4 text-3xl font-bold p-10">Most Borrowed Books</h1>
            <section class="grid grid-cols-2 grid-flow- items-center place-items-center sm:place-items-baseline md:place-items-center sm:p-2 sm:gap-x-2 mb-10 mt-10">
                <div v-for="borrowed in mostBorrowed" class="shadow-md flex flex-col gap-y-2 w-42 h-72 sm:w-full lg:w-[500px] sm:flex-row sm:h-full">
                    <figure class="overflow-hidden md:w-64 sm:w-full">
                        <img :src="borrowed.cover" alt="cover-image">
                    </figure>
                   <div class="flex flex-col justify-evenly w-full">
                    <div class="pl-2">
                        <h1 class="text-sm font-semibold sm:text-2xl">{{ borrowed.title }}</h1>
                        <h2 class="text-[12px] sm:text-lg">By : {{ borrowed.author }}</h2>
                    </div>
                    <div class="pl-2 text-[10px] sm:text-[14px]">
                        <p>
                            <span>
                                Page
                            </span>
                            :
                            <span>
                                {{ borrowed.totalPage }}
                            </span>
                        </p>
                        <p>
                            <span>
                                Language
                            </span>
                            :
                            <span>
                                {{ borrowed.lang }}
                            </span>
                        </p>
                        <p>
                            <span>
                                Year
                            </span>
                            :
                            <span>
                                {{ borrowed.year }}
                            </span>
                        </p>
                    </div>
                   </div>
                    <div class="flex justify-end items-end gap-x-2 px-2 py-1 sm:flex-col ">
                        <h1 class="text-center w-24 text-sm">
                            <p class="text-xl font-bold">
                                {{ borrowed.borrowed }}
                            </p>
                            <p>
                                Borrowed
                            </p>
                        </h1>
                        <button class="border w-full rounded-md h-8 text-[10px] cursor-pointer lg:w-24 lg:h-10 lg:text-sm">
                            Borrow
                        </button>
                    </div>
                </div>
            </section>
            <!-- Recomendation Books -->
             <h1 class="pl-4 text-3xl font-bold p-10">Recomendation Books</h1>
            <section class="grid max-md:grid-rows-3 gap-y-2 p-2 lg:grid-cols-3 gap-x-3 mb-10">
                <div v-for="recommend in recommendationBooks" class="h-32 overflow-hidden flex flex-row gap-4 shadow-md lg:h-fit">
                    <figure class="w-1/2">
                        <img :src="recommend.cover" alt="image-cover">
                    </figure>
                    <div class="flex flex-col gap-y-2 lg:justify-evenly lg:gap-y-4">
                        <div>
                            <h1 class="text-md font-bold lg:text-xl">{{ recommend.title }}</h1>
                            <h2 class="text-[12px] lg:text-lg">By : {{ recommend.author }}</h2>
                            <small>
                                {{ recommend.summary }}
                            </small>
                        </div>
                        <div class="flex flex-row justify-between pr-2">
                            <small class="font-bold text-[8px]lg:text-sm">
                                {{ recommend.year }}
                            </small>
                            <button class="border rounded-md text-[10px] p-1 lg:w-24 lg:h-10">
                                Borrow
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <!-- Categories -->
            <section class="flex flex-wrap justify-center gap-4 lg:justify-around mb-10">
                <div v-for="category in 6" class="w-14 h-14 rounded-full border flex justify-center items-center text-[10px] lg:h-20 lg:w-20 lg:text-lg">
                    <small>
                        Catgory {{ category }}
                    </small>
                </div>
            </section>
            <!-- Search Input -->
            <section class="p-2 mb-10">
                <div class="w-full">
                    <label for="search" class="relative">
                        <input type="text" id="search" placeholder="search here..."
                            class="border rounded-full h-10 lg:h-12 pl-5 w-full">
                        <button class="absolute top-0 right-4">
                            <font-awesome-icon icon="fa-solid fa-xmark" />
                        </button>
                    </label>
                </div>
            </section>
            <!-- List Books -->
            <section class="flex flex-wrap p-2 gap-4 justify-center mb-10">
                <div v-for="book in allBooks" class="flex flex-col gap-y-1 shadow-md">
                    <figure class="w-36 lg:w-64">
                        <img :src="book.cover" alt="image-cover">
                    </figure>
                    <h1 class="font-bold px-4">{{ book.title }}</h1>
                    <div class="flex flex-row justify-between p-4">
                        <button class="border p-1 rounded-md text-sm lg:w-40 h-12">
                            Borrow
                        </button>
                        <small class="font-bold lg:text-md flex items-center">
                            {{ book.year }}
                        </small>
                    </div>
                </div>
            </section>
        </template>
    </MainLayout>
</template>

<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
import cover1 from '@/assets/images/cover/Cover1.png'
import cover2 from '@/assets/images/cover/Cover2.jpg'
import cover3 from '@/assets/images/cover/Cover3.jpg'
import cover4 from '@/assets/images/cover/Cover4.jpg'
import cover5 from '@/assets/images/cover/Cover5.jpg'
import cover6 from '@/assets/images/cover/Cover6.jpg'
import cover7 from '@/assets/images/cover/Cover7.jpg'
import cover8 from '@/assets/images/cover/Cover8.png'

const mostBorrowed = [
    {
        title: 'Book 1',
        cover: cover6,
        author: 'Anas Nasuha',
        borrowed: 100,
        totalPage: 100,
        lang: 'Indonesia',
        year: 2025
    },
    {
        title: 'Book 2',
        cover: cover4,
        author: 'Just Najib',
        borrowed: 99,
        totalPage: 120,
        lang: 'Indonesia',
        year: 2025
    },
]


const recommendationBooks = [
    {
        title: 'Book 1',
        cover: cover1,
        author: 'Rahman Hayadi',
        summary: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid, quisquam!',
        year: 2025
    },
    {
        title: 'Book 2',
        cover: cover8,
        author: 'Mochammad Galih',
        summary: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid, quisquam!',
        year: 2025
    },
    {
        title: 'Book 3',
        cover: cover7,
        author: 'Aziz Nurulloh',
        summary: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid, quisquam!',
        year: 2024
    },
]

const allBooks = [
    {
        title: 'Book 1',
        cover: cover1,
        author: 'Anas Nasuha',
        year: 2025
    },
    {
        title: 'Book 2',
        cover: cover2,
        author: 'Just Najib',
        year: 2025
    },
    {
        title: 'Book 3',
        cover: cover3,
        author: 'Anas Nasuha',
        year: 2025
    },
    {
        title: 'Book 4',
        cover: cover4,
        author: 'Rahman hayadi',
        year: 2025
    },
    {
        title: 'Book 5',
        cover: cover5,
        author: 'Mochammad Galih',
        year: 2025
    },
    {
        title: 'Book 6',
        cover: cover6,
        author: 'Anas Nasuha',
        year: 2025
    },
    {
        title: 'Book 7',
        cover: cover7,
        author: 'Just Najib',
        year: 2025
    },
    {
        title: 'Book 8',
        cover: cover8,
        author: 'Anas Nasuha',
        year: 2025
    },
]
</script>