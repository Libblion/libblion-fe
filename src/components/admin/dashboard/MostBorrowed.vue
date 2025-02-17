<template>
    <div class="flex flex-col justify-evenly lg:justify-between rounded-md gap-y-4 max-sm:max-h-96 h-72 p-2 overflow-y-auto">
        <h1 class="text-2xl font-semibold">{{ mostBorrowed.name }}</h1>
      <div class="flex flex-col sm:flex-row w-full justify-evenly overflow-x-auto item max-h-64 gap-y-2">
        <div v-for="book in mostBorrowed.books" class="flex flex-row gap-x-4">
            <figure class="w-36 h-full">
                <img :src="book.cover" alt="cover-book">
            </figure>
            <div class="flex flex-col gap-3 text-sm">
                <h1 class="text-2xl font-bold">{{ book.title.length > 2 ? `${book.title.slice(0,5)}...` : book.title }}</h1>
                <h3 class="">By : {{ book.author }}</h3>
                <h4 class="text-[10px] text-amber-600">
                    <font-awesome-icon v-for="rate in book.rate" icon="fa-solid fa-star" class="mr-2" />
                </h4>
                <p class="text-xs w-36">{{ book.summary }}</p>
                <h5 class="font-bold">Borrowed : {{ book.borrow }}</h5>
            </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import cover1 from '@/assets/images/cover/cover8.png'
import cover2 from '@/assets/images/cover/cover10.png'
const mostBorrowed = {
    name: 'Most Borrowed Books',
    books: [
        {
            cover: cover1,
            title: 'title1',
            rate: 5,
            borrow: 100,
            author: 'author1',
            summary: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, accusantium.',
        },
        {
            cover: cover2,
            title: 'title2',
            rate: 4,
            borrow: 101,
            author: 'author2',
            summary: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, accusantium.',
        },
        {
            cover: cover2,
            title: 'title2',
            rate: 4,
            borrow: 101,
            author: 'author2',
            summary: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, accusantium.',
        },
    ]
}
</script>

<style scoped>
::-webkit-scrollbar{
    height: 0px;
    width: 0px;
}
</style>