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

            <div class="bg-black text-white w-full px-4 py-2">
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
                      <span>
                        {{
                          profile.profile?.age ?? "Age has not been set"
                        }}</span
                      >
                    </p>
                  </div>
                  <div class="mb-3">
                    <p>
                      Address:
                      <span>
                        {{
                          profile.profile?.address ?? "Address has not been set"
                        }}</span
                      >
                    </p>
                  </div>
                  <div class="mb-3">
                    <p>
                      Phone Number:
                      <span>
                        {{
                          profile.profile?.phone_number ??
                          "Phone has not been set"
                        }}</span
                      >
                    </p>
                  </div>
                  <div>
                    <p>
                      Email:
                      <span> {{ profile.email ?? "undefined" }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div class="max-w-full flex flex-col h-full shadow-md p-2">
            <h1 class="font-bold text-xl text-center py-4">
              List Borrowing User
            </h1>

            <div class="flex-1">
              <EasyDataTable
                :headers="headers"
                :items="tableData"
                table-class-name="customize-table "
              />
            </div>
          </div>
          <div class="shadow-md w-full flex flex-col p-2">
            <h1 class="font-bold text-xl text-center font-libre-text py-4">
              Edit Your Profile
            </h1>

            <FormProfile @submit="handleSubmit" />
          </div>
        </div>
      </section>
    </template>
  </MainLayout>
</template>

<script setup>
import MainLayout from "@/layouts/MainLayout.vue";
import { useLoadingStore } from "@/stores/loadingStore";
import { computed, onMounted } from "vue";
import { useProfileStore } from "@/stores/profile";
import { storeToRefs } from "pinia";
import FormProfile from "@/components/Form/FormProfile.vue";
import { toast } from "vue3-toastify";
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
    text: "Overdue",
    value: "status",
  },
];

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
    username: profile.value.username,
    status: borrowing.status,
    borrow_date: borrowing.borrow_date || "Belum dipinjam",
    return_date: borrowing.return_date || "Belum dikembalikan",
    book_title: borrowing.book.title,
  }));
});

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

<style setup>
.customize-table {
  --easy-table-header-background-color: #0b1220;
  --easy-table-header-font-color: rgba(255, 255, 255, 0.771);

  --easy-table-body-row-background-color: #0b1220;
  --easy-table-body-row-font-color: rgba(255, 255, 255, 0.771);
  --easy-table-body-row-font-size: 10px;

  --easy-table-footer-background-color: #0b1220;
  --easy-table-footer-font-color: rgba(255, 255, 255, 0.771);

  --easy-table-border: none;
  --easy-table-body-row-hover-background-color: rgba(255, 255, 255, 0.431);
}
</style>
