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
            <div v-for="book in books" class="flex flex-col gap-y-2 max-sm:w-[92px]">
                <figure class="max-w-64 max-sm:w-[92px]">
                    <img :src="book.cover" alt="cover-img">
                </figure>
                <h1 class="font-semibold max-sm:text-xs">{{ book.title }}</h1>
                <h2 class="text-sm  max-sm:text-xs">By : {{ book.author }}</h2>
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

import cover5 from '../../assets/images/cover/Cover5.jpg'
import cover6 from '../../assets/images/cover/Cover6.jpg'
import cover7 from '../../assets/images/cover/Cover7.jpg'
import cover8 from '../../assets/images/cover/Cover8.png'

const books = [
    {
        title: "Book 1",
        author: "Galih Nasuha",
        rate: 5,
        cover: cover5
    },
    {
        title: "Book 1",
        author: "Najib Nasuha",
        rate: 5,
        cover: cover6
    },
    {
        title: "Book 1",
        author: "Rahman Nasuha",
        rate: 5,
        cover: cover7
    },
    {
        title: "Book 1",
        author: "Anas Nasuha",
        rate: 5,
        cover: cover8
    },
]

import { useStore } from '@/stores/util'

const store = useStore()

const detailBooks = store.detailBooks

</script>