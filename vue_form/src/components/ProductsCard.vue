<template>
    <router-link :to="{
        name: 'ProductDetailsPage',
        params: {
            name: product.name
        }
    }" class="shadow-md p-4 space-y-2 rounded-sm flex flex-col items-start">
      <div>
        <img :src="product.preview_image" alt="Previwe Image">
        <p class="text-base font-medium text-gray-700 mt-2">{{ product.name }}</p>
      </div>
      <p class="text-xl font-bold text-gray-900 align-baseline">{{ formattedCurrency(product.price, product.currency) }}</p>
    </router-link>
</template>
<script setup>
import { formattedCurrency } from '@/utils'

    const props = defineProps({
        product: Object
    })
</script>
<style>
    
</style>