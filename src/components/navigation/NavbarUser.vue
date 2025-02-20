<template>
  <nav
    class="flex flex-row justify-between items-center py-4 px-8 shadow-md bg-white relative"
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
      <RouterLink to="/books">Books</RouterLink>
      <RouterLink v-if="!isLogged">Categories</RouterLink>
      <RouterLink>About Us</RouterLink>
    </div>

    <!-- Search and Login Section -->
    <div class="flex items-center space-x-6 mt-2 md:mt-0">
      <div class="relative flex items-center border-b border-black w-64" v-if="!isLogged">
        <span class="text-black px-3">
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
        </span>
        <input
          type="text"
          placeholder="Search book..."
          class="px-3 py-2 focus:outline-none w-full font-libre-text"
        />
      </div>
      <div class="h-10 w-0.5 bg-black hidden md:block" v-if="!isLogged"></div>

      <router-link
        to="/sign-in"
        v-if="!stores.currentUser"
        class="bg-black text-white font-poppins px-4 py-2 rounded cursor-pointer"
      >
        Login
      </router-link>

      <button
        v-else
        @click="handleLogout"
        class="bg-black text-white font-poppins px-4 py-2 rounded cursor-pointer"
      >
        Logout
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
        <RouterLink to="/books">Books</RouterLink>
        <RouterLink v-if="!isLogged">Categories</RouterLink>
        <RouterLink>About Us</RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { ref, onMounted, onUnmounted } from "vue";
const menuOpen = ref(false);
const stores = useAuthStore();

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const handleLogout = async () => {
  await stores.logout();
};
const closeMenu = (event) => {
  if (!event.target.closest("nav")) {
    menuOpen.value = false;
  }
};

const {isLogged} = storeToRefs(stores)

onMounted(()=>{
  isLogged.value = true
})


onMounted(() => {
  document.addEventListener("click", closeMenu);
});

onUnmounted(() => {
  document.removeEventListener("click", closeMenu);
});
</script>
