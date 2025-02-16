<template>
  <!-- <header class="border border-red-600 h-16">navbar</header> -->
  <header><NavbarUser /></header>
  <main class="flex flex-col gap-y-2 mt-2">
    <slot name="content" />
  </main>
  <footer><FooterUser /></footer>
</template>

<script setup>
import NavbarUser from "@/components/sections/NavbarUser.vue";
import FooterUser from "@/components/sections/FooterUser.vue";
</script>
