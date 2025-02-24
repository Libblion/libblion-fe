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
      <p
        v-for="(error, idx) in $v.username.$errors"
        :key="idx"
        class="text-red-500"
      >
        {{ error.$message }}
      </p>
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
      <p
        v-for="(error, idx) in $v.email.$errors"
        :key="idx"
        class="text-red-500"
      >
        {{ error.$message }}
      </p>
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
      <p
        v-for="(error, idx) in $v.password.$errors"
        :key="idx"
        class="text-red-500"
      >
        {{ error.$message }}
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
        v-model="formData.password_confirmation"
        class="rounded ring-1 py-2 px-2 ring-gray-900 lg:w-[70%] w-full"
      />
      <p
        v-for="(error, idx) in $v.password_confirmation.$errors"
        :key="idx"
        class="text-red-500"
      >
        {{ error.$message }}
      </p>
    </div>

    <div>
      <button
        type="submit"
        :class="[
          'bg-black py-2 px-8 text-white lg:w-[30%] w-full rounded-2xl cursor-pointer',
          { 'opacity-50 cursor-not-allowed': authStore.isLoading },
        ]"
      >
        <span v-if="authStore.isLoading">Loading...</span>
        <span v-else>{{ mode === "login" ? "Sign In" : "Sign Up" }}</span>
      </button>
    </div>
  </form>
</template>

<script setup>
import { computed, reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();

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
  password_confirmation: "",
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
    password_confirmation: props.mode === "register" ? { required } : {},
  };
});

const $v = useVuelidate(rules, formData);

const handleSubmit = () => {
  const payload =
    props.mode === "register"
      ? { ...formData }
      : { email: formData.email, password: formData.password };

  $v.value.$touch();

  if ($v.value.$invalid) return;

  emit("submit", payload);
};
</script>
