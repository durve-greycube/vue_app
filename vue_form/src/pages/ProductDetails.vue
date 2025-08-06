<template>
    <div class="p-5">
        <div v-if="productDoc">
            <h1 class="text-2xl text-gray-900 font-black">
                {{ productDoc.name }}
            </h1>

            <div class="sm:flex sm:gap-8">
                <!-- Image Carousel -->
                <div class="flex flex-col gap-3 mt-4 w-fit">
                    <div 
                        @click="currentPreviewImageURL = image.image_url"  
                        class="p-2 border-2 border-gray-200 rounded hover:bg-black-overlay-50 cursor-pointer"
                        :class='[
                            currentPreviewImageURL === image.image_url ? "border-gray-500/90" : ""
                        ]' 
                        v-for="image in productDoc.product_image"
                    >
                        <img 
                            class="h-16"
                            :src="image.image_url" 
                            alt="Product Image" 
                        />
                    </div>
                </div>

                <!-- Current Image Preview -->
                <img class="sm:max-w-lg mt-10" :src="currentPreviewImageURL">

                <div class="prose mt-5">
                    <h2 class="text-2xl font-bold text-gray-900">Description</h2>
                    <div v-html="md.render(productDoc.description)"></div>
                </div>
            </div>

            <div class="space-y-2 mt-5">
                <p class="text-3xl font-bold text-gray-900 mt-5">{{ formattedCurrency(productDoc.price, productDoc.currency) }}</p>

                <Button @click="addProductToCart" variant="solid" size="xl">
                    <template #prefix>
                        <FeatherIcon class="h-6" name="shopping-cart" />
                    </template>
                    Add to Cart
                </Button>
            </div>
            
        </div>
    </div>
</template>
<script setup>
import { computed, ref, watch, inject } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from "vue-toastification";
import { Button, createDocumentResource, FeatherIcon } from 'frappe-ui';
import { formattedCurrency } from '@/utils'
import markdownit from 'markdown-it'

const route = useRoute()
const toast = useToast()

const cart = inject("cart")

const md = markdownit()

const currentPreviewImageURL = ref(null)

const productResource = createDocumentResource({
    doctype: "Products",
    name: route.params.name,
    auto:true,
    onSuccess(data) {
        currentPreviewImageURL.value = data.preview_image
    }
})

const productDoc = computed(() => {
    if (productResource.doc) {
        return productResource.doc
    }
})

watch(productDoc, () => {
    if (productDoc && productDoc.value.product_image.length > 0) {
        currentPreviewImageURL.value = productDoc.value.product_image[0].image_url
    }
})

function addProductToCart() {
    const productName = route.params.name

    let item_found = false
    let items_list = []
    console.log(cart.items, "1  ------------------")
    if (cart.items.length > 0) {
        for (let item of cart.items) {
            console.log("2  Checking item in cart:", productName)
            if (item.product === productName) {
                console.log("Item found in cart, updating quantity")
                // item_found = true
                items_list.push(item.product)
            } else {
                console.log("3  Item not found in cart, adding new item")
                // item_found = false
            }
        }
        console.log(item_found,"item_found")
        if (items_list.length > 0 && items_list.includes(productName)) {
                for (let item of cart.items) {
                    if (item.product === productName) {
                        console.log("Item found in cart, updating quantity")
                        item.qty += 1
                        toast.success("Item quantity updated in Cart", {
                                position: "top-right",
                                timeout: 2000,
                                closeOnClick: true,
                                pauseOnHover: true,
                            })
                        return
                    }
                }
            } else {
                cart.items.push({
                        product: productName,
                        qty: 1
                    })
                toast.success("Item added to Cart", {
                    position: "top-right",
                    timeout: 2000,
                    closeOnClick: true,
                    pauseOnHover: true,
                })
        }
    } else {
        console.log("4  Cart is empty, adding item")
        cart.items.push({
                        product: productName,
                        qty: 1
                    })
                toast.success("Item added to Cart", {
                    position: "top-right",
                    timeout: 2000,
                    closeOnClick: true,
                    pauseOnHover: true,
                })
    }
}
</script>