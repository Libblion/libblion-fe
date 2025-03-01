<template>
    <section class="container mx-auto font-poppins">
        <div class="bg-[#0b1220] rounded-xl p-6 mt-10">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-3xl font-bold text-white">Book List</h1>
                <button
                    @click="handleAdd"
                    class="bg-yellow-500 hover:bg-yellow-600 text-[#0b1220] px-4 py-2 rounded-lg cursor-pointer transition-colors"
                >
                    Add Book
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
                                @click="handleDetail(id)"
                                class="bg-purple-500 hover:bg-purple-600 p-2 rounded-lg text-white cursor-pointer transition-colors"
                            >
                                <font-awesome-icon icon="fa-solid fa-eye" />
                            </button>
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

    <!-- Reusable Modal for Add/Edit/Detail -->
    <Teleport to="body">
        <div
            v-if="showModal"
            class="fixed inset-0 z-50 flex items-center justify-center overflow-auto"
        >
            <div
                class="fixed inset-0 bg-black/50 backdrop-blur-sm"
                @click="showModal = false"
            ></div>

            <div
                class="relative z-50 bg-white p-6 rounded-lg w-1/3 min-w-[320px]"
            >
                <h2 class="text-2xl mb-4">
                    {{
                        modalMode === "detail"
                            ? "Book Details"
                            : isEditing
                            ? "Edit"
                            : "Add"
                    }}
                    Book
                </h2>
                <form @submit.prevent="handleSubmit">
                    <!-- Cover Image -->
                    <div
                        v-if="modalMode === 'detail' && formData.cover_image"
                        class="mb-4"
                    >
                        <img
                            :src="formData.cover_image"
                            alt="Book Cover"
                            class="w-full h-48 object-cover rounded-lg"
                        />
                    </div>

                    <div class="mb-4">
                        <label
                            for="title"
                            class="block text-sm font-medium text-gray-700"
                        >
                            Title
                        </label>
                        <input
                            v-model="formData.title"
                            type="text"
                            id="title"
                            :readonly="modalMode === 'detail'"
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                            :class="{ 'bg-gray-100': modalMode === 'detail' }"
                        />
                    </div>

                    <div class="mb-4">
                        <label
                            for="release_year"
                            class="block text-sm font-medium text-gray-700"
                        >
                            Release Year
                        </label>
                        <input
                            v-model="formData.release_year"
                            type="number"
                            id="release_year"
                            :readonly="modalMode === 'detail'"
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                            :class="{ 'bg-gray-100': modalMode === 'detail' }"
                        />
                    </div>

                    <div v-if="modalMode !== 'detail'" class="mb-4">
                        <label
                            for="cover_image"
                            class="block text-sm font-medium text-gray-700"
                        >
                            Cover Image
                        </label>
                        <input
                            @change="handleFileChange"
                            type="file"
                            id="cover_image"
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div class="mb-4">
                        <label
                            for="description"
                            class="block text-sm font-medium text-gray-700"
                        >
                            Description
                        </label>
                        <textarea
                            v-model="formData.description"
                            id="description"
                            :readonly="modalMode === 'detail'"
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                            :class="{ 'bg-gray-100': modalMode === 'detail' }"
                        ></textarea>
                    </div>

                    <div class="mb-4 flex gap-4">
                        <div class="w-1/2">
                            <label
                                for="author_id"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Author
                            </label>
                            <select
                                v-if="modalMode !== 'detail'"
                                v-model="formData.author_id"
                                id="author_id"
                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option
                                    v-for="author in authors"
                                    :key="author.id"
                                    :value="author.id"
                                >
                                    {{
                                        `${author.first_name} ${author.last_name}`
                                    }}
                                </option>
                            </select>
                            <input
                                v-else
                                type="text"
                                :value="getAuthorName(formData.author_id)"
                                readonly
                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100"
                            />
                        </div>

                        <div class="w-1/2">
                            <label
                                for="category_id"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Category
                            </label>
                            <select
                                v-if="modalMode !== 'detail'"
                                v-model="formData.category_id"
                                id="category_id"
                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option
                                    v-for="category in categories"
                                    :key="category.id"
                                    :value="category.id"
                                >
                                    {{ category.name }}
                                </option>
                            </select>
                            <input
                                v-else
                                type="text"
                                :value="getCategoryName(formData.category_id)"
                                readonly
                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100"
                            />
                        </div>
                    </div>

                    <div class="flex justify-end gap-2">
                        <button
                            type="button"
                            @click="showModal = false"
                            class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors cursor-pointer"
                        >
                            {{ modalMode === "detail" ? "Close" : "Cancel" }}
                        </button>
                        <button
                            v-if="modalMode !== 'detail'"
                            type="submit"
                            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors cursor-pointer"
                        >
                            {{ isEditing ? "Save" : "Add" }}
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

            <div
                class="relative z-50 bg-white p-6 rounded-lg w-1/3 min-w-[320px]"
            >
                <h2 class="text-2xl mb-4">Delete Confirmation</h2>
                <p class="mb-6 text-gray-600">
                    Are you sure you want to delete this book?
                </p>
                <div class="flex justify-end gap-2">
                    <button
                        @click="showDeleteModal = false"
                        class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        @click="confirmDelete"
                        class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors cursor-pointer"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useBookCrudStore } from "@/stores/bookCrudStore";
import { useLoadingStore } from "@/stores/loadingStore";
import { useAuthorStore } from "@/stores/authorStore";
import { useCategoryStore } from "@/stores/categoryStore";

const bookStore = useBookCrudStore();
const loadingStore = useLoadingStore();
const authorStore = useAuthorStore();
const categoryStore = useCategoryStore();
const items = ref([]);
const showModal = ref(false);
const showDeleteModal = ref(false);
const selectedDeleteId = ref(null);
const isEditing = ref(false);
const authors = ref([]);
const categories = ref([]);
const modalMode = ref("add"); // 'add', 'edit', or 'detail'

const formData = ref({
    id: null,
    title: "",
    cover_image: "",
    description: "",
    release_year: "",
    author_id: "",
    category_id: "",
});

const headers = [
    { text: "No.", value: "index" },
    { text: "Title", value: "title" },
    { text: "Release Year", value: "release_year" },
    { text: "Author", value: "author" },
    { text: "Category", value: "category" },
    { text: "Actions", value: "actions" },
];

const resetForm = () => {
    formData.value = {
        id: null,
        title: "",
        cover_image: "",
        description: "",
        release_year: "",
        author_id: "",
        category_id: "",
    };
};

const formatBooksData = (books) => {
    if (books && Array.isArray(books)) {
        return books.map((book, index) => ({
            index: index + 1,
            id: book.id,
            title: book.title,
            release_year: book.release_year,
            author: book.author,
            category: book.category,
        }));
    }
    return [];
};

watch(
    () => bookStore.getAllBooks,
    (newBooks) => {
        items.value = formatBooksData(newBooks);
    },
    { deep: true }
);

const getAuthorName = (authorId) => {
    const author = authors.value.find((a) => a.id === authorId);
    return author ? `${author.first_name} ${author.last_name}` : "";
};

const getCategoryName = (categoryId) => {
    const category = categories.value.find((c) => c.id === categoryId);
    return category ? category.name : "";
};

const detailBook = ref();
const handleDetail = async (id) => {
    console.log(bookStore);
    try {
        await bookStore.getDetailBook(id);
        detailBook.value = bookStore.getBookDetail;
        modalMode.value = "detail";
        formData.value = { ...bookStore.getBookDetail };
        showModal.value = true;
    } catch (error) {
        console.error("Error fetching book detail:", error);
    }
};

const handleAdd = () => {
    modalMode.value = "add";
    isEditing.value = false;
    resetForm();
    showModal.value = true;
};

const handleEdit = async (id) => {
    try {
        await bookStore.getDetailBook(id);
        const detailData = bookStore.getBookDetail;
        modalMode.value = "edit";
        isEditing.value = true;
        formData.value = {
            id: detailData.id,
            title: detailData.title,
            cover_image: detailData.cover_image,
            description: detailData.description,
            release_year: detailData.release_year,
            author_id: detailData.author_id,
            category_id: detailData.category_id,
        };
        showModal.value = true;
    } catch (error) {
        console.error("Error fetching book detail for edit:", error);
    }
};

const handleDelete = (id) => {
    selectedDeleteId.value = id;
    showDeleteModal.value = true;
};

const handleSubmit = async () => {
    loadingStore.start();
    try {
        // Validasi data
        if (
            !formData.value.title ||
            !formData.value.description ||
            !formData.value.release_year ||
            !formData.value.author_id ||
            !formData.value.category_id
        ) {
            throw new Error("Semua field harus diisi");
        }

        // Jika menambahkan buku baru, pastikan cover_image ada
        if (!isEditing.value && !(formData.value.cover_image instanceof File)) {
            throw new Error("Cover image is required when adding a new book");
        }

        // Buat FormData baru
        const payload = new FormData();

        // Tambahkan field satu per satu dengan konversi tipe data yang tepat
        // Pastikan semua nilai dikonversi ke string
        payload.append("title", String(formData.value.title).trim());
        payload.append(
            "description",
            String(formData.value.description).trim()
        );
        payload.append("release_year", String(formData.value.release_year));
        payload.append("author_id", String(formData.value.author_id));
        payload.append("category_id", String(formData.value.category_id));

        // Tambahkan cover_image jika ada file baru
        if (formData.value.cover_image instanceof File) {
            payload.append("cover_image", formData.value.cover_image);
        }

        // Log data yang akan dikirim untuk debugging
        const formDataEntries = {};
        for (let [key, value] of payload.entries()) {
            formDataEntries[key] =
                value instanceof File ? `File: ${value.name}` : value;
        }
        console.log("FormData entries:", formDataEntries);

        // Kirim data ke API
        let response;
        if (isEditing.value) {
            response = await bookStore.updateBook(formData.value.id, payload);
            console.log("Update response:", response);
        } else {
            response = await bookStore.addBook(payload);
            console.log("Add response:", response);
        }

        // Refresh data dan reset form
        await bookStore.fetchBooks();
        showModal.value = false;
        resetForm();
    } catch (error) {
        console.error("Error saving book:", error);
        // Tampilkan pesan error ke pengguna
        if (
            error.message === "Cover image is required when adding a new book"
        ) {
            alert("Cover image is required when adding a new book");
        } else if (error.message === "Semua field harus diisi") {
            alert("Semua field harus diisi");
        } else if (
            error.response &&
            error.response.data &&
            error.response.data.errors
        ) {
            // Tampilkan error validasi dari server
            const errorMessages = Object.values(error.response.data.errors)
                .flat()
                .join("\n");
            alert(`Validation errors:\n${errorMessages}`);
        } else {
            alert("Terjadi kesalahan saat menyimpan buku: " + error.message);
        }
    } finally {
        loadingStore.stop();
    }
};

const confirmDelete = async () => {
    loadingStore.start();
    try {
        await bookStore.deleteBook(selectedDeleteId.value);
        await bookStore.fetchBooks();
        showDeleteModal.value = false;
        selectedDeleteId.value = null;
    } catch (error) {
        console.error("Error deleting book:", error);
    } finally {
        loadingStore.stop();
    }
};

const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        formData.value.cover_image = file;
    }
};

onMounted(async () => {
    loadingStore.start();
    try {
        await bookStore.fetchBooks();
        items.value = formatBooksData(bookStore.getAllBooks);
        await authorStore.fetchAuthors();
        authors.value = authorStore.getAllAuthors;
        categories.value = await categoryStore.getCategories();
    } catch (error) {
        console.error("Error fetching books, authors, or categories:", error);
    } finally {
        loadingStore.stop();
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
