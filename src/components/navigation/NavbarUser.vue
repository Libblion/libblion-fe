<template>
  <nav class="flex flex-row justify-between items-center py-4 px-8 shadow-md bg-white relative">
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
      <RouterLink to="#" v-if="!isLogged">Categories</RouterLink>
      <RouterLink to="#">About Us</RouterLink>
    </div>

    <!-- Search and Login Section -->
    <div class="flex items-center space-x-6 mt-2 md:mt-0">
      
      <div class="h-10 w-0.5 bg-black hidden md:block" v-if="!isLogged"></div>

      <router-link
        to="/profile"
        v-if="stores.currentUser"
        :class="[
          'bg-black text-white font-poppins px-4 py-2 rounded',
          stores.currentUser
            ? 'cursor-pointer'
            : 'cursor-not-allowed pointer-events-none',
        ]"
      >
        <font-awesome-icon icon="fa-solid fa-user" />
      </router-link>

      <router-link
        to="/sign-in"
        v-if="!stores.currentUser"
        class="bg-black text-white font-poppins px-4 py-2 rounded cursor-pointer"
      >
        Login
      </router-link>

      <button v-else @click="handleLogout" class="bg-black text-white font-poppins px-4 py-2 rounded cursor-pointer">
        Logout
      </button>
    </div>

    <!-- Mobile Menu -->
    <div v-if="menuOpen" class="absolute top-16 left-0 w-full bg-white shadow-md md:hidden z-20"
      @click.outside="menuOpen = false">
      <div class="flex flex-col items-center space-y-4 py-4 text-lg font-poppins">
        <RouterLink to="/books">Books</RouterLink>
        <RouterLink to="#" v-if="!isLogged">Categories</RouterLink>
        <RouterLink to="#">About Us</RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { useCategoryStore } from "@/stores/categoryStore";
import { storeToRefs } from "pinia";
import { ref, onMounted, onUnmounted} from "vue";
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

const { isLogged } = storeToRefs(stores);

const categories = useCategoryStore();
const getCategories = async () => {
  try {
    const response = await categories.getCategories();
  } catch (error) {}
};

onMounted(() => {
  getCategories();
  document.addEventListener("click", closeMenu);
});

onUnmounted(() => {
  document.removeEventListener("click", closeMenu);
});
</script>
