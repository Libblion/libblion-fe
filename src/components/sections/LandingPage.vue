<template>
    <section
        class="w-full min-h-[85vh] grid grid-cols-6 items-center md:px-16 px-6 font-libre-text gap-6"
    >
        <div class="col-span-2 space-y-6">
            <h2 class="text-5xl md:text-6xl font-bold">Find Your Next Book</h2>
            <p class="text-gray-600 text-lg">
                Commodo eiusmod id duis ad cillum ad exercitation magna eiusmod
                ullamco
            </p>
            <button
                class="bg-black cursor-pointer text-white px-6 py-3 text-lg rounded"
            >
                Explore Now
            </button>
        </div>
        <div class="col-span-4 flex justify-center gap-6">
            <div
                class="relative w-40 h-72 md:w-48 md:h-80 rounded-b-full overflow-hidden"
            >
                <img
                    :src="cover1"
                    alt="Darkness"
                    class="w-full h-full object-cover"
                />
                <div class="absolute top-0 w-full bg-white text-center py-3">
                    <p class="font-bold text-lg">Darkness</p>
                    <p class="text-sm">M. Khusyasy Najib D</p>
                </div>
            </div>
            <div
                class="relative w-40 h-72 md:w-48 md:h-80 rounded-t-full overflow-hidden"
            >
                <img
                    :src="cover2"
                    alt="Lightness"
                    class="w-full h-full object-cover"
                />
                <div class="absolute bottom-0 w-full bg-white text-center py-3">
                    <p class="text-sm">M. Khusyasy Najib D</p>
                    <p class="font-bold text-lg">Lightness</p>
                </div>
            </div>
            <div
                class="relative w-40 h-72 md:w-48 md:h-80 rounded-b-full overflow-hidden"
            >
                <img
                    :src="cover3"
                    alt="Grayness"
                    class="w-full h-full object-cover"
                />
                <div class="absolute top-0 w-full bg-white text-center py-3">
                    <p class="font-bold text-lg">Grayness</p>
                    <p class="text-sm">M. Khusyasy Najib D</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import cover1 from "../../assets/images/cover/Cover1.png";
import cover2 from "../../assets/images/cover/Cover2.jpg";
import cover3 from "../../assets/images/cover/Cover3.jpg";
</script>
