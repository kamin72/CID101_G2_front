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
        <h3>{{ countdown }} 幾秒後跳轉至首頁......</h3>
      </div>
      <RouterLink to="/"><button class="big-btn-primary">回首頁</button></RouterLink>
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
      ],
      countdown: 5,
      interval: null
    }
  },
  mounted() {
    window.scrollTo(0, 0), this.startCountdown()
  },
  beforeUnmount() {
    this.stopCountdown()
  },
  methods: {
    startCountdown() {
      this.interval = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--
        } else {
          clearInterval(this.interval)
          this.interval = null
          this.$router.push('/')
        }
      }, 1000)
    },
    stopCountdown() {
      if (this.interval) {
        clearInterval(this.interval)
        this.interval = null
      }
    }
  }
}
</script>
