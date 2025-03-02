<template>
    <MainLayout>
        <template #content>
            <section class="max-w-full flex flex-col gap-4 px-10 font-libre-text py-5 dark:bg-gray-950">
                <div class="w-full shadow-md rounded-md px-2 py-4 dark:bg-gray-900">
                    <div class="flex lg:flex-row md:flex-row flex-col gap-4">
                        <div class="max-w-max">
                            <figure class="w-36 mb-4">
                                <img :src="profile.profile?.image ||
                                    'https://ui-avatars.com/api/?name=Default&background=random'
                                    " alt="test" class="w-full h-full object-cover rounded-lg" />
                            </figure>
                            <div class="flex justify-center w-full">
                                <p
                                    class="inline-flex items-center justify-center px-3 py-1 text-sm font-medium rounded-full bg-purple-900 text-white font-poppins dark:bg-red-900 shadow-sm">
                                    <font-awesome-icon icon="fa-solid fa-user-shield" class="mr-1" />
                                    {{ profile.role?.name }}
                                </p>
                            </div>
                        </div>

                        <div class="text-black w-full px-4 py-2 dark:text-white">
                            <div class="flex flex-col gap-2">
                                <h1 class="text-3xl font-bold font-poppins">
                                    Welcome,
                                    <span class="font-extrabold dark:text-red-900">
                                        {{
                                            profile.profile?.firstname ??
                                            "Full name has not been set"
                                        }}
                                        {{ profile.profile?.lastname ?? "" }}
                                    </span>
                                </h1>

                                <div class="flex-1 font-poppins">
                                    <div class="mb-3">
                                        <p class="flex items-center">
                                            <span
                                                class="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                                                <font-awesome-icon icon="fa-solid fa-calendar-days" class="mr-1" />
                                                Age
                                            </span>
                                            <span class="dark:text-gray-300">
                                                {{
                                                    profile.profile?.age ??
                                                    "Not set"
                                                }}
                                            </span>
                                        </p>
                                    </div>
                                    <div class="mb-3">
                                        <p class="flex items-center">
                                            <span
                                                class="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                                                <font-awesome-icon icon="fa-solid fa-location-dot" class="mr-1" />
                                                Address
                                            </span>
                                            <span class="dark:text-gray-300">
                                                {{
                                                    profile.profile?.address ??
                                                    "Not set"
                                                }}
                                            </span>
                                        </p>
                                    </div>
                                    <div class="mb-3">
                                        <p class="flex items-center">
                                            <span
                                                class="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                                                <font-awesome-icon icon="fa-solid fa-phone" class="mr-1" />
                                                Phone
                                            </span>
                                            <span class="dark:text-gray-300">
                                                {{
                                                    profile.profile
                                                        ?.phone_number ??
                                                    "Not set"
                                                }}
                                            </span>
                                        </p>
                                    </div>
                                    <div>
                                        <p class="flex items-center">
                                            <span
                                                class="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-medium rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
                                                <font-awesome-icon icon="fa-solid fa-envelope" class="mr-1" />
                                                Email
                                            </span>
                                            <span class="dark:text-gray-300">
                                                {{ profile.email ?? "Not set" }}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="w-full flex flex-col p-2">
                            <h1 class="font-bold text-xl text-center font-poppins py-4 dark:text-white">
                                Edit Your Profile
                            </h1>

                            <FormProfile @submit="handleSubmit" />
                        </div>
                    </div>
                </div>

                <!-- Perbaiki kode di bagian ini -->
                <div class="max-w-full flex flex-col h-full shadow-md p-2" v-if="profileStore.profile.role_id !== 3">
                    <h1 class="font-bold text-xl text-center py-4">
                        List Borrowing User
                    </h1>

                    <EasyDataTable :headers="headers" :items="tableData" :rows-per-page="10" theme-color="#1d90ff"
                        table-class-name="customize-table" header-text-direction="center" body-text-direction="center"
                        show-index>
                        <template #item-actions="item">
                            <button v-if="item.status == 'pending'" @click="openModal(item)"
                                class="text-green-400 rounded-md px-2 py-2 shadow cursor-pointer bg-teal-50">
                                Return
                            </button>
                            <button v-if="item.status == 'overdue'" @click="payFine(item.id)"
                                class="text-red-400 rounded-md px-2 py-2 shadow cursor-pointer bg-red-50 ml-2">
                                Return & Pay Fines
                            </button>
                        </template>
                    </EasyDataTable>
                </div>

                <div v-if="isModal"
                    class="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
                    <div class="bg-white p-6 rounded-lg shadow-lg w-96 font-poppins dark:bg-gray-800 dark:text-white">
                        <h2 class="text-xl font-bold mb-2 dark:text-red-900">
                            Konfirmasi Pengembalian
                        </h2>
                        <p>
                            <strong>Buku:</strong>
                            {{ dataBook.book_title }}
                        </p>
                        <p>
                            <strong>Tanggal Peminjaman:</strong>
                            {{ dataBook.borrow_date }}
                        </p>
                        <p>
                            <strong>Tanggal Pengembalian:</strong>
                            {{ dataBook.return_date || "Belum dikembalikan" }}
                        </p>

                        <div class="mt-4 flex justify-end gap-2">
                            <button @click="isModal = false"
                                class="px-4 py-2 bg-gray-300 rounded font-poppins dark:bg-gray-600 dark:text-white cursor-pointer">
                                Batal
                            </button>
                            <button @click="handleReturnBook()"
                                class="px-4 py-2 bg-blue-500 text-white rounded font-poppins dark:bg-red-900 cursor-pointer">
                                Konfirmasi
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </template>
    </MainLayout>
</template>

<script setup>
import MainLayout from "@/layouts/MainLayout.vue";
import { useLoadingStore } from "@/stores/loadingStore";
import { computed, onMounted, reactive, ref } from "vue";
import { useProfileStore } from "@/stores/profile";
import { storeToRefs } from "pinia";
import FormProfile from "@/components/Form/FormProfile.vue";
import { toast } from "vue3-toastify";
import { api } from "@/services/api";
import { userBorrowStore } from "@/stores/borrowStore";
import { useAuthStore } from "@/stores/auth";

const loading = useLoadingStore();
const profileStore = useProfileStore();
const { profile } = storeToRefs(profileStore);

const headers = [
    {
        text: "Username",
        value: "username",
    },
    {
        text: "Title",
        value: "book_title",
    },

    {
        text: "Borrow Date",
        value: "borrow_date",
    },

    {
        text: "Return",
        value: "return_date",
    },

    {
        text: "Status",
        value: "status",
    },
    { text: "Actions", value: "actions" },
];

const isModal = ref(false);
const dataBook = ref({});
const openModal = (item) => {
    dataBook.value = item;
    isModal.value = true;
};

const handleSubmit = async (payload) => {
    const formData = new FormData();
    formData.append("firstname", payload.fname);
    formData.append("lastname", payload.lname);
    formData.append("age", payload.age);
    formData.append("phone_number", payload.pnumber);
    formData.append("address", payload.address);

    if (payload.image) {
        formData.append("image", payload.image);
    }

    await profileStore.updateProfile(formData);
    await profileStore.getProfile();

    payload.fname = "";
    payload.lname = "";
    payload.age = "";
    payload.pnumber = "";
    payload.address = "";
    payload.image = null;

    toast.success("Data berhasil diperbarui");
};

const tableData = computed(() => {
    if (!profile.value || !profile.value.borrowings) return [];

    return profile.value.borrowings.map((borrowing) => ({
        id: borrowing.id,
        book_id: borrowing.book?.id || null,
        username: profile.value.username,
        status: borrowing.status,
        borrow_date: borrowing.borrow_date || "Belum dipinjam",
        return_date: borrowing.return_date || "Belum dikembalikan",
        book_title: borrowing.book.title,
    }));
});

const payFine = async (borrowId) => {
    if (!borrowId) {
        toast.error("ID peminjaman tidak valid!");
        return;
    }
    try {
        const response = await api.post(`/fine?id=${borrowId}`);
        await snap.pay(response.data.token, {
            onSuccess: function (result) {
                console.log("success");
                console.log(result);
            },
            onPending: function (result) {
                console.log("pending");
                console.log(result);
            },
            onError: function (result) {
                console.log("error");
                console.log(result);
            },
            onClose: function () {
                console.log(
                    "customer closed the popup without finishing the payment"
                );
            },
        });
    } catch (error) {
        toast.error(error);
    }
};

const borrow = userBorrowStore()
const auth = useAuthStore()

const handleReturnBook = async () => {

    console.log(dataBook.value);
    const payload = reactive({
        user_id : auth.currentUser.id,
        book_id : dataBook.value.book_id,
        status : "returned",
        return_date: new Date().toISOString().slice(0, 19).replace("T", " ")
    })
    try {
        const response = await borrow.updateBorrow(dataBook.value.id,payload)
        console.log(response);
        toast.success('Success return,waiting for approved')
        
    } catch (error) {
        console.log(error);
        toast.error(error)

    }finally{
        isModal.value = false
        await profileStore.getProfile()
    }
}

onMounted(async () => {
    try {
        await profileStore.getProfile();
    } catch (error) {
        console.log(error);
    } finally {
        loading.stop();
    }
});
</script>
