import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Silken Sip Vineyard' }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { title: '關於我們' }
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
      ],
      meta: { title: '購物車 | 公司行號', requiresAuth: true }
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
      ],
      meta: { title: '購物車 | 一般會員', requiresAuth: true }
    },
    {
      path: '/course',
      name: 'course',
      component: () => import('@/views/CourseView.vue'),
      meta: { title: '品酒課程' }
    },
    {
      path: '/courseDetail/:id',
      name: 'courseDetail',
      component: () => import('@/views/CourseDetailView.vue'),
      props: route => ({ courseId: route.params.id }),
      meta: { title: '品酒課程 | 課程詳情' }
    },
    {
      path: '/courseBookingDetail/:id',
      name: 'courseBookingDetail',
      component: () => import('@/views/CourseBookingDetail.vue'),
      meta: { title: '品酒課程 | 預約課程',
              requiresAuth: true
      }
    },
    {
      path: '/courseBookingDetail_confirm/:id',
      name: 'courseBookingDetail_confirm',
      component: () => import('@/views/CourseBookingDetail_confirm.vue'),
      meta: { title: '品酒課程 | 確認預約資料' }
    },
    {
      path: '/courseBookingDetail_pay/:id',
      name: 'courseBookingDetail_pay',
      component: () => import('@/views/CourseBookingDetail_payment.vue'),
      meta: { title: '品酒課程 | 付款流程' }
    },
    {
      path: '/courseBookingDetail_finish/:id',
      name: 'courseBookingDetail_finish',
      component: () => import('@/views/CourseBookingDetail_finish.vue'),
      meta: { title: '品酒課程 | 預約完成' }
    },
    {
      path: '/game',
      name: 'game',
      component: () => import('@/views/GameView.vue'),
      meta: { title: '品酒達人' }
    },
    {
      path: '/gameRule',
      name: 'gameRule',
      component: () => import('@/views/GameRuleView.vue'),
      meta: { title: '品酒達人 | 遊戲規則' }
    },
    // {
    //   path: '/gameTotal',
    //   name: 'gameTotal',
    //   component: () => import('@/views/GameTotalView.vue'),
    //   meta: { title: '品酒達人 | 遊戲分數' }
    // },
    {
      path: '/gameTest',
      name: 'gameTest',
      component: () => import('@/views/GameTestView.vue'),
      meta: { title: '品酒達人 | 遊戲測驗' }
    },
    {
      path: '/gameCoupon',
      name: 'gameCoupon',
      component: () => import('@/views/GameCouponView.vue'),
      meta: { title: '品酒達人 | 遊戲優惠券' }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { title: '會員登入' }
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('@/views/NewView.vue'),
      meta: { title: '最新消息' }
    },
    {
      path: '/news_detail/:id',
      name: 'news_detail',
      component: () => import('@/views/NewsDetailView.vue'),
      meta: { title: '最新消息 | 消息詳情' }
    },
    {
      path: '/product',
      name: 'product',
      component: () => import('@/views/ProductView.vue'),
      meta: { title: '我們的酒' }
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/SignupView.vue'),
      meta: { title: '會員註冊' }
    },
    {
      path: '/forget',
      name: 'forget',
      component: () => import('@/views/ForgetView.vue'),
      meta: { title: '忘記密碼' }
    },
    {
      path: '/forgetok',
      name: 'forgetok',
      component: () => import('@/views/ForgetokView.vue'),
      meta: { title: '忘記密碼 | 重設成功' }
    },
    {
      path: '/memberform',
      name: 'memberform',
      component: () => import('@/views/MemberformView.vue'),
      meta: { title: '會員註冊 | 一般會員' }
    },
    {
      path: '/memberformok',
      name: 'memberformok',
      component: () => import('@/views/MemberformokView.vue'),
      meta: { title: '會員註冊 | 填寫完成' }
    },
    {
      path: '/wholesalerform',
      name: 'wholesalerform',
      component: () => import('@/views/WholesalerformView.vue'),
      meta: { title: '會員註冊 | 公司行號' }
    },
    // {
    //   path: '/product-detail',
    //   name: 'product-detail',
    //   component: () => import('@/views/Product-Detail-View.vue')
    // },
    {
      path: '/wholesalerformok',
      name: 'wholesalerformok',
      component: () => import('@/views/WholesalerformokView.vue'),
      meta: { title: '會員註冊 | 填寫完成' }
    },
    {
      path: '/membercenter',
      name: 'membercenter',
      component: () => import('@/views/MemberCenterView.vue'),
      meta: { title: '會員中心' }
    },
    {
      path: '/wholesalercenter',
      name: 'wholesalercenter',
      component: () => import('@/views/WholesalerCenterView.vue'),
      meta: { title: '會員中心' }
    },
    {
      path: '/ProductDetail/:id',
      name: 'ProductDetail',
      props: true,
      component: () => import('@/views/ProductdetailView.vue'),
      meta: { title: '我們的酒 | 產品詳情' }
    },
    {
      path: '/memberorderhistory',
      name: 'memberorderhistory',
      component: () => import('@/views/MemberOrderHistoryView.vue'),
      meta: { title: '會員中心 | 訂單紀錄' }
    },
    {
      path: '/wholesalerorderhistory',
      name: 'wholesalerorderhistory',
      component: () => import('@/views/WholesalerOrderHistoryView.vue')
    },
    {
      path: '/bookinghistory',
      name: 'bookinghistory',
      component: () => import('@/views/BookingHistoryView.vue'),
      meta: { title: '會員中心 | 預約紀錄' }
    },
    {
      path: '/discounthistory',
      name: 'discounthistory',
      component: () => import('@/views/DiscountHistoryView.vue'),
      meta: { title: '會員中心 | 折價券紀錄' }
    },
    {
      path: '/memberorderhistorydetails',
      name: 'memberorderhistorydetail',
      component: () => import('@/views/MemberOrderHistoryDetailsView.vue'),
      meta: { title: '會員中心 | 訂單紀錄詳情' }
    },
    {
      path: '/bookinghistorydetails',
      name: 'bookinghistorydetails',
      component: () => import('@/views/BookingHistoryDetailsView.vue'),
      meta: { title: '會員中心 | 預約紀錄詳情' }
    }
  ],
  // return 期望滾動到哪個位置
  // 始終滾動到頂部
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

const isLoggedIn = () => {
  const memberInfo = localStorage.getItem('memberInfo')
  return memberInfo !== null && memberInfo !== 'undefined' && memberInfo !== ''
}

router.beforeEach((to, from, next) => {
  // 設置頁面標題
  document.title = to.meta.title || 'Silken Sip Vineyard'

  // 檢查是否需要登入
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isLoggedIn()) {
      next({ path: '/login', query: { redirect: to.fullPath } })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
