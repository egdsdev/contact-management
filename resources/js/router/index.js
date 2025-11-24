import { createRouter, createWebHistory } from 'vue-router';
import ContactList from '../pages/ContactList.vue';
import ContactForm from '../pages/ContactForm.vue';
import ContactView from '../pages/ContactView.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import { useAuthStore } from '../stores/authStore';

const routes = [
  { path: '/', name: 'contacts.index', component: ContactList },
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  {
    path: '/contacts/create',
    name: 'contacts.create',
    component: ContactForm,
    meta: { requiresAuth: true },
  },
  {
    path: '/contacts/:id',
    name: 'contacts.show',
    component: ContactView,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/contacts/:id/edit',
    name: 'contacts.edit',
    component: ContactForm,
    props: true,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Proteção de rotas
router.beforeEach(() => {
  const auth = useAuthStore();
  const token = localStorage.getItem('auth_token');

  // Atualiza o usuário no store se houver token
  if (token && !auth.user) {
    auth.user = { token }; // ou chamar fetchUser para carregar info real do backend
  }
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  const token = localStorage.getItem('auth_token');
  const isLoggedIn = !!token;

  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'login' });
  } else if ((to.name === 'login' || to.name === 'register') && isLoggedIn) {
    // Redireciona usuários logados longe da tela de login/register
    next({ name: 'contacts.index' });
  } else {
    next();
  }
});

export default router;
