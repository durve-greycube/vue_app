<template>
  <!-- <div class="max-w-3xl py-12 mx-auto">
    <h2 class="font-bold text-lg text-gray-600 mb-4">
      Welcome {{ session.user }}!
    </h2>

    <Button theme="gray" variant="solid" icon-left="code" @click="ping.fetch" :loading="ping.loading">
      Click to send 'ping' request
    </Button>
    <div>
      {{ ping.data }}
    </div>
    <pre>{{ ping }}</pre>

    <div class="flex flex-row space-x-2 mt-4">
      <Button @click="showDialog = true">Open Dialog</Button>
      <Button @click="session.logout.submit()">Logout</Button>
    </div>

    <Dialog title="Title" v-model="showDialog"> Dialog content </Dialog>
  </div> -->

  <h2 class="my-4 text-lg font-semibold text-gray-800">Our Products</h2>

  <div class="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-2" v-if="productsReource.list.data">
    <ProductsCard v-for="product in productsReource.list.data" :key="product.name" :product="product"/>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog } from 'frappe-ui'
import { createResource } from 'frappe-ui'
import { createListResource } from 'frappe-ui'
import { session } from '../data/session'

import ProductsCard from '@/components/ProductsCard.vue'

const ping = createResource({
  url: 'ping',
  auto: true,
})

const productsReource = createListResource({
  doctype: "Products",
  fields: ["name", "preview_image", "price", "currency"],
  auto: true
})

const showDialog = ref(false)
</script>
