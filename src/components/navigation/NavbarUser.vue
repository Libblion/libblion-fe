<template>
  <nav
    class="flex flex-row justify-between items-center py-4 px-2 md:px-8 shadow-md bg-white relative"
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
    <div
      class="hidden md:flex w-full text-lg font-poppins justify-evenly md:justify-center md:gap-x-20"
    >
      <RouterLink to="/books">Books</RouterLink>
      <RouterLink to="/about">About Us</RouterLink>
    </div>

    <!-- Search and Login Section -->
    <div class="flex items-center mt-2 md:mt-0 w-full justify-evenly max-w-52">
      <router-link
        to="/profile"
        v-if="stores.currentUser"
        class="p-2"
        :class="[
          'bg-black text-white font-poppins rounded',
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

      <button
        v-else
        @click="handleLogout"
        class="bg-black text-white font-poppins p-2 rounded cursor-pointer text-sm"
      >
        Logout
      </button>
      <RouterLink
        to="/admin/dashboard"
        v-if="
          currentUser &&
          (currentUser.role_id === 3 || currentUser.role_id === 2)
        "
        class="bg-red-900 text-white font-poppins p-2 rounded cursor-pointer text-sm"
      >
        admin
      </RouterLink>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="menuOpen"
      class="absolute top-16 left-0 w-full bg-white shadow-md md:hidden z-20"
      @click.outside="menuOpen = false"
    >
      <div
        class="flex flex-col items-center space-y-4 py-4 text-lg font-poppins"
      >
        <RouterLink to="/books">Books</RouterLink>
        <RouterLink to="/about">About Us</RouterLink>
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

const auth = useAuthStore();
const { currentUser } = storeToRefs(auth);

onMounted(() => {
  document.addEventListener("click", closeMenu);
});

onUnmounted(() => {
  document.removeEventListener("click", closeMenu);
});
</script>
