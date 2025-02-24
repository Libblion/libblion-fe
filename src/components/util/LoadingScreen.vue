<!-- src/components/LoadingScreen.vue -->
<template>
    <div v-if="loadingStore.isLoading" class="fixed z-50 h-screen w-screen bg-white flex justify-center items-center">
        <video autoplay loop muted>
            <source :src="loadingScreenVid" type="video/webm"/>
        </video>
    </div>
  </template>
  
  <script setup>
  import { useLoadingStore } from "@/stores/loadingStore";
  import loadingScreenVid from '@/assets/video/loading.webm'
  const loadingStore = useLoadingStore();
  
  </script>