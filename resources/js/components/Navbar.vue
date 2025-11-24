<template>
    <nav class="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div class="font-bold text-lg">
            <router-link to="/">Contact Management</router-link>
        </div>

        <div class="flex items-center space-x-4">
            <router-link to="/" class="hover:underline">Home</router-link>

            <template v-if="store.token">
                <span class="mr-2">Bem-vindo!</span>
                <button @click="logout" class="bg-red-500 hover:bg-red-600 px-3 py-1 rounded">
                    Logout
                </button>
            </template>

            <template v-else>
                <router-link to="/login" class="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded">
                    Login
                </router-link>
            </template>
        </div>
    </nav>
</template>

<script setup>
import { useContactStore } from '../stores/contactStore';
import { useRouter } from 'vue-router';

const store = useContactStore();
const router = useRouter();

function logout() {
    store.logout();
    router.push('/login');
}
</script>
