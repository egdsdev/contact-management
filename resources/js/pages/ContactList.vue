<template>
  <div class="min-h-screen flex justify-center items-start bg-gray-50 p-6">
    <div class="w-full max-w-6xl bg-white shadow-lg rounded-xl p-6" :style="{ minHeight: 'calc(100vh - 4rem)' }">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-purple-700">Contacts</h1>
        <router-link
          v-if="isLoggedIn"
          to="/contacts/create"
          class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-green-600 transition"
        >
          New Contact
        </router-link>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full text-left border-collapse">
          <thead class="bg-gray-200">
            <tr>
              <th class="px-4 py-2">Name</th>
              <th class="px-4 py-2">Contact</th>
              <th class="px-4 py-2">Email</th>
              <th class="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="contact in store.contacts"
              :key="contact.id"
              class="border-b hover:bg-gray-50 transition"
            >
              <td class="px-4 py-2">{{ contact.name }}</td>
              <td class="px-4 py-2">{{ contact.contact }}</td>
              <td class="px-4 py-2">{{ contact.email }}</td>
              <td class="px-4 py-2 text-right flex justify-end gap-3">
                <router-link
                  :to="`/contacts/${contact.id}`"
                  title="View"
                  class="text-gray-500 hover:text-blue-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                       viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </router-link>

                <router-link
                  v-if="isLoggedIn"
                  :to="`/contacts/${contact.id}/edit`"
                  title="Edit"
                  class="text-gray-500 hover:text-yellow-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                       viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536M9 11l6 6L21 9l-6-6-6 6z"/>
                  </svg>
                </router-link>

                <button
                  v-if="isLoggedIn"
                  @click="del(contact.id)"
                  title="Delete"
                  class="text-gray-500 hover:text-red-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                       viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-6 0V5a2 2 0 012-2h2a2 2 0 012 2v2"/>
                  </svg>
                </button>
              </td>
            </tr>

            <tr v-if="store.contacts.length === 0">
              <td colspan="4" class="text-center py-6 text-gray-400">
                No contacts found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useContactStore } from '../stores/contactStore';
import { useAuthStore } from '../stores/authStore';

const store = useContactStore();
const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.isLoggedIn);

onMounted(() => {
  store.fetchContacts();
});

function del(id) {
  if (confirm('Are you sure you want to delete this contact?')) {
    store.deleteContact(id).then(() => store.fetchContacts());
  }
}
</script>
