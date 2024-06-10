<template>
  <div class="container">
    <section>
      <CartFlow :flow="item" v-for="item in flow" :key="item.id" />
    </section>
    <div class="wrapFinish">
      <div class="finish">
        <div class="finishIcon">
          <span class="material-symbols-outlined"> task_alt </span>
          <h2>完成詢價</h2>
        </div>
        <h3>5 幾秒後跳轉至首頁......</h3>
      </div>
      <RouterLink to="/"> <button class="big-btn-primary">回首頁</button> </RouterLink>
    </div>
  </div>
</template>

<script>
import CartFlow from '@/components/Cart/CartFlow.vue'

export default {
  components: {
    CartFlow
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
