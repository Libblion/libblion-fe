<template>
    <div class="w-full">
        <div
            class="flex items-center bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200"
        >
            <div class="flex-grow flex items-center">
                <span class="pl-3 text-gray-500">
                    <font-awesome-icon icon="fa-solid fa-search" />
                </span>
                <input
                    v-model="searchQuery"
                    type="text"
                    :placeholder="placeholder"
                    class="w-full py-2 px-3 outline-none text-gray-700"
                    @input="handleSearch"
                />
            </div>
            <button
                v-if="searchQuery"
                @click="clearSearch"
                class="px-3 text-gray-500 hover:text-gray-700"
            >
                <font-awesome-icon icon="fa-solid fa-xmark" />
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
    placeholder: {
        type: String,
        default: "Search...",
    },
    delay: {
        type: Number,
        default: 300,
    },
});

const emit = defineEmits(["search"]);

const searchQuery = ref("");
let debounceTimeout = null;

const handleSearch = () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        emit("search", searchQuery.value, true);
    }, props.delay);
};

const clearSearch = () => {
    searchQuery.value = "";
    emit("search", "", true);
};

// Expose method to reset search from parent
defineExpose({
    clearSearch,
    setSearchQuery: (query) => {
        searchQuery.value = query;
    },
});
</script>
