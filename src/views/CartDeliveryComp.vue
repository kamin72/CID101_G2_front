<template>
  <div class="container" v-if="!isChildRouteActive">
    <section>
      <CartFlow :flow="item" v-for="item in flow" :key="item.id" />
    </section>
    <div class="wrap_all">
      <FormComp v-model:phone="phone" v-model:email="email" />
      <aside class="payMethod">
        <PayMethod @change-method="changePaymentMethod" />
        <div class="hr"></div>
        <RouterLink :to="{ path: 'pay_info', query: { method: selectedPaymentMethod } }">
          <button class="big-btn-primary deliverySubmit" :disabled="!canSubmit">
            提交配送資訊
          </button>
        </RouterLink>
      </aside>
    </div>
  </div>
  <RouterView @route-change="handleRouteChange" />
</template>

<script>
import CartFlow from '@/components/Cart/CartFlow.vue'
import FormComp from '@/components/Cart/FormComp.vue'
import PayMethod from '@/components/Cart/PayMethod.vue'

export default {
  components: {
    CartFlow,
    FormComp,
    PayMethod
  },
  data() {
    return {
      flow: [
        {
          id: 1,
          icon: 'receipt_long',
          opacity: '1',
          text: '詢價清單',
          bold: '400',
          color: '#AEA495'
        },
        {
          id: 2,
          icon: 'local_shipping',
          opacity: '1',
          text: '填寫配送資訊',
          bold: '400',
          color: '#AEA495'
        },
        {
          id: 3,
          icon: 'paid',
          opacity: '0.3',
          text: '選擇付款方式',
          bold: '0'
        },
        {
          id: 4,
          icon: 'check',
          opacity: '0.3',
          text: '完成詢價',
          bold: '0'
        }
      ],
      selectedPaymentMethod: null,
      phone: '',
      email: '',
      isChildRouteActive: false
    }
  },
  mounted() {
    window.scrollTo(0, 0), this.$emit('route-change', true)
  },
  beforeUnmount() {
    // 当组件销毁时，通知父组件显示其内容
    this.$emit('route-change', false)
  },
  methods: {
    changePaymentMethod(index) {
      this.selectedPaymentMethod = index
    },
    handleRouteChange(isActive) {
      this.isChildRouteActive = isActive
    }
    // submitForm() {
    //   if (this.canSubmit) {
    //     this.$router.push({
    //       path: '/pay_info',
    //       query: {
    //         method: this.selectedPaymentMethod,
    //         phone: this.phone,
    //         email: this.email
    //       }
    //     })
    //   } else {
    //     alert('請填寫所有必填字段並確保電話為10個數字和電子郵件格式正確')
    //   }
    // }
  },
  watch: {
    $route(to, from) {
      // 当路由改变时检查是否是子路由
      this.isChildRouteActive = to.path.includes('/cart_comp/pay_info')
    }
  },
  computed: {
    canSubmit() {
      const phoneValid = /^\d{10}$/.test(this.phone)
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)
      return this.selectedPaymentMethod !== null && phoneValid && emailValid
    }
  }
}
</script>
