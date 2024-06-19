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
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/cart_comp',
      name: 'cart_comp',
      component: () => import('@/views/CartViewComp.vue'),
      children: [
        { path: 'cartdelivery_comp', component: () => import('@/views/CartDeliveryComp.vue') },
        {
          path: 'pay_info',
          component: () => import('@/views/CartPayinfo.vue'),
          props: (route) => ({ method: route.query.method })
        },
        {
          path: 'cart_finish',
          component: () => import('@/views/CartFinish.vue'),
          // 避免從購物車頁面直接訪問到購物完成頁面
          beforeEnter: (to, from, next) => {
            if (from.query.method && from.path.includes('pay_info')) {
              next()
            } else {
              next('/cart_comp')
            }
          }
        }
      ]
    },
    {
      path: '/cart_account',
      name: 'cart_account',
      component: () => import('@/views/CartViewAccount.vue'),
      children: [
        {
          path: 'cartdelivery_account',
          name: 'cartdelivery_account',
          component: () => import('@/views/CartDeliveryAccount.vue')
        },
        {
          path: 'cart_finish_account',
          name: 'cart_finish_account',
          component: () => import('@/views/CartFinishAccount.vue'),
          beforeEnter: (to, from, next) => {
            if (
              from.path === '/cart_account/cartdelivery_account' &&
              to.path === '/cart_account/cart_finish_account'
            ) {
              next()
            } else {
              next('/cart_account')
            }
          }
        }
      ]
    },
    {
      path: '/course',
      name: 'course',
      component: () => import('@/views/CourseView.vue')
    },
    {
      path: '/courseDetail/:id',
      name: 'courseDetail',
      props: true,
      component: () => import('@/views/CourseDetailView.vue')
    },
    {
      path: '/courseBookingDetail/:id',
      name: 'courseBookingDetail',
      props: true,
      component: () => import('@/views/CourseBookingDetail.vue')
    },
    {
      path: '/game',
      name: 'game',
      component: () => import('@/views/GameView.vue')
    },
    {
      path: '/gameRule',
      name: 'gameRule',
      component: () => import('@/views/GameRuleView.vue')
    },
    {
      path: '/gameAns',
      name: 'gameAns',
      component: () => import('@/views/GameAnsView.vue')
    },
    {
      path: '/gameTotal',
      name: 'gameTotal',
      component: () => import('@/views/GameTotalView.vue')
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
    // {
    //   path: '/product-detail',
    //   name: 'product-detail',
    //   component: () => import('@/views/Product-Detail-View.vue')
    // },
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
    {
      path: '/ProductDetail/:id',
      name: 'ProductDetail',
      props: true,
      component: () => import('@/views/ProductdetailView.vue')
    },
    {
      path: '/memberorderhistory',
      name: 'memberorderhistory',
      component: () => import('@/views/MemberOrderHistoryView.vue')
    },
    {
      path: '/bookinghistory',
      name: 'bookinghistory',
      component: () => import('@/views/BookingHistoryView.vue')
    },
    {
      path: '/discounthistory',
      name: 'discounthistory',
      component: () => import('@/views/DiscountHistoryView.vue')
    },
    {
      path: '/memberorderhistorydetails',
      name: 'memberorderhistorydetail',
      component: () => import('@/views/MemberOrderHistoryDetailsView.vue')
    },
    {
      path: '/bookinghistorydetails',
      name: 'bookinghistorydetails',
      component: () => import('@/views/BookingHistoryDetailsView.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // return 期望滾動到哪個位置
    // 始終滾動到頂部
    return { top: 0 }
  }
})

export default router

router.beforeEach(async (to, from) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }
})
