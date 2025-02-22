<template>
    <main class="h-screen w-screen flex justify-center items-center">
        <div class="flex flex-row gap-x-12 items-center max-md:flex-col">
            <div>
                <h1 class="text-8xl font-bold text-center font-libre-text max-md:text-2xl">404</h1>
                <h2 class="text-center text-2xl mt-2 max-md:text-lg">Page Not Found</h2>
                <RouterLink to="/">
                    <button class="w-60 h-12 mt-4 bg-indigo-800 text-center hover:bg-indigo-700 text-white duration-300 cursor-pointer rounded-md max-md:w-32 max-md:text-sm max-md:h-8">
                        <font-awesome-icon icon="fa-solid fa-arrow-left"/> <span>Back to home</span>
                    </button>
                </RouterLink>
            </div>
            <div>
                <DotLottieVue style="height: 400px; width: 100%;" autoplay loop
                    src="https://lottie.host/61151a8a-a660-4893-943e-9f240f96d65c/BDQ2w4Rzwg.lottie" />
            </div>
        </div>
    </main>
</template>

<script setup>
import { useLoadingStore } from '@/stores/loadingStore';
import { onMounted } from 'vue';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'


const loading = useLoadingStore()

onMounted(() => loading.stop())
</script>