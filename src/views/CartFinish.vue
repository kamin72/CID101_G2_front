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
        <h3>{{ countdown }} 幾秒後跳轉至首頁......</h3>
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
          opacity: '1',
          text: '完成詢價',
          bold: '400',
          color: '#AEA495'
        }
      ],
      countdown: 5
    }
  },
  mounted() {
    window.scrollTo(0, 0), this.startCountdown(), this.$emit('route-change', true)
  },
  beforeUnmount() {
    // 当组件销毁时，通知父组件显示其内容
    this.$emit('route-change', false)
  },
  methods: {
    startCountdown() {
      const interval = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--
        } else {
          clearInterval(interval)
          this.$router.push('/')
        }
      }, 1000) // 每1秒更新一次倒计时
    }
  }
}
</script>
