<template>
    <nav class="flex justify-between items-center py-4 px-8 shadow-md bg-white">
        <router-link to="/" class="text-2xl font-bold font-libre-text">
            Libblion
        </router-link>
        <div class="flex space-x-6 text-lg font-poppins">
            <a href="#" class="hover:underline">Books</a>
            <a href="#" class="hover:underline">Categories</a>
            <a href="#" class="hover:underline">About Us</a>
        </div>
        <div class="flex items-center space-x-4">
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
            <div class="h-10 w-0.5 bg-black"></div>
            <button
                class="bg-black text-white font-poppins px-4 py-2 rounded cursor-pointer"
            >
                Login
            </button>
        </div>
    </nav>
</template>

<script setup></script>
