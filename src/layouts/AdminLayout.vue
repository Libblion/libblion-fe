<template>
  <main class="h-full grid grid-cols-1 lg:grid-cols-[250px_1fr] grid-rows-[60px_auto] lg:gap-x-12 lg:pr-12">
    <!-- Header -->
    <header class="row-start-1 col-span-1 lg:col-start-2">
      <NavbarAdmin @show-sidebar="showSidebar" :is-sidebar="isSidebar" />
    </header>

    <!-- Sidebar hanya tampil di layar lg ke atas -->
    <aside :class="showClassSidebar"
      class=" col-start-1 lg:block row-start-1 lg:col-start-1 lg:sticky lg:top-0 h-screen bg-night-green transition-all duration-300 max-lg:fixed z-50">
      <SidebarAdmin />
    </aside>


    <!-- Konten utama -->
    <section class="row-start-2 col-span-1 lg:col-start-2 min-h-screen max-lg:px-5 font-poppin">
      <header class="flex flex-row gap-x-2 items-center">
        <div class="w-full">
          <label for="search" class="relative">
            <input type="text" id="search" placeholder="search here..." class="border rounded-full h-10 pl-5 w-full">
            <button class="absolute top-0 right-4">
              <font-awesome-icon icon="fa-solid fa-xmark" />
            </button>
          </label>
        </div>
        <button class="w-16 border h-8 rounded-md bg-indigo-600 text-xs text-white">Filter</button>
        <button class="w-24 border h-8 rounded-md bg-blue-600 text-xs text-white">Add Book</button>
      </header>

      <main class="mt-4">
        <router-view />
      </main>

    </section>
  </main>
</template>

<script setup>
import NavbarAdmin from '@/components/navigation/NavbarAdmin.vue';
import SidebarAdmin from '@/components/navigation/SidebarAdmin.vue';
import { ref } from 'vue';

const isSidebar = ref(false)

const showClassSidebar = ref(' max-lg:-translate-x-full')

const showSidebar = (data) => {
  isSidebar.value = !data

  if (isSidebar.value) {
    showClassSidebar.value = "max-lg:translate-x-0"
  }
  else {
    showClassSidebar.value = "max-lg:-translate-x-full"
  }
}
</script>
