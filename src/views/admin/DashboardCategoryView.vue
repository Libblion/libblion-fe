<template>
  <section class="container mx-auto font-poppins">
    <div class="bg-[#0b1220] rounded-xl p-6 mt-10">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-white">Category List</h1>
        <button
          @click="openCreateModal"
          class="bg-purple-500 hover:bg-purple-600 text-[#FFFFFF] px-4 py-2 rounded-lg cursor-pointer transition-colors"
        >
          Add Category
        </button>
      </div>

      <div class="w-full">
        <EasyDataTable
          :headers="headers"
          :items="categories.categories"
          :rows-per-page="10"
          theme-color="#1d90ff"
          table-class-name="customize-table"
          header-text-direction="center"
          body-text-direction="center"
          show-index
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

    <ModalCategory ref="modalRef" @refresh="categories.getCategories" />
  </section>
</template>

<script setup>
import { ref, onMounted, provide } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useCategoryStore } from "@/stores/categoryStore";
import { api } from "@/services/api";
import { toast } from "vue3-toastify";
import ModalCategory from "../../components/modal/ModalCategory.vue";

const headers = [
  { text: "Category", value: "name" },
  { text: "Actions", value: "actions" },
];

const stores = useAuthStore();
const categories = useCategoryStore();
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
