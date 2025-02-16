<template>
    <section class="h-screen grid grid-cols-[1fr_500px] max-lg:grid-cols-[1fr_200px] overflow-hidden font-libre-text bg-night-green text-white mt-10 max-lg:h-80">
        <div
            class="grid grid-cols-3 grid-rows-3 h-full -translate-y-64 rotate-12 origin-top-left max-lg:translate-x-8 max-lg:-translate-y-20">
            <div class="flex flex-col items-center h-fit" v-for="(cover, i) in images" :class="[
                i == 6 ? 'col-start-2' : '',i == 0 || i == 3 ? 'translate-y-32' : '', i == 2 || i == 5 || i == 7 ? '-translate-y-16 max-lg:-translate-y-20' : ''
            ]">
                <figure class="w-42 rounded-t-full overflow-hidden mt-4 max-lg:w-12">
                    <img :src="cover" alt="cover-image" class="h-full w-full object-cover">
                </figure>
                <p class="pl-14 max-lg:pl-2 w-full mt-2 max-lg:text-[10px]">Books</p>
                <p class="pl-14 max-lg:pl-2 w-full text-sm font-normal max-lg:text-[10px]">By Author</p>
            </div>
        </div>
        <div class="p-4 flex justify-center flex-col h-screen -translate-x-14 max-lg:translate-x-0 max-lg:h-80">
            <div class="flex justify-center flex-col border-r border-t p-10 max-lg:p-6">
                <h1 class="text-5xl font-bold text-center max-lg:text-sm">Libblion Books 2025</h1>
                <p class="text-sm text-center max-lg:text-[10px]">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis earum tempora iure
                    aspernatur laudantium ut doloribus facilis dolorum odit provident!</p>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import cover1 from '../../assets/images/cover/Cover1.png'
import cover2 from '../../assets/images/cover/Cover2.jpg'
import cover3 from '../../assets/images/cover/Cover3.jpg'
import cover4 from '../../assets/images/cover/Cover4.jpg'
import cover5 from '../../assets/images/cover/Cover5.jpg'
import cover6 from '../../assets/images/cover/Cover6.jpg'
import cover7 from '../../assets/images/cover/Cover7.jpg'
import cover8 from '../../assets/images/cover/Cover8.png'

const images = [cover1, cover2, cover3, cover4, cover5, cover6, cover7, cover8]
</script>