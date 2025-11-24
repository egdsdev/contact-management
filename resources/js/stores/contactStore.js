import { defineStore } from 'pinia';
import axios from 'axios';

export const useContactStore = defineStore('contactStore', {
    state: () => ({
        contacts: [],
        contact: null,
        user: null,
        token: localStorage.getItem('token') || null,
    }),
    actions: {
        async fetchContacts() {
            const res = await axios.get('/api/contacts');
            this.contacts = res.data;
        },
        async fetchContact(id) {
            const res = await axios.get(`/api/contacts/${id}`);
            this.contact = res.data;
        },
        async addContact(data) {
            await axios.post('/api/contacts', data, this.getAuthHeader());
        },
        async updateContact(id, data) {
            await axios.put(`/api/contacts/${id}`, data, this.getAuthHeader());
        },
        async deleteContact(id) {
            await axios.delete(`/api/contacts/${id}`, this.getAuthHeader());
        },
        async login(credentials) {
            const res = await axios.post('/api/login', credentials);
            this.token = res.data.token;
            localStorage.setItem('token', this.token);
        },
        async logout() {
            this.token = null;
            localStorage.removeItem('token');
        },
        getAuthHeader() {
            return { headers: { Authorization: `Bearer ${this.token}` } };
        }
    }
});
