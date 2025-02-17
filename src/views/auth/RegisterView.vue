<template>
  <section
    class="w-full min-h-screen flex flex-col justify-center font-poppins overflow-x-hidden"
  >
    <div class="py-10 lg:px-20 md:px-10 px-5">
      <h1
        class="font-extrabold text-3xl lg:text-start md:text-start text-center"
      >
        Libblion
      </h1>

      <div
        class="mt-4 grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 md:gap-4 gap-2"
      >
        <div class="lg:block md:block hidden">
          <figure
            class="shadow-[-15px_10px_5px_-3px_rgba(0,0,0,0.47)] rounded-md h-[600px]"
          >
            <img
              src="https://i.pinimg.com/564x/cc/f1/74/ccf174731daa832bfc400ac2c602ef56.jpg"
              class="w-full h-full object-cover rounded-lg"
              loading="lazy"
            />
          </figure>
        </div>
        <div class="flex flex-col lg:px-10 md:px-6 px-0">
          <div class="py-5 space-y-2 lg:text-start md:text-start text-center">
            <h1 class="font-extrabold lg:text-5xl md:text-4xl text-xl">
              Welcome to Libblion
            </h1>

            <h4 class="font-extralight lg:text-3xl md:text-xl text-md">
              Sign Up to your account
            </h4>
          </div>

          <AuthForm mode="register" @submit="onHandleSubmit" />

          <p>
            You have account,
            <span class="font-extrabold"
              ><router-link to="/sign-in">Sign In</router-link></span
            >
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import AuthForm from "@/components/Form/AuthForm.vue";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();

const onHandleSubmit = (payload) => {
  authStore.register(payload);
};
</script>
