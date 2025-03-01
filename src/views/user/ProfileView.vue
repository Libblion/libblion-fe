<template>
  <MainLayout>
    <template #content>
      <section
        class="max-w-full flex flex-col gap-4 px-10 font-libre-text py-5"
      >
        <div class="w-full shadow-md rounded-md px-2 py-4">
          <div class="flex lg:flex-row md:flex-row flex-col gap-4">
            <div class="max-w-max">
              <figure class="w-36 mb-4">
                <img
                  :src="
                    profile.profile?.image ||
                    'https://ui-avatars.com/api/?name=Default&background=random'
                  "
                  alt="test"
                  class="w-full h-full object-cover rounded-lg"
                />
              </figure>
              <p
                class="p-2 px-4 bg-green-400 text-white text-center rounded-lg"
              >
                {{ profile.role?.name }}
              </p>
            </div>

            <div class="text-black w-full px-4 py-2">
              <div class="flex flex-col gap-2">
                <h1 class="text-3xl font-bold">
                  Welcome,
                  <span class="font-extrabold">
                    {{
                      profile.profile?.firstname ?? "Full name has not been set"
                    }}
                    {{ profile.profile?.lastname ?? "" }}</span
                  >
                </h1>

                <div class="flex-1">
                  <div class="mb-3">
                    <p>
                      Age:
                      <span> {{ profile.profile?.age ?? "" }}</span>
                    </p>
                  </div>
                  <div class="mb-3">
                    <p>
                      Address:
                      <span> {{ profile.profile?.address ?? "" }}</span>
                    </p>
                  </div>
                  <div class="mb-3">
                    <p>
                      Phone Number:
                      <span> {{ profile.profile?.phone_number ?? "" }}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      Email:
                      <span> {{ profile.email ?? "" }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="w-full flex flex-col p-2">
              <h1 class="font-bold text-xl text-center font-libre-text py-4">
                Edit Your Profile
              </h1>

              <FormProfile @submit="handleSubmit" />
            </div>
          </div>
        </div>

        <!-- Perbaiki kode di bagian ini -->
        <div
          class="max-w-full flex flex-col h-full shadow-md p-2"
          v-if="profileStore.profile.role_id !== 3"
        >
          <h1 class="font-bold text-xl text-center py-4">
            List Borrowing User
          </h1>

          <EasyDataTable
            :headers="headers"
            :items="tableData"
            :rows-per-page="10"
            theme-color="#1d90ff"
            table-class-name="customize-table"
            header-text-direction="center"
            body-text-direction="center"
            show-index
          >
            <template #item-actions="item">
              <button
                v-if="item.status != 'overdue'"
                @click="openModal(item)"
                class="text-green-400 rounded-md px-2 py-2 shadow cursor-pointer bg-teal-50"
              >
                Return
              </button>
              <button
                v-if="item.status === 'overdue'"
                @click="payFine(item.id)"
                class="text-red-400 rounded-md px-2 py-2 shadow cursor-pointer bg-red-50 ml-2"
              >
                Return & Pay Fines
              </button>
            </template>
          </EasyDataTable>
        </div>

        <div
          v-if="isModal"
          class="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm"
        >
          <div class="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 class="text-xl font-bold mb-2">Konfirmasi Pengembalian</h2>
            <p><strong>Buku:</strong> {{ dataBook.book_title }}</p>
            <p>
              <strong>Tanggal Peminjaman:</strong>
              {{ dataBook.borrow_date }}
            </p>
            <p>
              <strong>Tanggal Pengembalian:</strong>
              {{ dataBook.return_date || "Belum dikembalikan" }}
            </p>

            <div class="mt-4 flex justify-end gap-2">
              <button
                @click="isModal = false"
                class="px-4 py-2 bg-gray-300 rounded"
              >
                Batal
              </button>
              <button
                @click="handleReturnBook"
                class="px-4 py-2 bg-blue-500 text-white rounded"
              >
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
import { computed, onMounted, ref } from "vue";
import { useProfileStore } from "@/stores/profile";
import { storeToRefs } from "pinia";
import FormProfile from "@/components/Form/FormProfile.vue";
import { toast } from "vue3-toastify";
import { api } from "@/services/api";
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
        console.log("customer closed the popup without finishing the payment");
      },
    });
  } catch (error) {
    toast.error(error);
  }
};

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
