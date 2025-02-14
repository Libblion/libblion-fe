<template>
  <section
    class="w-screen min-h-screen flex flex-col justify-center font-poppins"
  >
    <div class="py-10 px-20">
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

          <form @submit.prevent="onHandleSubmit" class="space-y-5 py-5">
            <div class="block">
              <label class="block mb-1 text-start" id="email">Email</label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                v-model="formData.email"
                class="rounded ring-1 py-2 px-2 ring-gray-900 lg:w-[70%] w-full"
              />
              <p v-if="$v.email.$error" class="text-red-500">
                Email tidak valid
              </p>
            </div>
            <div class="block">
              <label class="block mb-1 text-start" id="email">Password</label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                v-model="formData.password"
                class="rounded ring-1 py-2 px-2 ring-gray-900 lg:w-[70%] w-full"
              />
              <p v-if="$v.password.$error" class="text-red-500">
                Password wajib diisi dan minimal 6 karakter
              </p>
            </div>

            <div>
              <button
                type="submit"
                class="bg-black py-2 px-8 text-white lg:w-[30%] w-full rounded-2xl cursor-pointer"
              >
                Login
              </button>
            </div>
          </form>

          <p>
            Dont have acouut,
            <span class="font-extrabold"
              ><router-link href="/sign-up">Sign Up</router-link></span
            >
          </p>
        </div>
        <div class="lg:block md:block hidden h-[500px]">
          <figure class="shadow-[23px_12px_14px_2px_rgba(0,0,0,0.47)] rounded-md h-full">
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
import { computed, reactive, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { useRouter } from "vue-router";
import { required } from "@vuelidate/validators";

const router = useRouter();

const dummyUser = [
  {
    email: "user@example.com",
    password: "password123",
  },
  {
    email: "user2@example.com",
    password: "password1234",
  },
];

const formData = reactive({
  email: "",
  password: "",
});

const rules = computed(() => {
  return {
    email: {
      required,
    },
    password: {
      required,
    },
  };
});

const $v = useVuelidate(rules, formData);

const onHandleSubmit = () => {
  const payload = {
    email: formData.email,
    password: formData.password,
  };

  $v.value.$touch();

  if ($v.value.$invalid) {
    console.log("ini error");
  }

  const user = dummyUser.find(
    (user) => user.email === payload.email && user.password === payload.password
  );

  if (user) {
    formData.email = "";
    formData.password = "";
    router.push("/");
  }
};
</script>
