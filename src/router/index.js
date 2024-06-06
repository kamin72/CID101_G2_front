import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/CartView.vue')
    },
    {
      path: '/course',
      name: 'course',
      component: () => import('@/views/CourseView.vue')
    },
    {
      path: '/game',
      name: 'game',
      component: () => import('@/views/GameView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/new',
      name: 'new',
      component: () => import('@/views/NewView.vue')
    },
    {
      path: '/product',
      name: 'product',
      component: () => import('@/views/ProductView.vue')
    },
    {
      path: '/product-detail',
      name: 'product-detail',
      component: () => import('@/views/Product-Detail-View.vue')
    }
  ]
})

export default router
