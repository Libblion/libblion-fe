<template>
    <div class="overflow-y-auto rounded-md p-2 flex flex-col gap-y-4 max-sm:max-h-96 h-72">
        <h1 class="text-2xl font-semibold">Borrowed Books</h1>
        <div class="flex sm:flex-row w-full justify-evenly flex-col lg:flex-col gap-y-2 gap-x-4 max-md:overflow-y-hidden">
            <div v-for="book in books" class="flex flex-row gap-x-2 lg:h-40">
                <figure class="w-36 lg:w-20">
                    <img :src="cover2" alt="cover-book" class="">
                </figure>
                <div class="flex flex-col gap-2 text-sm">
                    <div class="flex flex-col gap-y-1">
                        <h1 class="text-lg font-bold lg:text-sm">
                            {{ book.book.title.length > 2 ? `${book.book.title.slice(0, 5)}...` : book.book.title }}</h1>
                        <h3 class="text-sm lg:text-xs">By : {{ book.book.author.first_name }}</h3>
                        <h4 class="text-sm lg:text-[8px]">
                            ID : {{ book.id }}
                        </h4>
                    </div>
                    <div class="flex flex-col gap-x-3 lg:text-[10px]">
                        <div>
                            <h1 class="font-bold text-indigo-700">Borrowed</h1>
                            <p class="text-xs lg:text-[8px]">{{ new Date(book.created_at).toDateString() }}</p>
                        </div>
                        <div>
                            <h1 class="font-bold text-green-600  lg:text-[10px]">Return</h1>
                            <p class="text-xs  lg:text-[8px]">
                                {{ book.return_date }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import cover1 from '@/assets/images/cover/Cover8.png'
import cover2 from '@/assets/images/cover/Cover10.png'
import { onMounted, ref } from 'vue';
import { api } from '@/services/api';
import { useAuthStore } from '@/stores/auth';

const books = ref([])
const auth = useAuthStore()
const borrowedBooks = async ()=>{
    const token = auth.token
    try {
    const response = await api.get('/borrow', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    books.value = response.data.data
    console.log(books.value);
    

  } catch (error) {
    console.log(error);

  }
}
onMounted(async () =>{
    await borrowedBooks()
})
</script>

<style scoped>
::-webkit-scrollbar {
    width: 0px;
}
</style>