<template>
  <div class="container" v-if="$route.path.includes('/cart_comp/pay_info')">
    <section v-show="!isMobile">
      <CartFlow :flow="item" v-for="item in flow" :key="item.id" />
    </section>
    <section v-show="isMobile" class="cartFlowRWD">
      <CartFlowRWD :flowRwd="itemRwd" v-for="itemRwd in flowRwd" :key="itemRwd.id" />
    </section>
    <!-- 付款方式內容 -->
    <div class="wrap_all">
      <CreditCard v-show="selectedMethod == 0" ref="form" />
      <PaybyStore v-show="selectedMethod == 1" />
      <YardSelf v-show="selectedMethod == 2" />
      <!-- 付款方式 -->
      <aside class="payMethod">
        <PayMethod />
        <div class="hr"></div>
        <RouterLink to="/cart_comp/cart_finish" style="text-decoration: none">
          <button class="big-btn-primary paySubmit" @click="submitChildForm">提交付款資訊</button>
        </RouterLink>
      </aside>
    </div>
  </div>
  <RouterView />
</template>

<script>
import CartFlow from '@/components/Cart/CartFlow.vue'
import CartFlowRWD from '@/components//Cart/CartFlowRWD.vue'
import CreditCard from '@/components/Cart/CreditCard.vue'
import PayMethod from '@/components/Cart/PayMethod.vue'
import PaybyStore from '@/components/Cart/PaybyStore.vue'
import YardSelf from '@/components/Cart/YardSelf.vue'

import { mapActions } from 'pinia'
import cartStore from '@/stores/cart'

export default {
  components: {
    CartFlow,
    PayMethod,
    CreditCard,
    PaybyStore,
    YardSelf,
    CartFlowRWD
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
          color: '#AEA495',
          borderColor: '#AEA495'
        },
        {
          id: 2,
          icon: 'local_shipping',
          opacity: '1',
          text: '填寫配送資訊',
          bold: '400',
          color: '#AEA495',
          borderColor: '#AEA495'
        },
        {
          id: 3,
          icon: 'paid',
          opacity: '1',
          text: '選擇付款方式',
          bold: '400',
          color: '#AEA495',
          borderColor: '#D5D5D5'
        },
        {
          id: 4,
          icon: 'check',
          opacity: '0.3',
          text: '完成詢價',
          bold: '0'
        }
      ],
      flowRwd: [
        {
          id: 1,
          icon: 'paid',
          opacity: '1',
          text: '選擇付款方式',
          bold: '400',
          color: '#AEA495',
          borderColor: '#D5D5D5'
        },
        {
          id: 2,
          icon: 'check',
          opacity: '0.3',
          text: '完成詢價',
          bold: '0'
        }
      ],
      windowWidth: window.innerWidth,
      selectedMethod: null
    }
  },
  methods: {
    ...mapActions(cartStore, ['cleanCart']),
    changePaymentMethod(index) {
      this.selectedMethod = index
    },
    updateWindowWidth() {
      this.windowWidth = window.innerWidth
    },
    submitChildForm() {
      this.$refs.form.submitOrder()
      this.cleanCart()
    }
  },
  watch: {},
  computed: {
    isMobile() {
      return this.windowWidth < 450
    }
  },
  mounted() {
    window.scrollTo(0, 0),
      (this.selectedMethod = this.method),
      window.addEventListener('resize', this.updateWindowWidth)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateWindowWidth)
  }
}
</script>
