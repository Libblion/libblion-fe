<template>
  <MainLayout>
    <template #content>
      <div class="p-6">
        <div class="bg-white shadow-lg rounded-lg p-4">
          <div class="flex">
            <img
              :src="book.image"
              alt="Book Cover"
              class="w-40  rounded-lg shadow-md"
            />
            <div class="ml-4 flex-1">
              <h2 class="text-2xl font-bold">{{ book.title }}</h2>
              <p class="text-gray-600">By: {{ book.author }}</p>
              <div class="flex items-center text-yellow-500 mt-2">
                <span class="text-lg">⭐ {{ book.rating }}</span>
                <span class="text-gray-500 ml-2"
                  >| {{ book.reviews }} Reviews |
                  {{ book.borrowed }} Borrowed</span
                >
              </div>
              <p class="text-gray-500 mt-2">
                <strong>Category:</strong> {{ book.category }}
              </p>
              <p class="text-gray-500">
                <strong>Release:</strong> {{ book.release }}
              </p>
              <p class="text-gray-700 mt-2">{{ book.description }}</p>
              <button class="mt-4 bg-black text-white px-4 py-2 rounded-lg">
                Borrow
              </button>
            </div>
          </div>
        </div>
        <div class="mt-6">
          <h3 class="text-xl font-semibold">Reviews</h3>
          <div
            v-for="review in reviews"
            :key="review.id"
            class="bg-gray-100 p-4 rounded-lg mt-4"
          >
            <div class="flex items-center">
              <span class="bg-gray-300 w-10 h-10 rounded-full"></span>
              <p class="ml-3 font-semibold">
                {{ review.name }} | ⭐ {{ review.rating }}
              </p>
            </div>
            <p class="text-gray-600 mt-2">{{ review.comment }}</p>
          </div>
        </div>
      </div>
    </template>
  </MainLayout>
</template>
<script setup>
import { bookStore } from "@/stores/bookStore";
import MainLayout from "@/layouts/MainLayout.vue";
const storeBooks = bookStore();

import { reactive } from "vue";

// Ini Dummy mang
const book = reactive({
  image:
    "https://upload.wikimedia.org/wikipedia/id/8/8e/Laskar_pelangi_sampul.jpg", // Ganti dengan URL gambar asli
  title: "The Perks of Being a Wallflower",
  author: "Stephen Chbosky",
  rating: 5.0,
  reviews: 213,
  borrowed: 37,
  category: "Fiction",
  release: "2020",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
});

const reviews = reactive([
  {
    id: 1,
    name: "Anas Nasuha",
    rating: 5.0,
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  },
]);
</script>
