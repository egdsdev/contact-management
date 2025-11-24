import { createRouter, createWebHistory } from 'vue-router';
import ContactList from '../pages/ContactList.vue';
import ContactForm from '../pages/ContactForm.vue';
import ContactView from '../pages/ContactView.vue';
import Login from '../pages/Login.vue';

const routes = [
    { path: '/', name: 'contacts.index', component: ContactList },
    { path: '/login', name: 'login', component: Login },
    { path: '/contacts/create', name: 'contacts.create', component: ContactForm },
    { path: '/contacts/:id', name: 'contacts.show', component: ContactView, props: true },
    { path: '/contacts/:id/edit', name: 'contacts.edit', component: ContactForm, props: true },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
