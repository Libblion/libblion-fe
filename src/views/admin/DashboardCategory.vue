<template>
  <section>
    <div class="flex justify-between">
      <h1 class="text-3xl mb-6 font-bold">Category</h1>

      <button
        @click="openCreateModal"
        class="w-24 border h-8 rounded-md bg-blue-600 text-xs text-white"
      >
        Add Category
      </button>
    </div>

    <div class="w-full">
      <EasyDataTable
        :headers="headers"
        :items="categories.categories"
        :rows-per-page="10"
        show-index
      >
        <template #loading>
          <img
            src="https://i.pinimg.com/originals/94/fd/2b/94fd2bf50097ade743220761f41693d5.gif"
            style="width: 100px; height: 80px"
          />
        </template>
        <template #item-actions="props">
          <button
            @click="openEditModal(props)"
            class="bg-yellow-500  hover:bg-yellow-600 transition text-white px-2 py-1 rounded mr-2"
          >
            <font-awesome-icon icon="fa-solid fa-pencil" /> Edit
          </button>
          <button
            @click="openModalDelete(props.id)"
            class="bg-red-500  hover:bg-red-600 transition text-white px-2 py-1 rounded"
          >
            <font-awesome-icon icon="fa-solid fa-trash" /> Delete
          </button>
        </template>
      </EasyDataTable>
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

    <ModalCategory ref="modalRef" @refresh="categories.getCategories" />
  </section>
</template>

<script setup>
import { ref, onMounted, provide } from "vue";
import { useAuthStore } from "@/stores/auth";
import { api } from "@/services/api";
import { toast } from "vue3-toastify";
import ModalCategory from "./ModalCategory.vue";

const stores = useAuthStore();
import { useCategoryStore } from "@/stores/categoryStore";
const categories = useCategoryStore();
const headers = [
  { text: "Category", value: "name" },
  { text: "Actions", value: "actions" },
];

const modalRef = ref(null);

const isOpenModalDelete = ref(false);
const selectedCategoryId = ref(null);

const handleDelete = async () => {
  try {
    await api.delete(`/categories/${selectedCategoryId.value}?_method=DELETE`, {
      headers: {
        Authorization: `Bearer ${stores.token}`,
      },
    });
    toast.success("Category deleted successfully");
    closeModalDelete();
    categories.getCategories();
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete category");
    closeModalDelete();
  }
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
  categories.getCategories();
});
</script>
