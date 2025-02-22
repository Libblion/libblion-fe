<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center backdrop-blur-sm"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
      <h2 class="text-xl font-bold mb-4">
        {{ isEdit ? "Edit Category" : "Add Category" }}
      </h2>

      <input
        v-model="category.name"
        type="text"
        placeholder="Category Name"
        class="w-full p-2 border border-gray-300 rounded mb-4"
      />

      <div class="flex justify-end space-x-2">
        <button
          @click="handleSubmit"
          class="bg-blue-500 hover:bg-blue-600 transition text-white px-4 py-2 rounded-md"
        >
          {{ isEdit ? "Update" : "Create" }}
        </button>
        <button
          @click="closeModal"
          class="bg-gray-500 hover:bg-gray-600 transition text-white px-4 py-2 rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineExpose } from "vue";
import { useAuthStore } from "@/stores/auth";
import { api } from "@/services/api";
import { toast } from "vue3-toastify";

const stores = useAuthStore();
const isOpen = ref(false);
const isEdit = ref(false);

const category = ref({ id: null, name: "" });
const emit = defineEmits(["refresh"]);

const openModal = (item = null) => {
  if (item) {
    isEdit.value = true;
    category.value = { ...item };
  } else {
    isEdit.value = false;
    category.value = { id: null, name: "" };
  }
  isOpen.value = true;
};

const closeModal = () => {
  isOpen.value = false;
};

const handleSubmit = async () => {
  try {
    if (isEdit.value) {
      await api.put(`/categories/${category.value.id}`, category.value, {
        headers: {
          Authorization: `Bearer ${stores.token}`,
        },
      });
      toast.success("Category updated successfully");
    } else {
      await api.post("/categories", category.value, {
        headers: {
          Authorization: `Bearer ${stores.token}`,
        },
      });
      toast.success("Category created successfully");
    }
    emit("refresh");
    closeModal();
  } catch (error) {
    console.error(error);
    toast.error("Operation failed");
  }
};

defineExpose({ openModal });
</script>
