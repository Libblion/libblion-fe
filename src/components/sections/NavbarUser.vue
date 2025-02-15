<template>
    <nav
        class="flex flex-col md:flex-row justify-between items-center py-4 px-8 shadow-md bg-white relative"
    >
        <div class="flex items-center w-full md:w-auto">
            <!-- Mobile Menu Button -->
            <button @click="toggleMenu" class="md:hidden text-2xl mr-4">
                <font-awesome-icon :icon="['fas', 'bars']" />
            </button>
            <router-link to="/" class="text-2xl font-bold font-libre-text">
                Libblion
            </router-link>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex space-x-6 text-lg font-poppins">
            <a href="#" class="hover:underline">Books</a>
            <a href="#" class="hover:underline">Categories</a>
            <a href="#" class="hover:underline">About Us</a>
        </div>

        <!-- Search and Login Section -->
        <div class="flex items-center space-x-6 mt-2 md:mt-0">
            <div class="relative flex items-center border-b border-black w-64">
                <span class="text-black px-3">
                    <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
                </span>
                <input
                    type="text"
                    placeholder="Search book..."
                    class="px-3 py-2 focus:outline-none w-full font-libre-text"
                />
            </div>
            <div class="h-10 w-0.5 bg-black hidden md:block"></div>
            <button
                class="bg-black text-white font-poppins px-4 py-2 rounded cursor-pointer"
            >
                Login
            </button>
        </div>

        <!-- Mobile Menu -->
        <div
            v-if="menuOpen"
            class="absolute top-16 left-0 w-full bg-white shadow-md md:hidden"
            @click.outside="menuOpen = false"
        >
            <div
                class="flex flex-col items-center space-y-4 py-4 text-lg font-poppins"
            >
                <a href="#" class="hover:underline">Books</a>
                <a href="#" class="hover:underline">Categories</a>
                <a href="#" class="hover:underline">About Us</a>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
const menuOpen = ref(false);

const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
};

const closeMenu = (event) => {
    if (!event.target.closest("nav")) {
        menuOpen.value = false;
    }
};

onMounted(() => {
    document.addEventListener("click", closeMenu);
});

onUnmounted(() => {
    document.removeEventListener("click", closeMenu);
});
</script>
