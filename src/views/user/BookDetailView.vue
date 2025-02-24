<template>
  <MainLayout>
    <template #content>
      <div class="p-6">
        <div v-if="bookDetail" class="bg-white shadow-lg rounded-lg p-4 dark:!bg-red-900">
          <div class="flex flex-col md:flex-row">
            <img
              :src="bookDetail.cover_image"
              alt="Book Cover"
              class="w-100 md:w-40 rounded-lg shadow-md"
            />
            <div class="ml-4 flex-1">
              <h2 class="text-2xl font-bold">{{ bookDetail.title }}</h2>
              <p class="text-gray-600 dark:text-gray-100">
                By: {{ bookDetail.author?.first_name }}
                {{ bookDetail.author?.last_name }}
              </p>
              <div class="flex items-center text-yellow-500 mt-2">
                <span class="text-lg">⭐ {{ averageRating }}</span>
                <span class="text-gray-500 ml-2 dark:text-gray-100">
                  | {{ bookDetail.reviews?.length || 0 }} Reviews |
                  {{ bookDetail.borrowings?.length || 0 }} Borrowed
                </span>
              </div>
              <p class="text-gray-500 mt-2 dark:text-gray-100">
                <strong>Category:</strong> {{ bookDetail.category?.name }}
              </p>
              <p class="text-gray-500 dark:text-gray-100">
                <strong>Release:</strong> {{ bookDetail.release_year }}
              </p>
              <p class="text-gray-700 mt-2 dark:text-gray-100">{{ bookDetail.description }}</p>
              <button class="mt-4 bg-black text-white px-4 py-2 rounded-lg">
                Borrow
              </button>
            </div>
          </div>
        </div>
        <div v-else class="text-center text-gray-500">
          Loading book details...
        </div>

        <div v-if="bookDetail?.reviews?.length" class="mt-6">
          <h3 class="text-xl font-semibold">Reviews</h3>
          <div
            v-for="review in bookDetail.reviews"
            :key="review.id"
            class="bg-gray-100 p-4 rounded-lg mt-4 dark:!bg-red-900 "
          >
            <p class="font-semibold">⭐ {{ review.rating }}</p>
            <p class="text-gray-600 dark:text-white mt-2">{{ review.comment }}</p>
          </div>
        </div>
      </div>
    </template>
  </MainLayout>
</template>

<script setup>
import { useBookCrudStore } from "@/stores/bookCrudStore";
import MainLayout from "@/layouts/MainLayout.vue";
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const storeBooks = useBookCrudStore();
const bookDetail = ref(null);

// Hitung rata-rata rating
const averageRating = computed(() => {
  if (!bookDetail.value || !bookDetail.value.reviews?.length)
    return "No ratings";
  const total = bookDetail.value.reviews.reduce((sum, r) => sum + r.rating, 0);
  return (total / bookDetail.value.reviews.length).toFixed(1);
});

onMounted(async () => {
  const bookId = route.params.id;
  const res = await storeBooks.getDetailBook(bookId);
  bookDetail.value = res;
});
</script>
