<template>
  <MainLayout>
    <template #content>
      <section class="max-w-full flex flex-col gap-4 px-10 py-5">
        <div class="flex flex-col items-center mx-auto">
          <figure class="w-28 h-28">
            <img
              :src="imgProfile"
              alt="test"
              class="w-full h-full object-cover rounded-full"
            />
          </figure>

          <div class="flex flex-col items-center">
            <h1 class="text-3xl font-bold mb-2">{{ profile?.username }}</h1>
            <p
              class="text-sm bg-green-500 text-white mb-2 rounded-xl py-2 px-4"
            >
              {{ profile?.role?.name }}
            </p>
          </div>
        </div>

        <div class="grid md:grid-cols-2 grid-cols-1 gap-2">
          <div class="max-w-full shadow-md p-2">
            <h1 class="font-bold text-xl mb-2">List Borrowing User</h1>
            <EasyDataTable
              :headers="headers"
              :items="tableData"
              table-class-name="customize-table"
            />
          </div>
          <div class="shadow-md w-full p-2">
            <h1 class="text-center font-libre-text mb-2">Edit Your Profile</h1>

            <form class="flex-1">
              <div class="block mb-2">
                <input
                  class="border rounded py-2 px-4 w-full border-black"
                  type="text"
                  name="username"
                  placeholder="Username"
                />
              </div>
              <div class="block mb-2">
                <input
                  class="border rounded py-2 px-4 w-full border-black"
                  type="email"
                  name="email"
                  placeholder="email"
                />
              </div>
              <div class="block mb-2">
                <input
                  class="border rounded py-2 px-4 w-full border-black"
                  type="file"
                  name="username"
                  placeholder="Username"
                />
              </div>
              <div class="block mb-2">
                <textarea
                  class="border rounded py-2 px-4 w-full border-black"
                  placeholder="Summary"
                ></textarea>
              </div>

              <button
                class="border bg-black text-white rounded py-2 px-4 w-full"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </template>
  </MainLayout>
</template>

<script setup>
import MainLayout from "@/layouts/MainLayout.vue";
import imgProfile from "@/assets/images/profile/laravel.jpg";
import { useLoadingStore } from "@/stores/loadingStore";
import { computed, onMounted } from "vue";
import { useProfileStore } from "@/stores/profile";
import { storeToRefs } from "pinia";
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
