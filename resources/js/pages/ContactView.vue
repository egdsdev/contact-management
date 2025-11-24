<template>
  <div class="min-h-screen flex justify-center items-center bg-gray-50 px-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-0 -translate-y-12">
      <!-- Header -->
      <h1 class="text-3xl font-extrabold text-center text-purple-700">
        Contact Details
      </h1>

      <!-- Contact Info -->
      <div class="space-y-4">
        <div class="flex flex-col">
          <span class="text-gray-500 font-semibold">Name</span>
          <span class="text-gray-800 text-lg">{{ contact.name }}</span>
        </div>

        <div class="flex flex-col">
          <span class="text-gray-500 font-semibold">Contact</span>
          <span class="text-gray-800 text-lg">{{ contact.contact }}</span>
        </div>

        <div class="flex flex-col">
          <span class="text-gray-500 font-semibold">Email</span>
          <span class="text-gray-800 text-lg">{{ contact.email }}</span>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex justify-end gap-4 mt-6">
        <router-link
          v-if="isLoggedIn"
          :to="`/contacts/${contact.id}/edit`"
          class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          Edit
        </router-link>

        <button
          v-if="isLoggedIn"
          @click="deleteContact"
          class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useContactStore } from "../stores/contactStore";
import { reactive, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const contactStore = useContactStore();
    const route = useRoute();
    const router = useRouter();

    const contact = reactive({ id: "", name: "", contact: "", email: "" });
    const isLoggedIn = computed(() => !!localStorage.getItem("auth_token"));

    const loadContact = async () => {
      try {
        await contactStore.fetchContact(route.params.id); // pega apenas 1 contato
        Object.assign(contact, contactStore.contact);
      } catch (err) {
        alert("Failed to load contact data.");
      }
    };

    const deleteContact = async () => {
      if (confirm("Are you sure?")) {
        await contactStore.deleteContact(contact.id);
        router.push("/");
      }
    };

    onMounted(loadContact);

    return { contact, deleteContact, isLoggedIn };
  },
};
</script>
