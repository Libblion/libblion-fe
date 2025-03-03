<template>
  <section
    class="h-screen grid grid-cols-[1fr_500px] max-lg:grid-cols-[1fr_200px] overflow-hidden font-libre-text bg-night-green text-white mt-10 max-lg:h-80"
  >
    <div
      class="grid grid-cols-3 grid-rows-3 h-full -translate-y-64 rotate-12 origin-top-left max-lg:translate-x-8 max-lg:-translate-y-20"
    >
      <div
        class="flex flex-col items-center h-fit"
        v-for="(book, i) in limmitedBook"
        :class="[
          i == 6 ? 'col-start-2' : '',
          i == 0 || i == 3 ? 'translate-y-32' : '',
          i == 2 || i == 5 || i == 7
            ? '-translate-y-15 max-lg:-translate-y-20'
            : '',
        ]"
      >
        <figure class="w-42 rounded-t-full overflow-hidden mt-4 max-lg:w-12">
          <img
            :src="book.cover_image"
            alt="cover-image"
            class="h-full w-full object-cover"
          />
        </figure>
        <p class="pl-14 max-lg:pl-2 w-full mt-2 max-lg:text-[10px]">
          {{ book.title }}
        </p>
        <p
          class="pl-14 max-lg:pl-2 w-full text-sm font-normal max-lg:text-[10px]"
        >
          {{ book.author }}
        </p>
      </div>
    </div>
    <div
      class="p-4 flex justify-center flex-col h-screen -translate-x-14 max-lg:translate-x-0 max-lg:h-80"
    >
      <div
        class="flex justify-center flex-col border-r border-t p-10 max-lg:p-6"
      >
        <h1 class="text-5xl font-bold text-center max-lg:text-sm">
          Libblion Books 2025
        </h1>
        <p class="text-sm text-center max-lg:text-[10px]">
          Join our upcoming book collection for 2025. Featuring new releases,
          bestsellers, and classic literature from renowned authors around the
          world. Stay updated with our latest additions.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useBookCrudStore } from "@/stores/bookCrudStore";
const bookStore = useBookCrudStore();

const limmitedBook = computed(() => bookStore.books.data.slice(0, 7));
</script>
