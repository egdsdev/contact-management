<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="bg-white p-8 rounded shadow w-96">
            <h1 class="text-2xl font-bold mb-4">Login</h1>
            <form @submit.prevent="submit">
                <input v-model="email" type="email" placeholder="Email" class="w-full mb-2 p-2 border rounded" />
                <input v-model="password" type="password" placeholder="Senha" class="w-full mb-4 p-2 border rounded" />
                <button type="submit" class="bg-blue-500 text-white w-full py-2 rounded">Login</button>
            </form>
            <p class="mt-4 text-center text-gray-600">
                Não tem conta?
                <router-link to="/register" class="text-blue-500 hover:underline">Registrar</router-link>
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useContactStore } from '../stores/contactStore';
import { useRouter } from 'vue-router';

const store = useContactStore();
const router = useRouter();

const email = ref('');
const password = ref('');

async function submit() {
    try {
        await store.login({ email: email.value, password: password.value });
        router.push('/');
    } catch (err) {
        alert('Erro ao logar');
    }
}
</script>
