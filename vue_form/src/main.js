import './index.css'

import { createApp, reactive } from 'vue'
import router from './router'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

import {
  Button,
  Card,
  Input,
  setConfig,
  frappeRequest,
  resourcesPlugin,
} from 'frappe-ui'

import Home from './pages/Products.vue'
import About from './pages/About.vue'
import Contact from './pages/Contact.vue'
import Login from './pages/Login.vue'
import Notfound from './pages/Notfound.vue'

// const router = createRouter({
//   history: createWebHistory(),
//   routes: [
//     {
//       name: 'home',
//       path: '/vue_form/',
//       component: Home
//     },
//     {
//       name: 'about',
//       path: '/vue_form/about',
//       component: About
//     },
//     {
//       name: 'contact',
//       path: '/vue_form/contact',
//       component: Contact
//     },
//     {
//       name: 'login',
//       path: '/vue_form/login',
//       component: Login
//     },
//     {
//       name: 'Notfound',
//       path: '/vue_form/not_found',
//       component: Notfound
//     },
//     {
//       name: 'Checkout',
//       path: '/vue_form/checkout'
//       // component: Notfound
//     },
//     {
//       path: '/vue_form/editor/:id',
//       component: About
//     }
//   ],
// })
let app = createApp(App)

let cartData = localStorage.getItem('cart')
if (!cartData) {
  const cartJSON = JSON.stringify({
    items: [],
  })
  localStorage.setItem('cart', cartJSON)
  cartData = {
    items: [],
  }
} else {
  cartData = JSON.parse(cartData)
}

const cart = reactive(cartData)
// const cart = reactive({
//   items: cartData.items
// })

app.provide("cart", cart)

setConfig('resourceFetcher', frappeRequest)

app.use(router)
app.use(resourcesPlugin)

app.component('Button', Button)
app.component('Card', Card)
app.component('Input', Input)

const options = {}
app.use(Toast, options)

app.mount('#app')
