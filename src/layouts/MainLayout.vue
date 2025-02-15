<template>
    <!-- <header class="border border-red-600 h-16">navbar</header> -->
    <header><NavbarUser /></header>
    <main class="px-10 flex flex-col gap-y-2 mt-2">
        <slot name="content" />
    </main>
    <footer></footer>
</template>

<script setup>
import NavbarUser from "@/components/sections/NavbarUser.vue";
</script>
