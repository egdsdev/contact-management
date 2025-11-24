<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Navbar -->
    <Navbar />

    <!-- Conteúdo principal -->
    <main class="container mx-auto p-6">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
</script>

<style>
/* Pode colocar estilos globais adicionais aqui */
</style>
