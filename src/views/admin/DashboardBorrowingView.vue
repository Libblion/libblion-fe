<template>
  <section>
    <h1 class="text-3xl mb-6 font-bold">Borrowing List</h1>

    <div class="w-full">
      <EasyDataTable
        :headers="headers"
        :items="items"
        :rows-per-page="10"
        show-index
        table-class-name="customize-table"
      >
        <template #item-created_at="{ created_at }">
          {{ new Date(created_at).toLocaleDateString() }}
        </template>
        <template #loading>
          <img
            src="https://i.pinimg.com/originals/94/fd/2b/94fd2bf50097ade743220761f41693d5.gif"
            style="width: 100px; height: 80px"
          />
        </template>
        <template #item-actions="props">
          <button
            @click="openModal(props.id)"
            class="text-green-400 rounded-xl px-2 shadow cursor-pointer"
          >
            <font-awesome-icon icon="fa-solid fa-check" />
          </button>
        </template>
      </EasyDataTable>
    </div>

    <div
      v-if="isOpenModal"
      class="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 class="text-lg font-semibold text-gray-800">Konfirmasi Approve</h3>
        <p class="text-gray-600 mt-2">
          Apakah Anda yakin ingin menyetujui peminjaman buku ini?
        </p>

        <div class="mt-4 flex justify-end space-x-3">
          <button
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            @click="handleApprove"
          >
            Iya
          </button>
          <button
            @click="closeModal"
            class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { api } from "@/services/api";
import { useAuthStore } from "@/stores/auth";
import { useLoadingStore } from "@/stores/loadingStore";
import { ref } from "vue";
import { onMounted } from "vue";
import { toast } from "vue3-toastify";

const headers = [
  {
    text: "Book",
    value: "book.title",
  },
  {
    text: "User",
    value: "user.username",
  },

  {
    text: "Approved By",
    value: "approved_by.username",
  },

  {
    text: "Status",
    value: "status",
  },

  {
    text: "Borrow Date",
    value: "created_at",
  },

  {
    text: "Return Date",
    value: "return_date",
  },
  { text: "Actions", value: "actions" },
];

const items = ref([]);
const isOpenModal = ref(false);
const selectedBorrowingId = ref(null);
const loading = useLoadingStore();

const stores = useAuthStore();

const openModal = (id) => {
  isOpenModal.value = true;
  selectedBorrowingId.value = id;
};

const closeModal = () => {
  isOpenModal.value = false;
};

const handleGetBorrowing = async () => {
  try {
    const { data } = await api.get("/borrowings");
    items.value = data.data;
    console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    loading.stop();
  }
};

const handleApprove = async () => {
  const payload = {
    status: "approved",
    approved_by: stores.currentUser.id,
  };

  try {
    const response = await api.put(
      `/borrowings/${selectedBorrowingId.value}/aproved_by`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${stores.token}`,
        },
      }
    );

    const index = items.value.findIndex(
      (item) => item.id === selectedBorrowingId.value
    );

    if (index !== -1) {
      items.value[index].status = "approved";
    }

    closeModal();

    toast.success(response.data.message);
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
  }
};

onMounted(() => {
  handleGetBorrowing();
});
</script>
