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
      path: '/cartdelivery_comp',
      name: 'cartdelivery_comp',
      component: () => import('@/views/CartDeliveryComp.vue')
    },
    {
      path: '/credit_card',
      name: 'credit_card',
      component: () => import('@/views/CartPayinfo.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/SignupView.vue')
    },
    {
      path: '/forget',
      name: 'forget',
      component: () => import('@/views/ForgetView.vue')
    },
    {
      path: '/forgetok',
      name: 'forgetok',
      component: () => import('@/views/ForgetokView.vue')
    },
    {
      path: '/memberform',
      name: 'memberform',
      component: () => import('@/views/MemberformView.vue')
    },
    {
      path: '/memberformok',
      name: 'memberformok',
      component: () => import('@/views/MemberformokView.vue')
    },
    {
      path: '/wholesalerform',
      name: 'wholesalerform',
      component: () => import('@/views/WholesalerformView.vue')
    },
    {
      path: '/wholesalerformok',
      name: 'wholesalerformok',
      component: () => import('@/views/WholesalerformokView.vue')
    },
    {
      path: '/membercenter',
      name: 'membercenter',
      component: () => import('@/views/MemberCenterView.vue')
    },
    
  ]
})

export default router
