<template>
  <section
    class="w-screen min-h-screen flex flex-col justify-center font-poppins"
  >
    <div class="py-10 lg:px-20 md:px-10 px-5">
      <h1
        class="font-extrabold text-3xl lg:text-start md:text-start text-center"
      >
        Libbilion
      </h1>

      <div
        class="mt-4 grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 md:gap-4 gap-2"
      >
        <div class="flex flex-col gap-5">
          <div class="py-5 space-y-2 lg:text-start md:text-start text-center">
            <h1 class="font-extrabold lg:text-5xl md:text-4xl text-xl">
              Hola,
            </h1>
            <h1 class="font-extrabold lg:text-5xl md:text-4xl text-xl">
              Welcome Back
            </h1>
            <h4 class="font-extralight lg:text-3xl md:text-xl text-md">
              Hey, Welcome back to your special place
            </h4>
          </div>

          <AuthForm mode="login" @submit="onHandleSubmit" />

          <p>
            Dont have acouut,
            <span class="font-extrabold"
              ><router-link to="/sign-up">Sign Up</router-link></span
            >
          </p>
        </div>
        <div class="lg:block md:block hidden">
          <figure
            class="shadow-[23px_12px_14px_2px_rgba(0,0,0,0.47)] rounded-md h-[500px]"
          >
            <img
              src="https://i.pinimg.com/564x/cc/f1/74/ccf174731daa832bfc400ac2c602ef56.jpg"
              class="w-full h-full object-cover rounded-lg"
              loading="lazy"
            />
          </figure>
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
  authStore.login(payload);
};
</script>
