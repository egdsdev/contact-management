<template>
    <div class="p-6">
        <h1 class="text-3xl mb-4">{{ isEdit ? 'Editar Contato' : 'Novo Contato' }}</h1>
        <form @submit.prevent="submit">
            <input v-model="name" placeholder="Nome" class="w-full mb-2 p-2 border rounded" />
            <input v-model="contact" placeholder="+55 11987654321" class="w-full mb-2 p-2 border rounded" />
            <input v-model="email" placeholder="Email" class="w-full mb-2 p-2 border rounded" />
            <button class="bg-blue-500 text-white px-4 py-2 rounded">{{ isEdit ? 'Atualizar' : 'Criar' }}</button>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useContactStore } from '../stores/contactStore';
import { useRouter, useRoute } from 'vue-router';

const store = useContactStore();
const router = useRouter();
const route = useRoute();

const isEdit = route.name === 'contacts.edit';
const id = route.params.id;

const name = ref('');
const contact = ref('');
const email = ref('');

onMounted(async () => {
    if (isEdit) {
        await store.fetchContact(id);
        name.value = store.contact.name;
        contact.value = store.contact.contact;
        email.value = store.contact.email;
    }
});

async function submit() {
    const data = { name: name.value, contact: contact.value, email: email.value };
    try {
        if (isEdit) await store.updateContact(id, data);
        else await store.addContact(data);
        router.push('/');
    } catch (err) {
        alert('Erro ao salvar');
    }
}
</script>
