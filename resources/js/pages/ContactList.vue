<template>
  <div class="min-h-screen flex justify-center items-start bg-gray-50 p-6">
    <div
      class="w-full max-w-6xl bg-white shadow-lg rounded-xl p-6"
      :style="{ minHeight: 'calc(100vh - 4rem)' }"
    >
      <!-- Cabeçalho -->
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

      <!-- Tabela -->
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
              v-for="contact in paginatedContacts"
              :key="contact.id"
              class="border-b hover:bg-gray-50 transition"
            >
              <td class="px-4 py-2">{{ contact.name }}</td>
              <td class="px-4 py-2">{{ contact.contact }}</td>
              <td class="px-4 py-2">{{ contact.email }}</td>
              <td class="px-4 py-2 text-right flex justify-end gap-3">
                <!-- ações -->
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

      <!-- Paginação -->
      <div v-if="totalPages > 1" class="flex justify-center items-center mt-4 gap-2">
        <!-- Prev -->
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-3 py-1 rounded border bg-white text-gray-700 disabled:opacity-50"
        >
          Prev
        </button>

        <!-- Números limitados -->
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="currentPage = page"
          :class="[
            'px-3 py-1 rounded border transition',
            page === currentPage
              ? 'bg-purple-600 text-white border-purple-600'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-purple-50'
          ]"
        >
          {{ page }}
        </button>

        <!-- Next -->
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 rounded border bg-white text-gray-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue';
import { useContactStore } from '../stores/contactStore';
import { useAuthStore } from '../stores/authStore';

const store = useContactStore();
const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.isLoggedIn);

const currentPage = ref(1);
const perPage = 20;

const paginatedContacts = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  const end = start + perPage;
  return store.contacts.slice(start, end);
});

const totalPages = computed(() =>
  Math.ceil(store.contacts.length / perPage)
);

// Mostrar no máximo 5 páginas por vez
const visiblePages = computed(() => {
  const maxVisible = 5;
  let start = Math.max(currentPage.value - 2, 1);
  let end = Math.min(start + maxVisible - 1, totalPages.value);

  // Ajusta se estiver no final
  if (end - start < maxVisible - 1) {
    start = Math.max(end - maxVisible + 1, 1);
  }

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

onMounted(() => {
  store.fetchContacts();
});

function del(id) {
  if (confirm('Are you sure you want to delete this contact?')) {
    store.deleteContact(id).then(() => store.fetchContacts());
  }
}
</script>
