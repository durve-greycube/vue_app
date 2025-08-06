<template>
   <Navbar />
   <div class="m-3">
    <router-view />
   </div>
</template>

<script setup>
import { inject, watch } from 'vue';
import Navbar from './components/Navbar.vue';

const cart = inject("cart");

watch(cart.items, () => {
   localStorage.setItem("cart", JSON.stringify(cart))
})
</script>