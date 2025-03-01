<template>
    <div class="px-4 h-full text-white flex flex-col gap-y-20">
        <header class="mt-[60px]">
            <div
                class="dropdown-container w-full h-12 rounded-full bg-whit flex flex-row bg-white items-center gap-x-2 justify-between relative"
            >
                <figure class="w-12 h-full rounded-full overflow-hidden">
                    <img :src="profileImg" alt="profile-image" />
                </figure>
                <p class="text-black font-semibold">
                    {{
                        user.currentUser.username.length > 11
                            ? `${user.currentUser.username}...`
                            : user.currentUser.username
                    }}
                </p>
                <button
                    @click="toggleDropdown"
                    class="text-black w-12 h-full rounded-full cursor-pointer hover:bg-slate-50 transition-transform duration-300"
                    :class="{
                        '-rotate-45': !showDropdown,
                        'rotate-0': showDropdown,
                    }"
                >
                    <font-awesome-icon icon="fa-solid fa-sort-down" />
                </button>

                <!-- Dropdown Menu -->
                <transition name="dropdown">
                    <div
                        v-if="showDropdown"
                        class="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
                    >
                        <div class="py-1">
                            <button
                                @click="handleLogout"
                                class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 hover:cursor-pointer flex items-center"
                            >
                                <font-awesome-icon
                                    icon="fa-solid fa-sign-out-alt"
                                    class="mr-2"
                                />
                                Logout
                            </button>
                        </div>
                    </div>
                </transition>
            </div>
        </header>
        <main class="w-full flex flex-col justify-between h-full">
            <ul
                class="w-full flex flex-col gap-y-2 border-l px-2 border-white/30"
            >
                <RouterLink
                    v-for="menu in menus"
                    :to="menu.route"
                    activeClass="before:border-l before:absolute before:w-10 before:h-full before:-left-[9px] before:border-white text-white before:top-0 text-white"
                    class="hover:text-white/50 transition-colors duration-200 p-1 relative"
                >
                    <li class="w-full flex flex-row items-center gap-x-2 pl-2">
                        <font-awesome-icon :icon="menu.icon" />
                        <p>{{ menu.name }}</p>
                    </li>
                </RouterLink>
            </ul>
            <RouterLink
                to="/"
                class="border-b cursor-pointer mb-4 hover:text-white/50 transition-colors duration-200 text-center p-2"
            >
                <font-awesome-icon icon="fa-solid fa-house" class="mr-2" />
                <span>Home</span>
            </RouterLink>
        </main>
    </div>
</template>

<script setup>
import profileImg from "@/assets/images/profile/laravel.jpg";
import { useAuthStore } from "@/stores/auth";
import { ref, onMounted, onUnmounted } from "vue";
import { toast } from "vue3-toastify";
import router from "@/router";

const user = useAuthStore();
const showDropdown = ref(false);

const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value;
};

// Fungsi untuk menutup dropdown ketika user mengklik di luar dropdown
const closeDropdownOnClickOutside = (event) => {
    if (showDropdown.value && !event.target.closest(".dropdown-container")) {
        showDropdown.value = false;
    }
};

// Tambahkan event listener saat komponen dimount
onMounted(() => {
    document.addEventListener("click", closeDropdownOnClickOutside);
});

// Hapus event listener saat komponen diunmount
onUnmounted(() => {
    document.removeEventListener("click", closeDropdownOnClickOutside);
});

const handleLogout = async () => {
    try {
        // Menutup dropdown setelah klik
        showDropdown.value = false;

        console.log("Memulai proses logout...");

        // Memanggil API logout
        const data = await user.logout();

        console.log("Logout berhasil:", data);
        console.log(
            "State setelah logout:",
            user.token,
            user.currentUser,
            user.isLogged
        );

        // Tampilkan toast sukses
        toast.success(
            data.message ||
                "Logout berhasil! Terima kasih telah menggunakan aplikasi kami.",
            {
                autoClose: 2500, // Toast akan muncul selama 2.5 detik
                onClose: () => {
                    // Arahkan ke halaman login setelah toast hilang
                    console.log(
                        "Toast onClose terpicu, mengarahkan ke halaman sign-in..."
                    );
                    router.push("/sign-in");
                },
            }
        );

        // Tambahkan setTimeout sebagai cadangan jika event onClose tidak terpicu
        setTimeout(() => {
            console.log(
                "setTimeout terpicu, mengarahkan ke halaman sign-in..."
            );
            router.push("/sign-in");
        }, 3000); // Sedikit lebih lama dari autoClose untuk memastikan toast sudah hilang
    } catch (error) {
        console.error("Error during logout:", error);
        toast.error(
            error.response?.data?.error ||
                "Terjadi kesalahan saat logout. Silakan coba lagi."
        );
    }
};

const menus = [
    {
        name: "Dashboard",
        icon: "fa-solid fa-chart-column",
        route: "/admin/dashboard",
    },

    {
        name: "Borrow List",
        icon: "fa-solid fa-table-list",
        route: "/admin/borrowing-list",
    },

    {
        name: "Book",
        icon: "fa-solid fa-book",
        route: "/admin/book-list",
    },

    {
        name: "Author",
        icon: "fa-solid fa-user",
        route: "/admin/author-list",
    },

    {
        name: "Category",
        icon: "fa-solid fa-tags",
        route: "/admin/category",
    },
];
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
    transition: opacity 0.3s, transform 0.3s;
}

.dropdown-enter-from,
.dropdown-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>
