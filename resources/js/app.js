import '../css/app.css';
import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
import axios from 'axios';
import { useAuthStore } from './stores/authStore';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

// Inicializa usuário a partir do token no localStorage
const authStore = useAuthStore(pinia);
const token = localStorage.getItem('auth_token');
if (token) {
  authStore.user = { token };
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

app.mount('#app');
