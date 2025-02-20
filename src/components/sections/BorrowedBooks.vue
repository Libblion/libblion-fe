<template>
  <section class="min-h-80 md:p-10 px-10 max-sm:p-1 font-libre-text">
    <div class="flex flex-row justify-between px-1 items-center w-full mb-6">
      <h1 class="text-2xl font-bold max-sm:text-lg">Top - 10 Most Borrowed</h1>
      <RouterLink to="/books">
        <p class="hover:underline max-sm:text-sm">
          See all <font-awesome-icon icon="fa-solid fa-arrow-right" />
        </p>
      </RouterLink>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <CardMostBorrowed
        v-for="(book, index) in books"
        :key="index"
        :image="book.image"
        :bookName="book.bookName"
        :author="book.author"
        :rating="book.rating"
      />
    </div>
  </section>
</template>
<script setup>
import { ref } from "vue";
import CardMostBorrowed from "@/components/sections/CardMostBorrowed.vue";

const books = ref([
  {
    image:
      "https://i.pinimg.com/564x/cc/f1/74/ccf174731daa832bfc400ac2c602ef56.jpg",
    bookName: "The Spoke Xos",
    author: "Mang Galih",
    rating: 4,
  },
  {
    image:
      "https://i.pinimg.com/564x/cc/f1/74/ccf174731daa832bfc400ac2c602ef56.jpg",
    bookName: "Lost Horizon",
    author: "Mang Rahman",
    rating: 3,
  },
  {
    image:
      "https://i.pinimg.com/564x/cc/f1/74/ccf174731daa832bfc400ac2c602ef56.jpg",
    bookName: "React Js For Beginers",
    author: "Mang Najib",
    rating: 5,
  },
  {
    image:
      "https://i.pinimg.com/564x/cc/f1/74/ccf174731daa832bfc400ac2c602ef56.jpg",
    bookName: "Laravel Still The Best",
    author: "Mang Anas",
    rating: 4,
  },
]);
</script>
