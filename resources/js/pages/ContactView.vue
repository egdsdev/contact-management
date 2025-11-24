<template>
    <div class="p-6">
        <h1 class="text-3xl mb-4">{{ store.contact.name }}</h1>
        <p><strong>Contato:</strong> {{ store.contact.contact }}</p>
        <p><strong>Email:</strong> {{ store.contact.email }}</p>
        <div class="mt-4">
            <router-link v-if="store.token" :to="`/contacts/${store.contact.id}/edit`"
                class="text-yellow-600 mr-2">Editar</router-link>
            <button v-if="store.token" @click="del(store.contact.id)" class="text-red-600">Apagar</button>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useContactStore } from '../stores/contactStore';
import { useRoute, useRouter } from 'vue-router';

const store = useContactStore();
const route = useRoute();
const router = useRouter();

onMounted(async () => {
    await store.fetchContact(route.params.id);
});

function del(id) {
    if (confirm('Tem certeza?')) {
        store.deleteContact(id).then(() => router.push('/'));
    }
}
</script>
