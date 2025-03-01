<template>
    <div
        v-if="isOpenModalBorrow"
        class="w-screen h-screen flex justify-center items-center fixed z-50 bg-black/50 backdrop-blur-md flex-col gap-y-4"
    >
        <div
            class="w-80 flex h-fit flex-col items-center gap-y-2 bg-white overflow-y-scroll p-2"
        >
            <div class="flex flex-row justify-between w-full px-2 py-2">
                <h1 class="text-2xl">Detail Book Borrowed</h1>
                <button class="text-xl cursor-pointer" @click="close">
                    <font-awesome-icon icon="fa-solid fa-xmark" />
                </button>
            </div>
            <div class="flex flex-col gap-2 items-center">
                <figure class="max-w-60 overflow-hidden">
                    <img
                        :src="
                            detailBook.cover_image ??
                            `https://placehold.co/600x400?text=Cover+Image`
                        "
                        alt="image-cover"
                    />
                </figure>
                <div class="flex flex-col gap-2 bg-stone-100 p-2 w-60">
                    <h1 class="text-xl font-bold">{{ detailBook.title }}</h1>
                    <h2 class="text-sm">
                        By :
                        {{
                            `${detailBook.author.first_name} ${detailBook.author.last_name}`
                        }}
                    </h2>
                </div>
                <p class="w-60 text-xs">{{ detailBook?.description }}</p>
                <div v-if="isLogged" class="w-full flex gap-y-2 flex-col">
                    <h1 class="text-center border-b p-1">Your Information</h1>
                    <div class="text-sm flex flex-col gap-y-1">
                        <div>
                            <label for="fname">Full Name</label>
                            <input
                                v-model="username"
                                type="text"
                                id="fname"
                                class="border border-slate-700 ml-2 rounded-sm focus:outline-none p-1"
                            />
                        </div>
                        <h1>
                            <span class="font-bold">Email</span>
                            : {{ currentUser.email }}
                        </h1>
                    </div>
                </div>
                <div class="w-full text-end">
                    <button
                        :class="
                            isDisabled || isLoading
                                ? 'bg-slate-400 cursor-default'
                                : 'bg-night-purple  cursor-pointer hover:bg-slate-900 transition-colors'
                        "
                        class="border w-40 h-10 rounded-md text-white"
                        @click="confirmBorrowed"
                        :disabled="isDisabled"
                    >
                        <span>Confirm</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { bookStore } from "@/stores/bookStore";
import { useStore } from "@/stores/util";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { reactive, ref, watch } from "vue";
import { userBorrowStore } from "@/stores/borrowStore";

const book = bookStore();
const store = useStore();
const auth = useAuthStore();
const router = useRouter();

const { detailBook } = storeToRefs(book);
const { isOpenModalBorrow } = storeToRefs(store);
const { isLogged, currentUser } = storeToRefs(auth);

const borrowStore = userBorrowStore();

const username = ref(currentUser.value?.username);
const isDisabled = ref(false);
const isLoading = ref(false);

const close = () => store.closeModalBorrow();

const confirmBorrowed = async () => {
    isLoading.value = true;
    try {
        if (isLogged.value) {
            const payload = reactive({
                user_id: currentUser.value.id,
                book_id: detailBook.value.id,
            });
            const response = await borrowStore.createBorrowing(payload);
            toast.success(`wow it's very easy to borrow right?`, {
                onClose: () => {
                    payload.book_id = "";
                    payload.user_id = "";
                },
            });
        } else {
            toast.error("Please login,before borrow some book", {
                onClose: () => {
                    store.closeModalBorrow();
                    return router.replace("sign-in");
                },
            });
        }
    } catch (error) {
        toast.error(error);
        console.log(error);
    } finally {
        isLoading.value = false;
        close();
    }
};

watch(
    () => username.value,
    () => {
        isDisabled.value = !username.value;
    }
);

watch(
    () => detailBook.value,
    () => {
        console.log(detailBook.value);
    }
);
</script>

<style scoped>
::-webkit-scrollbar {
    width: 0px;
}
</style>
