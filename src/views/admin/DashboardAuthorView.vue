<template>
  <section class="container mx-auto font-poppins">
    <div class="bg-[#0b1220] rounded-xl p-6 mt-10">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-white">Author List</h1>
        <button
          @click="handleAdd"
          class="bg-yellow-500 hover:bg-yellow-600 text-[#0b1220] px-4 py-2 rounded-lg cursor-pointer transition-colors"
        >
          Add Author
        </button>
      </div>

      <div class="w-full overflow-x-auto">
        <EasyDataTable
          :headers="headers"
          :items="items"
          theme-color="#1d90ff"
          :rows-per-page="10"
          table-class-name="customize-table"
          header-text-direction="center"
          body-text-direction="center"
          :loading="loadingStore.isLoading"
        >
          <template #loading>
            <img
              src="https://i.pinimg.com/originals/94/fd/2b/94fd2bf50097ade743220761f41693d5.gif"
              style="width: 100px; height: 80px"
            />
          </template>
          <template #item-actions="{ id }">
            <div class="flex gap-3 justify-center">
              <button
                @click="handleEdit(id)"
                class="bg-purple-500 hover:bg-purple-600 p-2 rounded-lg text-white cursor-pointer transition-colors"
              >
                <font-awesome-icon icon="fa-solid fa-pen" />
              </button>
              <button
                @click="handleDelete(id)"
                class="bg-purple-500 hover:bg-purple-600 p-2 rounded-lg text-white cursor-pointer transition-colors"
              >
                <font-awesome-icon icon="fa-solid fa-trash" />
              </button>
            </div>
          </template>
        </EasyDataTable>
      </div>
    </div>
  </section>

  <!-- Reusable Modal for Add/Edit -->
  <Teleport to="body">
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center overflow-auto"
    >
      <div
        class="fixed inset-0 bg-black/50 backdrop-blur-sm"
        @click="showModal = false"
      ></div>

      <div class="relative z-50 bg-white p-6 rounded-lg w-1/3 min-w-[320px]">
        <h2 class="text-2xl mb-4">{{ isEditing ? 'Edit' : 'Add' }} Author</h2>
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label
              for="first_name"
              class="block text-sm font-medium text-gray-700"
              >First Name</label
            >
            <input
              v-model="formData.first_name"
              type="text"
              id="first_name"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="mb-4">
            <label
              for="last_name"
              class="block text-sm font-medium text-gray-700"
              >Last Name</label
            >
            <input
              v-model="formData.last_name"
              type="text"
              id="last_name"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Email</label
            >
            <input
              v-model="formData.email"
              type="email"
              id="email"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="mb-4">
            <label for="no_telp" class="block text-sm font-medium text-gray-700"
              >Phone Number</label
            >
            <input
              v-model="formData.no_telp"
              type="text"
              id="no_telp"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="flex justify-end gap-2">
            <button
              type="button"
              @click="showModal = false"
              class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              {{ isEditing ? 'Save' : 'Add' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>

  <!-- Delete Confirmation Modal -->
  <Teleport to="body">
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 z-50 flex items-center justify-center overflow-auto"
    >
      <div
        class="fixed inset-0 bg-black/50 backdrop-blur-sm"
        @click="showDeleteModal = false"
      ></div>

      <div class="relative z-50 bg-white p-6 rounded-lg w-1/3 min-w-[320px]">
        <h2 class="text-2xl mb-4">Delete Confirmation</h2>
        <p class="mb-6 text-gray-600">
          Are you sure you want to delete this author?
        </p>
        <div class="flex justify-end gap-2">
          <button
            @click="showDeleteModal = false"
            class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            @click="confirmDelete"
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
  import { ref, onMounted, watch ,computed} from 'vue';
  import { useAuthorStore } from '@/stores/authorStore';
  import { useLoadingStore } from '@/stores/loadingStore';
import { storeToRefs } from 'pinia';

  const authorStore = useAuthorStore();
  const loadingStore = useLoadingStore();
  const items = ref([]);
  const showModal = ref(false);
  const showDeleteModal = ref(false);
  const selectedDeleteId = ref(null);
  const isEditing = ref(false);

  const formData = ref({
    id: null,
    first_name: '',
    last_name: '',
    email: '',
    no_telp: '',
  });

  const headers = [
    { text: 'No.', value: 'index' },
    { text: 'Firstname', value: 'first_name' },
    { text: 'Lastname', value: 'last_name' },
    { text: 'Email', value: 'email' },
    { text: 'Phone Number', value: 'no_telp' },
    { text: 'Actions', value: 'actions' },
  ];

  const resetForm = () => {
    formData.value = {
      id: null,
      first_name: '',
      last_name: '',
      email: '',
      no_telp: '',
    };
  };
  
  const handleAdd = () => {
    isEditing.value = false;
    resetForm();
    showModal.value = true;
  };

  const handleEdit = (id) => {
    const author = items.value.find((item) => item.id === id);
    if (author) {
      isEditing.value = true;
      formData.value = { ...author };
      showModal.value = true;
    }
  };

  const handleDelete = (id) => {
    selectedDeleteId.value = id;
    showDeleteModal.value = true;
  };

  const handleSubmit = async () => {
    loadingStore.start();
    try {
      if (isEditing.value) {
        await authorStore.updateAuthor(formData.value.id, formData.value);
      } else {
        await authorStore.addAuthor(formData.value);
      }
      await authorStore.fetchAuthors();
      showModal.value = false;
      resetForm();
    } catch (error) {
      console.error('Error saving author:', error);
    } finally {
      loadingStore.stop();
    }
  };
  
  const confirmDelete = async () => {
    loadingStore.start();
    try {
      await authorStore.deleteAuthor(selectedDeleteId.value);
      await authorStore.fetchAuthors();
      showDeleteModal.value = false;
      selectedDeleteId.value = null;
    } catch (error) {
      console.error('Error deleting author:', error);
    } finally {
      loadingStore.stop();
    }
  };

  const {authors} = storeToRefs(authorStore)

  const formattedAuthors = computed(() => {
  if (authors.value && Array.isArray(authors.value)) {
    return authors.value.map((author, index) => ({
      index: index + 1,
      id: author.id,
      first_name: author.first_name,
      last_name: author.last_name,
      email: author.email,
      no_telp: author.no_telp,
    }));
  }
  return [];
});

  onMounted(async () => {
    loadingStore.start();
    try {
      await authorStore.fetchAuthors();
      items.value = formattedAuthors.value;      
    } catch (error) {
      console.error('Error fetching authors:', error);
    } finally {
      loadingStore.stop();
    }
  });
</script>

<style>
  /* Styling Custom EasyDataTable */
  .customize-table {
    /* Warna border tabel lebih gelap */
    --easy-table-border: 1px solid #0b1220;
    --easy-table-row-border: 1px solid #0b1220;

    /* Sisi tabel lebih lancip (radius kecil) */
    border-radius: 5px;

    /* Header */
    --easy-table-header-font-size: 16px;
    --easy-table-header-height: 50px;
    --easy-table-header-font-color: #ffffff;
    --easy-table-header-background-color: #0b1220;
    --easy-table-header-item-padding: 14px 18px;

    /* Body */
    --easy-table-body-even-row-font-color: #ffffff;
    --easy-table-body-even-row-background-color: #0b1220;

    --easy-table-body-row-font-color: #ffffff;
    --easy-table-body-row-background-color: #0b1220;
    --easy-table-body-row-height: 55px;
    --easy-table-body-row-font-size: 15px;

    /* Hover effect lebih smooth */
    --easy-table-body-row-hover-font-color: #ffffff;
    --easy-table-body-row-hover-background-color: #2a4365;
    --easy-table-body-row-hover-transition: all 0.3s ease-in-out;

    /* Padding item */
    --easy-table-body-item-padding: 14px 18px;

    /* Footer */
    --easy-table-footer-background-color: #0b1220;
    --easy-table-footer-font-color: #ffffff;
    --easy-table-footer-font-size: 14px;
    --easy-table-footer-padding: 6px 18px;
    --easy-table-footer-height: 50px;

    /* Scrollbar */
    --easy-table-scrollbar-track-color: #0b1220;
    --easy-table-scrollbar-color: #0b1220;
    --easy-table-scrollbar-thumb-color: #2d3748;
    --easy-table-scrollbar-corner-color: #0b1220;

    /* Loading Mask */
    --easy-table-loading-mask-background-color: rgba(11, 18, 32, 0.9);
  }
</style>
