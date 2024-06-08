<template>
  <div class="container">
    <section class="account">
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
          bold: '400',
          color: '#AEA495'
        },
        {
          id: 2,
          icon: 'edit_document',
          opacity: '1',
          text: '填寫個人資料',
          bold: '400',
          color: '#AEA495'
        },
        {
          id: 3,
          icon: 'paid',
          opacity: '1',
          text: '完成詢價',
          bold: '400',
          color: '#AEA495'
        }
      ]
    }
  },
  mounted() {
    window.scrollTo(0, 0)
  }
}
</script>
