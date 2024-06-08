<template>
  <div class="container">
    <section>
      <CartFlow :flow="item" v-for="item in flow" :key="item.id" />
    </section>
    <div class="wrap_all">
      <CreditCard v-show="n == current[0]" :creditCard="current[0]" />
      <PaybyStore v-show="n == current[1]" :store="current[1]" />
      <YardSelf v-show="n == current[2]" :yardSelf="current[2]" />
      <aside class="payMethod">
        <PayMethod />
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
      current: ['creditCard', 'store', 'yardSelf'],
      n: ''
    }
  },
  mounted() {
    window.scrollTo(0, 0)
  }
}
</script>
