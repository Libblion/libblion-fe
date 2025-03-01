<template>
    <main
        class="h-full grid grid-cols-1 lg:grid-cols-[250px_1fr] grid-rows-[60px_auto] lg:gap-x-12 lg:pr-12"
    >
        <!-- Header -->
        <header class="row-start-1 col-span-1 lg:col-start-2">
            <NavbarAdmin @show-sidebar="showSidebar" :is-sidebar="isSidebar" />
        </header>

        <!-- Sidebar hanya tampil di layar lg ke atas -->
        <aside
            :class="showClassSidebar"
            class="col-start-1 lg:block row-start-1 lg:col-start-1 lg:sticky lg:top-0 h-screen bg-night-green transition-all duration-300 max-lg:fixed z-50"
        >
            <SidebarAdmin />
        </aside>

        <!-- Konten utama -->
        <section
            class="row-start-2 col-span-1 lg:col-start-2 min-h-screen max-lg:px-5 font-poppin"
        >
            <main class="mt-4 mb4">
                <router-view />
            </main>
        </section>
    </main>
</template>

<script setup>
import NavbarAdmin from "@/components/navigation/NavbarAdmin.vue";
import SidebarAdmin from "@/components/navigation/SidebarAdmin.vue";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const isSidebar = ref(false);
const showClassSidebar = ref("max-lg:-translate-x-full");
const route = useRoute();

const showSidebar = (data) => {
    isSidebar.value = !data;

    if (isSidebar.value) {
        showClassSidebar.value = "max-lg:translate-x-0";
    } else {
        showClassSidebar.value = "max-lg:-translate-x-full";
    }
};

watch(route, () => {
    showClassSidebar.value = "max-lg:-translate-x-full";
    isSidebar.value = false;
});
</script>
