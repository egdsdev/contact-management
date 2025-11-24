<template>
    <div class="p-6">
        <h1 class="text-3xl mb-4">Contatos</h1>
        <router-link v-if="store.token" to="/contacts/create"
            class="bg-green-500 px-4 py-2 text-white rounded mb-4 inline-block">Novo Contato</router-link>
        <table class="w-full border">
            <thead class="bg-gray-200">
                <tr>
                    <th class="p-2">Nome</th>
                    <th class="p-2">Contato</th>
                    <th class="p-2">Email</th>
                    <th class="p-2">Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="contact in store.contacts" :key="contact.id" class="border-b">
                    <td class="p-2">{{ contact.name }}</td>
                    <td class="p-2">{{ contact.contact }}</td>
                    <td class="p-2">{{ contact.email }}</td>
                    <td class="p-2">
                        <router-link :to="`/contacts/${contact.id}`" class="text-blue-600 mr-2">Ver</router-link>
                        <router-link v-if="store.token" :to="`/contacts/${contact.id}/edit`"
                            class="text-yellow-600 mr-2">Editar</router-link>
                        <button v-if="store.token" @click="del(contact.id)" class="text-red-600">Apagar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useContactStore } from '../stores/contactStore';

const store = useContactStore();

onMounted(() => {
    store.fetchContacts();
});

function del(id) {
    if (confirm('Tem certeza?')) {
        store.deleteContact(id).then(() => store.fetchContacts());
    }
}
</script>
