<template>
    <header class="dark:bg-gray-950">
        <NavbarUser />
        <div
            class="flex gap-x-1 z-0 p-4 text-black dark:text-white justify-end"
        >
            <span>Light</span>
            <div class="flex items-center rounded-full">
                <label
                    for="darkMode"
                    class="block w-10 h-5 bg-gray-300 dark:bg-slate-950 rounded-full cursor-pointer relative"
                >
                    <input
                        type="checkbox"
                        id="darkMode"
                        class="peer hidden"
                        v-model="isDarkMode"
                        @change="setTheme"
                    />
                    <div
                        class="w-full h-full rounded-full peer-checked:bg-slate-800"
                    ></div>
                    <div
                        class="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-slate-400 rounded-full transition-transform peer-checked:translate-x-6 peer-checked:bg-yellow-500"
                    ></div>
                </label>
            </div>
            <span>Dark</span>
        </div>
    </header>
    <main class="flex flex-col gap-y-2 dark:bg-gray-950 dark:text-white">
        <slot name="content" />
    </main>
    <footer class="dark:bg-gray-950">
        <FooterUser />
    </footer>
</template>

<script setup>
import NavbarUser from "@/components/navigation/NavbarUser.vue";
import FooterUser from "@/components/sections/FooterUser.vue";
import { useStore } from "@/stores/util";
import { computed } from "vue";
const util = useStore();
const isDarkMode = computed({
    get: () => util.theme === "dark",
    set: (value) => {
        util.setTheme();
    },
});
</script>
