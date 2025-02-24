<template>
  <ModalFormBorrow/>
  <MainLayout>
    <template #content>
      <!-- Landing Page -->
      <LandingPage />
      <!-- Recommended book content -->
      <RecomendedBook/>
      <!-- Mid hero -->
      <MidHero />
      <!-- Offer books-->
      <OfferBooks />
      <!-- Top 10 most borrowed books -->
      <BorrowedBooks />
    </template>
  </MainLayout>
</template>

<script setup>
import MainLayout from "@/layouts/MainLayout.vue";
import LandingPage from "@/components/sections/LandingPage.vue";
import RecomendedBook from "@/components/sections/RecomendedBook.vue";
import BorrowedBooks from "@/components/sections/BorrowedBooks.vue";
import MidHero from "@/components/sections/MidHero.vue";
import OfferBooks from "@/components/sections/OfferBooks.vue";

import { useStore } from "@/stores/util";
import { onMounted,ref } from "vue";
import ModalFormBorrow from "@/components/modal/ModalFormBorrow.vue";

const store = useStore();

onMounted(() => {
  
});
</script>
