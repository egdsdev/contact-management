<template>
  <div class="min-h-screen flex justify-center items-start bg-gray-50 pt-32">
    <form
      @submit.prevent="submitLogin"
      class="bg-white p-8 shadow-lg rounded-xl w-full max-w-sm"
    >
      <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">
        Login
      </h1>

      <div class="mb-4">
        <label class="block mb-1 font-semibold text-gray-700">Email</label>
        <input
          v-model="form.email"
          type="email"
          placeholder="you@example.com"
          class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      <div class="mb-4">
        <label class="block mb-1 font-semibold text-gray-700">Password</label>
        <input
          v-model="form.password"
          type="password"
          placeholder="••••••••"
          class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      <button
        type="submit"
        class="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
      >
        Login
      </button>

      <p class="mt-4 text-center text-gray-600">
        Don't have an account?
        <router-link
          to="/register"
          class="text-purple-600 hover:text-purple-700 font-medium"
        >
          Register
        </router-link>
      </p>
    </form>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const form = reactive({
      email: "",
      password: "",
    });

    const submitLogin = async () => {
      try {
        await authStore.login(form.email, form.password);
        router.push("/"); // redirect after login
      } catch (err) {
        alert("Invalid credentials!");
      }
    };

    return { form, submitLogin };
  },
};
</script>
