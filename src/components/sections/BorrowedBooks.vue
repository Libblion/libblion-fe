<template>
  <section class="border min-h-80 md:p-10 p-4 font-libre-text">
    <h2 class="text-2xl font-bold mb-6 text-center sm:text-left">
      Top - 10 Most Borrowed Books
    </h2>

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
