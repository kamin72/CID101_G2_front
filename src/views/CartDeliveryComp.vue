<template>
  <div class="container">
    <section>
      <CartFlow :flow="item" v-for="item in flow" :key="item.id" />
    </section>
    <div class="wrap_all">
      <FormComp />
      <aside class="paymethod">
        <PayMethod />
        <div class="hr"></div>
        <RouterLink to="/cartDelivery_comp" from="">
          <button class="big-btn-primary deliverySubmit">提交配送資訊</button>
        </RouterLink>
      </aside>
    </div>
  </div>
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
          bold: '400'
        },
        {
          id: 2,
          icon: 'local_shipping',
          opacity: '0.3',
          text: '填寫配送資訊',
          bold: '0'
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
      ]
    }
  },
  mounted() {
    window.scrollTo(0, 0)
  }
}
</script>
