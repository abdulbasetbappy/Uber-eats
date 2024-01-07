import { createRouter, createWebHistory } from 'vue-router'


import HomeView from '../views/HomeView.vue';
import DefaultLayout from '../layouts/DefaultLayout.vue'
import ShopView from '../views/ShopView.vue'
import CartView from '../views/CartView.vue'
import AboutView from '../views/AboutView.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: HomeView,
        meta: { transition: 'fade-in' },
      },
      {
        path: '/About',
        name: 'About',
        component: AboutView,
        meta: { transition: 'fade-in' },
      },
      {
        path: '/Shop',
        name: 'Shop',
        component: ShopView,
        meta: { transition: 'fade-in' },
      },
      {
        path: '/Cart',
        name: 'Cart',
        component: CartView,
        meta: { transition: 'fade-in' },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;