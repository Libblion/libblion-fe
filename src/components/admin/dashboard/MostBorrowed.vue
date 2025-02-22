<template>
    <div class="flex flex-col justify-evenly lg:justify-between rounded-md gap-y-4 max-sm:max-h-96 h-72 p-2 overflow-y-auto">
        <h1 class="text-2xl font-semibold">Most Borrowed Books</h1>
      <div class="flex flex-col sm:flex-row w-full justify-evenly overflow-x-auto item max-h-64 gap-y-2">
        <div v-for="book in books" class="flex flex-row gap-x-4">
            <figure class="w-36 h-full">
                <img :src="cover1" alt="cover-book">
            </figure>
            <div class="flex flex-col gap-3 text-sm">
                <h1 class="text-2xl font-bold">{{ book.title.length > 2 ? `${book.title.slice(0,5)}...` : book.title }}</h1>
                <h3 class="">By : {{`${ book.author.first_name} ${ book.author.last_name}` }}</h3>
                <h4 class="text-[10px] text-amber-600">
                    <font-awesome-icon v-for="rate in book.rate" icon="fa-solid fa-star" class="mr-2" />
                </h4>
                <p class="text-xs w-36">{{ book.description }}</p>
                <h5 class="font-bold">Borrowed : {{ book.borrowings_count }}</h5>
            </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import cover1 from '@/assets/images/cover/cover8.png'
import cover2 from '@/assets/images/cover/cover10.png'
import { bookStore } from '@/stores/bookStore';
import { onMounted,ref } from 'vue';

const books = ref([])

const borrowStore = bookStore()
const mostBorrowedBook = async ()=>{
    try {
        const response = await borrowStore.getRecommendedBooks()
        console.log(response.data);
        books.value = response.data.most_borrowed_books
    } catch (error) {
        console.log(error);
        
    }
}

onMounted(async ()=>{
    await mostBorrowedBook()
})
</script>

<style scoped>
::-webkit-scrollbar{
    height: 0px;
    width: 0px;
}
</style>