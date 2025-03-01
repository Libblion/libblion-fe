<template>
    <section class="container mx-auto font-poppins">
        <!-- Bagian Pencarian di luar kotak utama -->
        <div class="flex flex-col mt-10 mb-8">
            <div class="flex items-center justify-between">
                <div class="flex-grow mr-4">
                    <SearchBar
                        placeholder="Search category here..."
                        @search="handleSearch"
                    />
                </div>
                <button
                    @click="openCreateModal"
                    class="bg-yellow-500 hover:bg-yellow-600 text-[#0b1220] px-4 py-2 rounded-lg cursor-pointer transition-colors"
                >
                    Add Category
                </button>
            </div>
        </div>

        <div class="bg-[#0b1220] rounded-xl p-6">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-3xl font-bold text-white">Category Table</h1>
            </div>

            <div class="w-full overflow-x-auto">
                <EasyDataTable
                    :headers="headers"
                    :items="formattedCategories"
                    :rows-per-page="10"
                    theme-color="#1d90ff"
                    table-class-name="customize-table"
                    header-text-direction="center"
                    body-text-direction="center"
                >
                    <template #loading>
                        <img
                            src="https://i.pinimg.com/originals/94/fd/2b/94fd2bf50097ade743220761f41693d5.gif"
                            style="width: 100px; height: 80px"
                        />
                    </template>
                    <template #item-actions="props">
                        <div class="flex gap-3 justify-center">
                            <button
                                @click="openEditModal(props)"
                                class="bg-purple-500 hover:bg-purple-600 p-2 rounded-lg text-white cursor-pointer transition-colors"
                            >
                                <font-awesome-icon icon="fa-solid fa-pencil" />
                            </button>
                            <button
                                @click="openModalDelete(props.id)"
                                class="bg-purple-500 hover:bg-purple-600 p-2 rounded-lg text-white cursor-pointer transition-colors"
                            >
                                <font-awesome-icon icon="fa-solid fa-trash" />
                            </button>
                        </div>
                    </template>
                </EasyDataTable>
            </div>
        </div>

        <div
            v-if="isOpenModalDelete"
            class="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm"
        >
            <div class="bg-white p-6 rounded-lg shadow-lg w-96">
                <div class="text-center">
                    <font-awesome-icon
                        icon="fa-solid fa-circle-exclamation"
                        class="text-yellow-400 text-5xl"
                    />
                </div>

                <h2 class="text-gray-600 mt-2 text-center">
                    Are you sure you want to delete this category?
                </h2>

                <div class="mt-4 flex justify-end space-x-3">
                    <button
                        class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                        @click="handleDelete"
                    >
                        Yes, I'm sure
                    </button>
                    <button
                        @click="closeModalDelete"
                        class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
                    >
                        No, Cancel
                    </button>
                </div>
            </div>
        </div>

        <ModalCategory ref="modalRef" @refresh="refreshCategories" />
    </section>
</template>

<script setup>
import { ref, onMounted, provide, computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useCategoryStore } from "@/stores/categoryStore";
import { useLoadingStore } from "@/stores/loadingStore";
import { api } from "@/services/api";
import { toast } from "vue3-toastify";
import ModalCategory from "../../components/modal/ModalCategory.vue";
import SearchBar from "@/components/admin/SearchBar.vue";

const headers = [
    { text: "No.", value: "index" },
    { text: "Category", value: "name" },
    { text: "Actions", value: "actions" },
];

const stores = useAuthStore();
const categories = useCategoryStore();
const loadingStore = useLoadingStore();
const modalRef = ref(null);

const isOpenModalDelete = ref(false);
const selectedCategoryId = ref(null);

const searchTerm = ref("");
const allCategories = ref([]);

const formatCategoryData = (categoryData) => {
    if (categoryData && Array.isArray(categoryData)) {
        return categoryData.map((category, index) => ({
            ...category,
            index: index + 1,
        }));
    }
    return [];
};

const formattedCategories = computed(() => {
    return formatCategoryData(categories.categories);
});

const handleSearch = async (query, noLoading = false) => {
    if (!noLoading) {
        loadingStore.start();
    }

    try {
        await categories.searchCategories(query, noLoading);
    } catch (error) {
        console.error("Error searching categories:", error);
    } finally {
        if (!noLoading) {
            loadingStore.stop();
        }
    }
};

const fetchCategories = async () => {
    loadingStore.start();
    try {
        await categories.getCategories();
        allCategories.value = [...categories.categories];
    } catch (error) {
        console.error("Error fetching categories:", error);
    } finally {
        loadingStore.stop();
    }
};

const handleDelete = async () => {
    try {
        await api.delete(
            `/categories/${selectedCategoryId.value}?_method=DELETE`,
            {
                headers: {
                    Authorization: `Bearer ${stores.token}`,
                },
            }
        );
        toast.success("Category deleted successfully");
        closeModalDelete();
        await fetchCategories();
    } catch (error) {
        console.error(error);
        toast.error("Failed to delete category");
        closeModalDelete();
    }
};

const refreshCategories = async () => {
    await fetchCategories();
};

const openCreateModal = () => {
    modalRef.value.openModal();
};

const openEditModal = (item) => {
    modalRef.value.openModal(item);
};

const openModalDelete = (id) => {
    console.log(id);
    isOpenModalDelete.value = true;
    selectedCategoryId.value = id;
};

const closeModalDelete = () => {
    isOpenModalDelete.value = false;
};

provide("openCreateModal", openCreateModal);

onMounted(() => {
    fetchCategories();
});
</script>

<style>
/* Styling Custom EasyDataTable */
.customize-table {
    --easy-table-border: 1px solid #0b1220;
    --easy-table-row-border: 1px solid #0b1220;
    border-radius: 5px;

    --easy-table-header-font-size: 16px;
    --easy-table-header-height: 50px;
    --easy-table-header-font-color: #ffffff;
    --easy-table-header-background-color: #0b1220;
    --easy-table-header-item-padding: 14px 18px;

    --easy-table-body-even-row-font-color: #ffffff;
    --easy-table-body-even-row-background-color: #0b1220;

    --easy-table-body-row-font-color: #ffffff;
    --easy-table-body-row-background-color: #0b1220;
    --easy-table-body-row-height: 55px;
    --easy-table-body-row-font-size: 15px;

    --easy-table-body-row-hover-font-color: #ffffff;
    --easy-table-body-row-hover-background-color: #2a4365;
    --easy-table-body-row-hover-transition: all 0.3s ease-in-out;

    --easy-table-body-item-padding: 14px 18px;

    --easy-table-footer-background-color: #0b1220;
    --easy-table-footer-font-color: #ffffff;
    --easy-table-footer-font-size: 14px;
    --easy-table-footer-padding: 6px 18px;
    --easy-table-footer-height: 50px;

    --easy-table-scrollbar-track-color: #0b1220;
    --easy-table-scrollbar-color: #0b1220;
    --easy-table-scrollbar-thumb-color: #2d3748;
    --easy-table-scrollbar-corner-color: #0b1220;

    --easy-table-loading-mask-background-color: rgba(11, 18, 32, 0.9);
}
</style>
