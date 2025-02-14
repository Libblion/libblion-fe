<template>
   <section class="border md:p-10 p-4 flex items-center flex-col justify-center font-libre-text gap-2">
      <h1 class="font-semibold text-lg w-full">Offers</h1>
      <div class="flex flex-row justify-around gap-x-2 items-center h-full w-full max-sm:text-xs">
         <div class="flex flex-col gap-y-5 items-center">
            <figure class="max-w-64 max-h-90 rounded-t-full grid grid-cols-2 grid-rows-2 overflow-hidden">
               <img :src="cover1" alt="cover-image" loading="lazy">
               <img :src="cover2" alt="cover-image" loading="lazy">
               <img :src="cover3" alt="cover-image" loading="lazy">
               <img :src="cover4" alt="cover-image" loading="lazy">
            </figure>
            <p>Available for loan for 1 month</p>
         </div>
         <div class="flex flex-col gap-y-5 items-center" >
            <figure class="max-w-64 max-h-90 rounded-b-full grid grid-cols-2 grid-rows-2 overflow-hidden">
               <img :src="cover5" alt="cover-image" loading="lazy">
               <img :src="cover6" alt="cover-image" loading="lazy">
               <img :src="cover7" alt="cover-image" loading="lazy">
               <img :src="cover8" alt="cover-image" loading="lazy">
            </figure>
            <p>Available for loan for 2 month</p>
         </div>
         <div class="flex flex-col gap-y-5 items-center">
            <figure class="max-w-64 max-h-90 rounded-t-full grid grid-cols-2 grid-rows-2 overflow-hidden">
               <img :src="cover9" alt="cover-image" loading="lazy">
               <img :src="cover10" alt="cover-image" loading="lazy">
               <img :src="cover11" alt="cover-image" loading="lazy">
               <img :src="cover12" alt="cover-image" loading="lazy">
            </figure>
            <p>Available for loan for 42 days</p>
         </div>
      </div>
      <div class="text-center mt-10">
         <button class="p-2 px-10 border cursor-pointer hover:bg-slate-100 transition-colors">
            See all
         </button>
      </div>
   </section>
</template>

<script setup>
import cover1 from '../../assets/images/cover/Cover1.png'
import cover2 from '../../assets/images/cover/Cover2.jpg'
import cover3 from '../../assets/images/cover/Cover3.jpg'
import cover4 from '../../assets/images/cover/Cover4.jpg'
import cover5 from '../../assets/images/cover/Cover5.jpg'
import cover6 from '../../assets/images/cover/Cover6.jpg'
import cover7 from '../../assets/images/cover/Cover7.jpg'
import cover8 from '../../assets/images/cover/Cover8.png'
import cover9 from '../../assets/images/cover/Cover9.png'
import cover10 from '../../assets/images/cover/Cover10.png'
import cover11 from '../../assets/images/cover/Cover11.png'
import cover12 from '../../assets/images/cover/Cover12.png'
</script>