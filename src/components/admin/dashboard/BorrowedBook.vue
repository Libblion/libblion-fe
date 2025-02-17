<template>
    <div class="overflow-y-auto rounded-md p-2 flex flex-col gap-y-4 max-sm:max-h-96 h-72">
        <h1 class="text-2xl font-semibold">{{ borrowedBooks.name }}</h1>
        <div class="flex sm:flex-row w-full justify-evenly flex-col lg:flex-col gap-y-2 gap-x-4 max-md:overflow-y-hidden">
            <div v-for="book in borrowedBooks.books" class="flex flex-row gap-x-2 lg:h-40">
                <figure class="w-36 lg:w-20">
                    <img :src="book.cover" alt="cover-book" class="">
                </figure>
                <div class="flex flex-col gap-2 text-sm">
                    <div class="flex flex-col gap-y-1">
                        <h1 class="text-lg font-bold lg:text-sm">
                            {{ book.title.length > 2 ? `${book.title.slice(0, 5)}...` : book.title }}</h1>
                        <h3 class="text-sm lg:text-xs">By : {{ book.author }}</h3>
                        <h4 class="text-sm lg:text-xs">
                            ID : {{ book.borrowId }}
                        </h4>
                    </div>
                    <div class="flex flex-col gap-x-3 lg:text-[10px]">
                        <div>
                            <h1 class="font-bold text-indigo-700">Borrowed</h1>
                            <p class="text-xs lg:text-[8px]">{{ book.returnDate }}</p>
                        </div>
                        <div>
                            <h1 class="font-bold text-green-600  lg:text-[10px]">Return</h1>
                            <p class="text-xs  lg:text-[8px]">
                                {{ book.returnDate }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import cover1 from '@/assets/images/cover/cover8.png'
import cover2 from '@/assets/images/cover/cover10.png'
const borrowedBooks = {
    name: 'Borrowed Books',
    books: [
        {
            borrowId: '1234',
            title: 'title1',
            cover: cover1,
            status: 'done',
            author: 'author1',
            borrowedDate: '12-08-2024',
            returnDate: '15-08-2024'
        },
        {
            borrowId: '12345',
            title: 'title2',
            cover: cover2,
            status: 'done',
            author: 'author2',
            borrowedDate: '12-08-2024',
            returnDate: '15-08-2024'
        },
        {
            borrowId: '12345',
            title: 'title2',
            cover: cover2,
            status: 'done',
            author: 'author2',
            borrowedDate: '12-08-2024',
            returnDate: '15-08-2024'
        },
        {
            borrowId: '12345',
            title: 'title2',
            cover: cover2,
            status: 'done',
            author: 'author2',
            borrowedDate: '12-08-2024',
            returnDate: '15-08-2024'
        },
    ]
}
</script>

<style scoped>
::-webkit-scrollbar {
    width: 0px;
}
</style>