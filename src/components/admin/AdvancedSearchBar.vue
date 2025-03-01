<template>
    <div class="w-full relative">
        <div class="flex flex-row gap-3">
            <!-- Search Input -->
            <div class="flex-grow">
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

            <!-- Toggle Filters Button -->
            <button
                v-if="filters && filters.length > 0"
                @click="showFilters = !showFilters"
                class="flex-shrink-0 bg-[#3b5998] hover:bg-[#2d4373] text-white px-4 py-2 rounded-lg cursor-pointer transition-colors"
            >
                <font-awesome-icon
                    :icon="
                        showFilters
                            ? 'fa-solid fa-filter-circle-xmark'
                            : 'fa-solid fa-filter'
                    "
                />
                <span class="ml-2">Filter</span>
            </button>
        </div>

        <!-- Filter Dropdown - Positioned absolutely below the search bar -->
        <div
            v-if="showFilters"
            class="absolute left-0 right-0 mt-2 z-10 flex flex-wrap gap-2 bg-white p-3 rounded-lg border border-gray-200 shadow-md"
        >
            <select
                v-for="(filter, index) in filters"
                :key="index"
                v-model="selectedFilters[filter.key]"
                class="bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                @change="handleSearch"
            >
                <option value="">{{ filter.label }}</option>
                <option
                    v-for="option in filter.options"
                    :key="option.value"
                    :value="option.value"
                >
                    {{ option.label }}
                </option>
            </select>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, reactive } from "vue";

const props = defineProps({
    placeholder: {
        type: String,
        default: "Search...",
    },
    delay: {
        type: Number,
        default: 300,
    },
    filters: {
        type: Array,
        default: () => [],
        // Format: [{ key: 'category', label: 'Category', options: [{ value: '1', label: 'Fiction' }] }]
    },
});

const emit = defineEmits(["search"]);

const searchQuery = ref("");
const showFilters = ref(false);
const selectedFilters = reactive({});
let debounceTimeout = null;

// Initialize selectedFilters with empty values
props.filters.forEach((filter) => {
    selectedFilters[filter.key] = "";
});

const handleSearch = () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        const searchParams = {
            query: searchQuery.value,
            filters: { ...selectedFilters },
            noLoading: true,
        };
        emit("search", searchParams);
    }, props.delay);
};

const clearSearch = () => {
    searchQuery.value = "";
    Object.keys(selectedFilters).forEach((key) => {
        selectedFilters[key] = "";
    });
    emit("search", {
        query: "",
        filters: { ...selectedFilters },
        noLoading: true,
    });
};

// Expose methods to parent component
defineExpose({
    clearSearch,
    setSearchQuery: (query) => {
        searchQuery.value = query;
    },
    setFilters: (filters) => {
        Object.keys(filters).forEach((key) => {
            if (key in selectedFilters) {
                selectedFilters[key] = filters[key];
            }
        });
    },
});
</script>
