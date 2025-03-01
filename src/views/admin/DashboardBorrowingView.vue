<template>
    <section class="container mx-auto font-poppins">
        <!-- Bagian Pencarian di luar kotak utama -->
        <div class="flex flex-col mt-10 mb-8">
            <div class="flex items-center justify-between">
                <div class="flex-grow">
                    <AdvancedSearchBar
                        placeholder="Search borrowing here..."
                        @search="handleAdvancedSearch"
                        :filters="borrowingFilters"
                    />
                </div>
            </div>
            <!-- Ruang untuk filter dropdown yang akan muncul di bawah -->
            <!-- <div class="mt-2"></div> -->
        </div>

        <div class="bg-[#0b1220] rounded-xl p-6">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-3xl font-bold text-white">Borrowing Table</h1>
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
                            @click="openApproveModal(props.id)"
                            class="text-green-400 rounded-xl px-2 shadow cursor-pointer"
                        >
                            <font-awesome-icon icon="fa-solid fa-check" />
                        </button>
                    </template>
                </EasyDataTable>
            </div>
        </div>

        <!-- Menggunakan komponen ModalApprove -->
        <ModalApprove
            ref="approveModal"
            title="Konfirmasi Approve"
            message="Apakah Anda yakin ingin menyetujui peminjaman buku ini?"
            confirmText="Iya"
            cancelText="Batal"
            @confirm="handleApprove"
        />
    </section>
</template>

<script setup>
import { api } from "@/services/api";
import { useAuthStore } from "@/stores/auth";
import { useLoadingStore } from "@/stores/loadingStore";
import { ref, computed } from "vue";
import { onMounted } from "vue";
import { toast } from "vue3-toastify";
import AdvancedSearchBar from "@/components/admin/AdvancedSearchBar.vue";
import { userBorrowStore } from "@/stores/borrowStore";
import ModalApprove from "@/components/modal/ModalApprove.vue";

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
const approveModal = ref(null);
const loading = useLoadingStore();
const borrowingStore = userBorrowStore();
const stores = useAuthStore();

// Definisi filter untuk pencarian
const borrowingFilters = computed(() => [
    {
        key: "status",
        label: "Filter by Status",
        options: [
            { value: "pending", label: "Pending" },
            { value: "approved", label: "Approved" },
            { value: "returned", label: "Returned" },
            { value: "rejected", label: "Rejected" },
        ],
    },
]);

const searchQuery = ref("");
const allBorrowings = ref([]);

const openApproveModal = (id) => {
    approveModal.value.open(id);
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

const handleApprove = async (id) => {
    const payload = {
        status: "approved",
        approved_by: stores.currentUser.id,
    };

    try {
        const response = await api.put(
            `/borrowings/${id}/aproved_by`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${stores.token}`,
                },
            }
        );

        const index = items.value.findIndex((item) => item.id === id);

        if (index !== -1) {
            items.value[index].status = "approved";
            items.value[index].approved_by = {
                username: stores.currentUser.username,
            };
        }

        toast.success(response.data.message);
    } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
    }
};

const handleAdvancedSearch = async (searchParams) => {
    // Mulai loading kecuali jika noLoading diset true
    if (!searchParams.noLoading) {
        loading.start();
    }

    try {
        console.log("Search params:", searchParams); // Debugging

        // Panggil fungsi searchBorrowings dari store
        await borrowingStore.searchBorrowings(
            searchParams.query,
            searchParams.filters
        );

        // Update tampilan dengan hasil pencarian
        items.value = formatBorrowingData(borrowingStore.getAllBorrowings);
    } catch (error) {
        console.error("Error searching borrowings:", error);
        toast.error("Gagal melakukan pencarian");
    } finally {
        // Hentikan loading kecuali jika noLoading diset true
        if (!searchParams.noLoading) {
            loading.stop();
        }
    }
};

onMounted(async () => {
    loading.start();
    try {
        await borrowingStore.fetchBorrowings();
        items.value = formatBorrowingData(borrowingStore.getAllBorrowings);
        allBorrowings.value = [...items.value];
    } catch (error) {
        console.error("Error fetching borrowings:", error);
        toast.error("Gagal memuat data peminjaman");
    } finally {
        loading.stop();
    }
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
