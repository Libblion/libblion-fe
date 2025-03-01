<template>
    <form class="flex-grow font-poppins" @submit.prevent="onSubmit">
        <div class="grid grid-cols-2 gap-2">
            <div class="block mb-2">
                <label class="mb-4 dark:text-white">Firstname</label>
                <input
                    class="border rounded py-2 px-4 w-full border-black dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    type="text"
                    name="fname"
                    placeholder="Firstname"
                    v-model="payload.fname"
                />
            </div>
            <div class="block mb-2">
                <label class="mb-4 dark:text-white">Lastname</label>
                <input
                    class="border rounded py-2 px-4 w-full border-black dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    type="text"
                    name="lname"
                    placeholder="lastname"
                    v-model="payload.lname"
                />
            </div>
        </div>
        <div class="grid grid-cols-2 gap-2">
            <div class="block mb-2">
                <label class="mb-4 dark:text-white">Age</label>
                <input
                    class="border rounded py-2 px-4 w-full border-black appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    type="number"
                    name="age"
                    placeholder="Age"
                    v-model="payload.age"
                />
            </div>
            <div class="block mb-2">
                <label class="mb-4 dark:text-white">Phone Number</label>
                <input
                    class="border rounded py-2 px-4 w-full border-black dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    type="text"
                    name="pnumber"
                    placeholder="+62"
                    v-model="payload.pnumber"
                />
            </div>
        </div>

        <div class="grid grid-cols-2 gap-2">
            <div class="block mb-2">
                <label class="mb-4 dark:text-white">Image</label>
                <input
                    class="border rounded py-2 px-4 w-full border-black dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    type="file"
                    name="image"
                    @change="handleImage"
                />
            </div>
            <div class="block mb-2">
                <label class="mb-4 dark:text-white">Address</label>
                <textarea
                    class="border rounded py-2 px-4 w-full border-black h-10 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    placeholder="Jl.test 123"
                    name="address"
                    v-model="payload.address"
                ></textarea>
            </div>
        </div>

        <button
            :class="[
                'bg-black py-2 px-8 text-white w-full mx-auto rounded-md cursor-pointer font-poppins dark:bg-red-900',
                { 'opacity-50 cursor-not-allowed': stores.isLoading },
            ]"
            type="submit"
        >
            {{ stores.isLoading ? "Loading..." : "Submit" }}
        </button>
    </form>
</template>

<script setup>
import { useProfileStore } from "@/stores/profile";
import { reactive } from "vue";
const stores = useProfileStore();
const emit = defineEmits(["submit"]);

const payload = reactive({
    fname: "",
    lname: "",
    age: "",
    pnumber: "",
    address: "",
    image: null,
});

const handleImage = (e) => {
    payload.image = e.target.files[0];
};

const onSubmit = () => {
    emit("submit", payload);
};
</script>
