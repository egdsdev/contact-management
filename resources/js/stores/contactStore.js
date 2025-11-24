import { defineStore } from 'pinia';
import axios from 'axios';

export const useContactStore = defineStore('contactStore', {
  state: () => ({
    contacts: [],
    contact: null,
    isAuthenticated: false,
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
    async createContact(data) {
      const res = await axios.post('/api/contacts', data);
      this.contacts.push(res.data);
    },
    async updateContact(id, data) {
      const res = await axios.put(`/api/contacts/${id}`, data);
      const index = this.contacts.findIndex(c => c.id === id);
      if (index !== -1) this.contacts[index] = res.data;
    },
    async deleteContact(id) {
      await axios.delete(`/api/contacts/${id}`);
      this.contacts = this.contacts.filter(c => c.id !== id);
    },
    login() {
      this.isAuthenticated = true;
    },
    logout() {
      this.isAuthenticated = false;
    },
  },
});
