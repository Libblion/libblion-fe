<template>

  <section>
    <h1 class="text-3xl mb-6 font-bold">Analytics</h1>
  </section>

  <section class="grid grid-cols-2 grid-flow-row gap-2 mb-4 lg:grid-cols-4">
    <div class="grid grid-cols-2 lg:grid-cols-[160px_1fr] sm:h-24 bg-night-purple rounded-md box-border p-2 text-white" v-for="data in dummyDataInfo">
      <div class="flex flex-col justify-around pl-1">
        <h1 class="sm:text-lg">{{ data.name }}</h1>
        <h2 class="font-bold text-2xl sm:text-3xl" :class="data.textColor">{{ data.total }}</h2>
      </div>
      <div class="flex justify-center items-center text-4xl sm:text-4xl  text-purple-tint">
        <font-awesome-icon :icon="data.icon"/>
      </div>
    </div>
  </section>

  <section class="grid grid-flow-row gap-5 w-full lg:grid-cols-5 z-0">
    <!-- fine money -->
    <FineMoney class="lg:col-span-2 bg-night-purple text-white"/>
    <!-- most borrowed -->
    <MostBorrowed class="lg:col-span-2 bg-night-purple text-white"/>
    <!-- list borrowed books -->
    <BorrowedBook class="bg-night-purple text-white"/>
    <!-- list overdue loan -->
    <OverdueBook class="lg:col-span-3 bg-night-purple text-white"/>
    <!-- list history borrowed -->
    <HistoryBookLoan class="lg:col-span-2 bg-night-purple text-white"/>
  </section>
</template>

<script setup>

import FineMoney from '@/components/admin/dashboard/FineMoney.vue';
import MostBorrowed from '@/components/admin/dashboard/MostBorrowed.vue';
import BorrowedBook from '@/components/admin/dashboard/BorrowedBook.vue';
import OverdueBook from '@/components/admin/dashboard/OverdueBook.vue';
import HistoryBookLoan from '@/components/admin/dashboard/HistoryBookLoan.vue';

const dummyDataInfo = [
  {
    name: 'Borrowed',
    total: 1999,
    icon: 'fa-solid fa-book-bookmark',
    textColor : 'text-yellow-tint'
  },
  {
    name: 'Overdue',
    total: 200,
    icon: 'fa-solid fa-user-clock',
    textColor : 'text-indigo-tint'
  },
  {
    name: 'Visitors',
    total: 3065,
    icon: 'fa-solid fa-users-rays',
    textColor : 'text-pink-tint'
  },
  {
    name: 'New Member',
    total: 105,
    icon: 'fa-solid fa-user-plus',
    textColor : 'text-blue-tint'
  },
]

</script>