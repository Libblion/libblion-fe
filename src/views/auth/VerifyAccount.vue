<template>
  <section
    class="w-full min-h-screen flex flex-col justify-center p-2 items-center font-poppins"
  >
    <h1 class="text-4xl font-bold text-center mb-4">Libbilion</h1>
    <div class="max-w-max lg:p-18 md:p-10 p-5 border border-gray-100 shadow-lg">
      <div class="mx-auto max-w-sm">
        <form
          @submit.prevent="handleSubmit(form)"
          class="flex flex-col space-y-6"
        >
          <h1
            class="text-center font-bold lg:text-4xl md:text-3xl text-2xl max-w-sm mx-auto"
          >
            We Send Code OTP to your email
          </h1>
          <input
            type="number"
            placeholder="code"
            name="code"
            v-model="otp"
            class="rounded text-center mx-auto ring-1 py-2 px-2 bg-gray-300 ring-gray-900 lg:w-[70%] w-full appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />

          <p class="text-center">
            This code is only valid for 5 minute, *don't share with anyone
          </p>

          <button
            type="submit"
            :class="[
              'bg-black py-2 px-8 text-white lg:w-[30%] w-full mx-auto rounded-2xl cursor-pointer',
              { 'opacity-50 cursor-not-allowed': stores.isLoading },
            ]"
          >
            {{ stores.isLoading ? "Loading..." : "Submit" }}
          </button>

          <p class="text-center">
            don't have receive a code,
            <span
              :class="[
                'font-bold cursor-pointer',
                { 'opacity-50': stores.isGenerate },
              ]"
              @click="handleGenerateOtp"
              >{{ stores.isGenerate ? "Loading..." : "Generate" }}</span
            >
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";

const stores = useAuthStore();
const otp = ref("");

const handleSubmit = async () => {
  await stores.verifyAccount(otp.value);
  otp.value = "";
};

const handleGenerateOtp = async () => {
  await stores.generateOtp(stores.currentUser.email);
};
</script>
