<template>
  <div class="container">
    <section class="account">
      <CartFlow :flow="item" v-for="item in flow" :key="item.id" />
    </section>
    <div class="wrap_all">
      <FormAccount />
      <aside class="yardInfo">
        <YardInfo />
      </aside>
    </div>
    <div class="button">
      <RouterLink to="/cart_finish_account" from="">
        <button class="big-btn-primary accountSubmit">提交資料</button>
      </RouterLink>
    </div>
  </div>
</template>

<script>
import CartFlow from '@/components/Cart/CartFlow.vue'
import FormAccount from '@/components/Cart/FormAccount.vue'
import YardInfo from '@/components/Cart/YardInfo.vue'

export default {
  components: {
    CartFlow,
    FormAccount,
    YardInfo
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
