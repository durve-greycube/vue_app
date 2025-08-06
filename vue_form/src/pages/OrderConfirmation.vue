<template>
   <div class="flex flex-col lg:mx-80 mt-52 p-6 bg-gray-100 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div class="text-green-500">
            <FeatherIcon class="h-40 pt-50 flex mx-auto items-center justify-center" name="check-circle" />
            <p class="font-bold justify-center items-center flex">Order is Placed Successfully !!!</p>
            <p class="font-bold justify-center items-center flex">Thank you for your order 😄</p>
        </div>
        <div class="m-3 flex flex-row items-center justify-center">
            <router-link :to="{ name: 'ProductsListPage'}" class="text-2xl font-bold text-blue-500">
                <Button variant="solid" size="lg">
                    <template #suffix>
                        <FeatherIcon class="h-6" name="home" />
                    </template>
                    Go to Store
                </Button>
            </router-link>
        </div>
   </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
import { FeatherIcon, Button } from 'frappe-ui'

const router = useRoute()

// function goToStorePage() {
//     router.push({ name: 'ProductsListPage' })
// }
console.log(router.params, "Order ID from route params")
</script>
