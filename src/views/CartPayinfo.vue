<template>
  <div class="container">
    <section>
      <CartFlow :flow="item" v-for="item in flow" :key="item.id" />
    </section>
    <div class="wrap_all">
      <CreditCard v-show="selectedMethod === '0'" />
      <PaybyStore v-show="selectedMethod === '1'" />
      <YardSelf v-show="selectedMethod === '2'" />
      <aside class="payMethod">
        <PayMethod />
        <!-- <PayMethod :checked="selectedMethod" /> -->
        <div class="hr"></div>
        <RouterLink to="/cart_finish" from="">
          <button class="big-btn-primary paySubmit">提交付款資訊</button>
        </RouterLink>
      </aside>
    </div>
  </div>
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
      // current: [0, 1, 2],
      selectedMethod: null
    }
  },
  methods: {
    changePaymentMethod(index) {
      this.selectedMethod = index
    }
  },
  created() {
    // const method = this.$route.query.method
    // this.selectedMethod = method ? parseInt(method) : 0
  },
  mounted() {
    window.scrollTo(0, 0), (this.selectedMethod = this.method)
  }
}
</script>
