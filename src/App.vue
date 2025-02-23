<template>
  <LoadingScreen />
  <RouterView/>
</template>

<script setup>
import LoadingScreen from './components/util/LoadingScreen.vue';
import { onMounted } from 'vue'
import { useStore } from "@/stores/util"

const util = useStore()

onMounted(() => {
  if (util.theme === "dark") {
    document.documentElement.classList.add("dark");
  }
})

</script>