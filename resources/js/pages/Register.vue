<template>
    <div class="min-h-screen flex justify-center items-start bg-gray-50 pt-32">
        <form @submit.prevent="register" class="bg-white p-8 shadow-lg rounded-xl w-full max-w-sm">
            <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">
                Register
            </h1>

            <div class="mb-4">
                <label class="block mb-1 font-semibold text-gray-700">Name</label>
                <input type="text" v-model="form.name" placeholder="Your name"
                    class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    required />
            </div>

            <div class="mb-4">
                <label class="block mb-1 font-semibold text-gray-700">Email</label>
                <input type="email" v-model="form.email" placeholder="you@example.com"
                    class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    required />
            </div>

            <div class="mb-4">
                <label class="block mb-1 font-semibold text-gray-700">Password</label>
                <input type="password" v-model="form.password" placeholder="••••••••"
                    class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    required />
            </div>

            <div class="mb-4">
                <label class="block mb-1 font-semibold text-gray-700">Confirm Password</label>
                <input type="password" v-model="form.password_confirmation" placeholder="••••••••"
                    class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    required />
            </div>

            <button type="submit"
                class="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition">
                Register
            </button>

            <p class="mt-4 text-center text-gray-600">
                Already have an account?
                <router-link to="/login" class="text-purple-600 hover:text-purple-700 font-medium">
                    Login
                </router-link>
            </p>
        </form>
    </div>
</template>

<script>
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
    data() {
        return {
            form: {
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
            },
        };
    },
    setup() {
        const store = useAuthStore();
        const router = useRouter();
        return { store, router };
    },
    methods: {
        methods: {
            async register() {
                try {
                    const res = await axios.post('/api/register', this.form);

                    // grava token e usuário
                    this.store.token = res.data.token;
                    this.store.user = res.data.user;
                    localStorage.setItem('auth_token', res.data.token);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;

                    // redireciona para lista de contatos
                    this.router.push({ name: 'contacts.index' });
                } catch (err) {
                    alert('Registration failed. Please check your data.');
                }
            }
        }

    },
};
</script>
