<template>
  <form class="flex-grow" @submit.prevent="onSubmit">
    <div class="grid grid-cols-2 gap-2">
      <div class="block mb-2">
        <label class="mb-4">Firstname</label>
        <input
          class="border rounded py-2 px-4 w-full border-black"
          type="text"
          name="fname"
          placeholder="Firstname"
          v-model="payload.fname"
        />
      </div>
      <div class="block mb-2">
        <label class="mb-4">Lastname</label>
        <input
          class="border rounded py-2 px-4 w-full border-black"
          type="text"
          name="lname"
          placeholder="lastname"
          v-model="payload.lname"
        />
      </div>
    </div>
    <div class="grid grid-cols-2 gap-2">
      <div class="block mb-2">
        <label class="mb-4">Age</label>
        <input
          class="border rounded py-2 px-4 w-full border-black appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          type="number"
          name="age"
          placeholder="Age"
          v-model="payload.age"
        />
      </div>
      <div class="block mb-2">
        <label class="mb-4">Phone Number</label>
        <input
          class="border rounded py-2 px-4 w-full border-black"
          type="text"
          name="pnumber"
          placeholder="+62"
          v-model="payload.pnumber"
        />
      </div>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <div class="block mb-2">
        <label class="mb-4">Image</label>
        <input
          class="border rounded py-2 px-4 w-full border-black"
          type="file"
          name="image"
          @change="handleImage"
        />
      </div>
      <div class="block mb-2">
        <label class="mb-4">Address</label>
        <textarea
          class="border rounded py-2 px-4 w-full border-black h-10"
          placeholder="Jl.test 123"
          name="address"
          v-model="payload.address"
        ></textarea>
      </div>
    </div>

    <button
      :class="[
        'bg-black py-2 px-8 text-white  w-full mx-auto rounded-md cursor-pointer',
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
