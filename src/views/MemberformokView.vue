<template>
  <div class="container">
    <section class="form_flow">
      <CartFlow :flow="item" v-for="item in flow" :key="item.id" />
    </section>
    <div class="wrapFinish">
      <div class="finish">
        <div class="finishIcon">
          <span class="material-symbols-outlined"> task_alt </span>
          <h2>完成註冊</h2>
        </div>
        <h3 v-if="countDown > 0">{{ countDown }} 幾秒後跳轉至首頁......</h3>
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
      countDown: 5, // 倒數的秒數
      timer: null, // 定時器的引用
      flow: [
        {
          id: 1,
          icon: 'receipt_long',
          opacity: '1',
          text: '填寫基本資料',
          bold: '400',
          color: '#AEA495'
        },
        {
          id: 2,
          icon: 'check',
          opacity: '1',
          text: '註冊完成',
          bold: '400',
          color: '#AEA495'
        }
      ]
    }
  },
  mounted() {
    window.scrollTo(0, 0)
  },
  created() {
    this.startTimer()
  },
  methods: {
    startTimer() {
      this.timer = setInterval(() => {
        if (this.countDown > 0) {
          // 時間未到，減一秒
          this.countDown--
        } else {
          // 時間到，清除計時器
          clearInterval(this.timer)
          this.$router.push('/')
        }
      }, 1000) // 每秒執行一次進入作用域
    }
  },
  beforeUnmount() {
    // vue實體銷毀前，關掉這一頁面
    if (this.timer) {
      clearInterval(this.timer) // 防止記憶體洩漏，清除定時器
    }
  }
}
</script>
<style>
.wrap_signup_finsh {
  text-align: center;
}

h3 {
  margin: 20px 0;
}
</style>
