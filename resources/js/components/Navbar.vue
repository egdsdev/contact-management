<template>
  <nav class="bg-white shadow px-6 py-4 flex justify-between items-center">
    <div class="text-2xl font-bold text-gray-800">
      Contact Manager
    </div>

    <div class="space-x-4">
      <router-link
        to="/"
        class="text-gray-700 hover:text-gray-900 font-semibold"
      >
        Home
      </router-link>

      <button
        v-if="isLoggedIn"
        @click="logout"
        class="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Logout
      </button>

      <router-link
        v-else
        to="/login"
        class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Login
      </router-link>
    </div>
  </nav>
</template>

<script>
import { computed } from "vue";
import { useAuthStore } from "../stores/authStore";

export default {
  setup() {
    const authStore = useAuthStore();
    const isLoggedIn = computed(() => authStore.isLoggedIn);

    const logout = async () => {
      await authStore.logout();
    };

    return { isLoggedIn, logout };
  },
};
</script>
