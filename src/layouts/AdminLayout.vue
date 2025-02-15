<template>
  <main class="h-full grid grid-cols-1 lg:grid-cols-[250px_1fr] grid-rows-[60px_auto] lg:gap-x-12 lg:pr-12">
    <!-- Header -->
    <header class="row-start-1 col-span-1 lg:col-start-2">
      <NavbarAdmin @show-sidebar="showSidebar" :is-sidebar="isSidebar"/>
    </header>

    <!-- Sidebar hanya tampil di layar lg ke atas -->
    <aside :class="showClassSidebar" class=" col-start-1 lg:block row-start-1 lg:col-start-1 lg:sticky lg:top-0 h-screen bg-night-green transition-all duration-300 max-lg:fixed">
      <SidebarAdmin/>
    </aside>

    <!-- Konten utama -->
    <section class="row-start-2 col-span-1 lg:col-start-2 h-screen border max-lg:px-5">
      <router-view />
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
  else{
    showClassSidebar.value = "max-lg:-translate-x-full"
  }
}
</script>
