import { createRouter, createWebHistory } from 'vue-router'
import { session } from './data/session'
import { userResource } from '@/data/user'

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: {
      name: 'ProductsListPage'
    }
  },
  {
    name: 'ProductsListPage',
    path: '/products',
    component: () => import('@/pages/Products.vue'),
    meta: {
      requiresLogin: true
    }
  },
  {
    name: 'ProductDetailsPage',
    path: '/products/:name',
    component: () => import('@/pages/ProductDetails.vue')
  },
  {
    name: 'CheckoutPage',
    path: '/checkout',
    component: () => import('@/pages/CheckoutPage.vue'),
    meta: {
      requiresLogin: true
    }
  },
  {
    name: 'OrderConfirmationPage',
    path: '/order_confirmation',
    component: () => import('@/pages/OrderConfirmation.vue'),
  },
  // {
  //   name: 'Login',
  //   path: '/login',
  //   component: () => import('@/pages/Login.vue'),
  // },
  {
    name: 'Notfound',
    path: '/not_found',
    component: () => import('@/pages/Notfound.vue'),
  },
]

let router = createRouter({
  history: createWebHistory('/vue_form'),
  routes,
})

router.beforeEach(async (to, from, next) => {
  let isLoggedIn = session.isLoggedIn
  try {
    await userResource.promise
  } catch (error) {
    isLoggedIn = false
  }
  let allowed = "Administrator" 

  // if (to.name === 'Login' && isLoggedIn) {
  //   next({ name: 'Home' })
  // } else if (to.name !== 'Login' && !isLoggedIn) {
  //   next({ name: 'Login' })
  // } else if (to.name === 'Home' && userResource.data !== allowed && isLoggedIn){
  //   console.log("YES")
  //   next({ name: 'Notfound'})
  // } else {
  //   next()
  // }
  console.log(isLoggedIn)

  if (to.meta.requiresLogin && !isLoggedIn) {
    console.log("IN")
    window.location.href = "/login?redirect-to=/vue_form"
  }
  next()
})

export default router
