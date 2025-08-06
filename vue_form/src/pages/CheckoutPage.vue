<template>
    <div>
        <!-- <h1> Checkout Page</h1> -->
         <p v-if="cart.items.length === 0">Cart Empty</p>
        <Button v-else 
        :loading="placeOrderResources.loading" 
        variant="solid"
        @click="addressDialogShown = true"
        >
        Place Order
        </Button>

        <Dialog :options="{
            title: 'Add Address Details',
            size: '2xl',
            actions: [
                {
                    label: 'Proceed',
                    variant: 'solid',
                    size: 'lg',
                    onclick: () => {
                        addressDialogShown = false
                        placeOrderResources.submit()
                        router.push({
                            name: 'OrderConfirmationPage',
                            // params: { orderId: data.name }
                        })
                    }
                }
            ]
            }"
            v-model="addressDialogShown">
            <template #body-content>
                <div
                class="p-2"
                :required="true"
                >
                <FormControl
                    :type="'textarea'"
                    :ref_for="true"
                    size="sm"
                    variant="subtle"
                    placeholder="Address Details"
                    :disabled="false"
                    label="Address"
                    v-model="inputAddress"
                />
                </div>
            </template>

        </Dialog>


    <ErrorMessage :message="placeOrderResources.error"></ErrorMessage>
    </div>
</template>


<script setup>
import { ref } from 'vue';
import { createResource, Button, ErrorMessage, Dialog, FormControl } from 'frappe-ui';
import { useToast } from "vue-toastification";
import { inject } from 'vue';
import { useRouter } from 'vue-router'

const cart = inject("cart")
const inputAddress = ref("");
const router = useRouter()
const addressDialogShown = ref(false)
const toast = useToast();

const placeOrderResources = createResource({
    url:'vue_app.api.checkout_cart',
    makeParams() {
        return {
            products: cart.items,
            address: inputAddress.value
        }
    },
    onSuccess(data) {
        toast.success("Order placed successfully!",{
            position: "bottom-right",
            timeout: 2000,
            closeOnClick: true,
            pauseOnHover: true,
        });
        cart.items = [];
        console.log("Order placed successfully:", data.name);
        router.push({
            name: 'OrderConfirmationPage',
            makeParams() {
                return { orderId: data.name }
            }
        });
    },
},
inputAddress.value = "",
// cart.items.pop({
//     product: 
// })
)
</script>