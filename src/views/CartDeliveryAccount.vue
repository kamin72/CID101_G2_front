<template>
  <div class="container" v-if="$route.path === '/cart_account/cartdelivery_account'">
    <section class="account">
      <CartFlow :flow="item" v-for="item in flow" :key="item.id" />
    </section>
    <div class="wrap_all">
      <FormAccount
        v-model:name="name"
        v-model:address="address"
        v-model:phone="phone"
        v-model:email="email"
      />
      <aside class="yardInfo">
        <YardInfo />
      </aside>
    </div>
    <div class="button">
      <RouterLink to="/cart_account/cart_finish_account" from="" style="text-decoration: none">
        <button class="big-btn-primary accountSubmit" :disabled="!canSubmit">提交資料</button>
      </RouterLink>
    </div>
  </div>
  <RouterView />
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
      ],
      name: '',
      address: '',
      phone: '',
      email: ''
    }
  },
  mounted() {
    window.scrollTo(0, 0)
  },
  computed: {
    canSubmit() {
      const phoneValid = /^\d{10}$/.test(this.phone)
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)
      return (
        this.selectedPaymentMethod !== null &&
        phoneValid &&
        emailValid &&
        this.address != '' &&
        this.name != ''
      )
    }
  }
}
</script>
