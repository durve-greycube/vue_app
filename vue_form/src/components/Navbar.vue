<template>
    <div>
        <nav class="p-4 flex items-center">
            <router-link :to="{ name: 'ProductsListPage'}" class="text-2xl font-bold text-blue-500">
                ✨ Star Store ✨
            </router-link>
            <button @click="cartDialogShown = true" class="flex items-center ml-auto">
                <FeatherIcon class="h-8" name="shopping-cart" />
                <Badge variant="solid">{{ cart.items.length }}</Badge>
            </button>
            <hr>
        </nav>
    </div>
    <Dialog :options="{
    title: 'Your Cart',
    size: '2xl',
    actions: [
        {
            label: 'Proceed to Checkout',
            variant: 'solid',
            size: 'lg',
            onclick: () => {
                cartDialogShown = false
                router.push({
                    name: 'CheckoutPage'
                })
            }
        }
    ]
    }"
    v-model="cartDialogShown">
        <template #body-content>
            <ol class="list-decimal list-inside space-y-2">
                <li v-for="item in cart.items">
                    {{ item.product }}
                    <FormControl type="number" v-model="item.qty" placeholder="Qty"></FormControl>
                    <Button class="flex" variant="outline" theme="red" size="sm" @click="removeProductFromCart(index)">
                        <FeatherIcon name="trash-2" class="h-4 flex-auto" />
                        Remove
                    </Button>
                </li>
            </ol>
        </template>
    </Dialog>
</template>


<script setup>
import { FeatherIcon, Badge, Dialog, FormControl, Button } from 'frappe-ui';
import {inject, ref} from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const cart = inject("cart")
console.log(cart.length, "Cart Injected")

const cartDialogShown = ref(false)

function removeProductFromCart(index) {
    cart.items.splice(index, 1)
}
</script>