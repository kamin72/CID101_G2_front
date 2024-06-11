<template>
  <div class="container" v-if="!isChildRouteActive">
    <section>
      <CartFlow :flow="item" v-for="item in flow" :key="item.id" />
    </section>
    <div class="wrap_all">
      <CreditCard v-show="selectedMethod == 0" />
      <PaybyStore v-show="selectedMethod == 1" />
      <YardSelf v-show="selectedMethod == 2" />
      <aside class="payMethod">
        <!-- <PayMethod /> -->
        <PayMethod :checked="selectedMethod" />
        <div class="hr"></div>
        <RouterLink to="/cart_comp/cart_finish">
          <button class="big-btn-primary paySubmit">提交付款資訊</button>
        </RouterLink>
      </aside>
    </div>
  </div>
  <RouterView @route-changes="handleRouteChange" />
</template>

<script>
import CartFlow from '@/components/Cart/CartFlow.vue'
import CreditCard from '@/components/Cart/CreditCard.vue'
import PayMethod from '@/components/Cart/PayMethod.vue'
import PaybyStore from '@/components/Cart/PaybyStore.vue'
import YardSelf from '@/components/Cart/YardSelf.vue'

export default {
  components: {
    CartFlow,
    PayMethod,
    CreditCard,
    PaybyStore,
    YardSelf
  },
  props: {
    method: {
      type: String,
      required: true
    }
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
          opacity: '1',
          text: '選擇付款方式',
          bold: '400',
          color: '#AEA495'
        },
        {
          id: 4,
          icon: 'check',
          opacity: '0.3',
          text: '完成詢價',
          bold: '0'
        }
      ],
      selectedMethod: null,
      isChildRouteActive: false
    }
  },
  methods: {
    changePaymentMethod(index) {
      this.selectedMethod = index
    },
    handleRouteChange(isActive) {
      this.isChildRouteActive = isActive
    }
  },
  watch: {
    $route(to, from) {
      // 当路由改变时检查是否是子路由
      this.isChildRouteActive = to.path.includes('/cart_comp/cart_finish')
    }
  },
  created() {},
  mounted() {
    window.scrollTo(0, 0), (this.selectedMethod = this.method), this.$emit('route-change', true)
  },
  beforeUnmount() {
    // 当组件销毁时，通知父组件显示其内容
    this.$emit('route-change', false)
  }
}
</script>
