<template>
    <section class="container mx-auto font-poppins">
        <div class="bg-[#0b1220] rounded-xl p-6 mt-10">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-3xl font-bold text-white">Borrowing List</h1>
            </div>

            <div class="w-full overflow-x-auto">
                <EasyDataTable
                    :headers="headers"
                    :items="items"
                    :rows-per-page="10"
                    theme-color="#1d90ff"
                    table-class-name="customize-table"
                    header-text-direction="center"
                    body-text-direction="center"
                    :loading="loading.isLoading"
                >
                    <template #item-created_at="{ created_at }">
                        {{ new Date(created_at).toLocaleDateString() }}
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
        </div>

        <div
            v-if="isOpenModal"
            class="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm"
        >
            <div class="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 class="text-lg font-semibold text-gray-800">
                    Konfirmasi Approve
                </h3>
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
    { text: "No.", value: "index" },
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

const formatBorrowingData = (borrowings) => {
    if (borrowings && Array.isArray(borrowings)) {
        return borrowings.map((borrowing, index) => ({
            ...borrowing,
            index: index + 1,
        }));
    }
    return [];
};

const handleGetBorrowing = async () => {
    try {
        const { data } = await api.get("/borrowings");
        items.value = formatBorrowingData(data.data);
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
