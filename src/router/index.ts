import { createRouter, createWebHistory } from 'vue-router'


import HomeView from '../views/HomeView.vue';
import DefaultLayout from '../layouts/DefaultLayout.vue'
import ShopView from '../views/ShopView.vue'
import CartView from '../views/CartView.vue'
import AboutView from '../views/AboutView.vue'
import NotFound from '../views/404View.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: HomeView,
      },
      {
        path: '/About',
        name: 'About',
        component: AboutView,
      },
      {
        path: '/Shop',
        name: 'Shop',
        component: ShopView,
      },
      {
        path: '/Cart',
        name: 'Cart',
        component: CartView,
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    return savedPosition ||  new Promise((resolve) => {
      setTimeout(() => {
        resolve({ top: 0, behavior: 'smooth' })
      }, 300)
    })
  }  
});

export default router;