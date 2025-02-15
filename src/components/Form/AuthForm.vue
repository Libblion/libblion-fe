<template>
  <form @submit.prevent="handleSubmit" class="space-y-5 py-5 flex-1">
    <div class="block" v-if="mode === 'register'">
      <label class="block mb-1 text-start" id="username">Username</label>
      <input
        type="username"
        placeholder="username"
        name="username"
        v-model="formData.username"
        class="rounded ring-1 py-2 px-2 ring-gray-900 lg:w-[70%] w-full"
      />
      <p v-if="$v.username.$error" class="text-red-500">Username tidak valid</p>
    </div>
    <div class="block">
      <label class="block mb-1 text-start" id="email">Email</label>
      <input
        type="email"
        placeholder="Email"
        name="email"
        v-model="formData.email"
        class="rounded ring-1 py-2 px-2 ring-gray-900 lg:w-[70%] w-full"
      />
      <p v-if="$v.email.$error" class="text-red-500">Email tidak valid</p>
    </div>
    <div class="block">
      <label class="block mb-1 text-start" id="password">Password</label>
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

    <div class="block" v-if="mode === 'register'">
      <label class="block mb-1 text-start" id="confirmPassword"
        >Confirm Password</label
      >
      <input
        type="password"
        placeholder="confirmPassword"
        name="confirmPassword"
        v-model="formData.confirmPassword"
        class="rounded ring-1 py-2 px-2 ring-gray-900 lg:w-[70%] w-full"
      />
      <p v-if="$v.confirmPassword.$error" class="text-red-500">
        Password tidak sama
      </p>
    </div>

    <div>
      <button
        type="submit"
        class="bg-black py-2 px-8 text-white lg:w-[30%] w-full rounded-2xl cursor-pointer"
      >
        {{ mode === "login" ? "Sign In" : "Sign Up" }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { computed, reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const props = defineProps({
  mode: {
    type: String,
    default: "login",
  },
});

const emit = defineEmits(["submit"]);

const formData = reactive({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const rules = computed(() => {
  return {
    username: props.mode === "register" ? { required } : {},
    email: {
      required,
    },
    password: {
      required,
    },
    confirmPassword: props.mode === "register" ? { required } : {},
  };
});

const $v = useVuelidate(rules, formData);

const handleSubmit = () => {
  const payload =
    props.mode === "register"
      ? { ...formData }
      : { email: formData.email, password: formData.password };

  $v.value.$touch();

  if ($v.value.$invalid) {
    console.log("ini error");
  }

  emit("submit", payload);
};
</script>
