<template>
  <div class="container">
    <section v-show="!isMobile">
      <CartFlow :flow="item" v-for="item in flow" :key="item.id" />
    </section>
    <section v-show="isMobile" class="cartFlowRWD_finish">
      <CartFlowRWD :flowRwd="itemRwd" v-for="itemRwd in flowRwd" :key="itemRwd.id" />
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
import CartFlowRWD from '@/components//Cart/CartFlowRWD.vue'

export default {
  emits: ['route-change'],
  components: {
    CartFlow,
    CartFlowRWD
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
          color: '#AEA495',
          borderColor: '#AEA495'
        },
        {
          id: 2,
          icon: 'local_shipping',
          opacity: '1',
          text: '填寫配送資訊',
          bold: '400',
          color: '#AEA495',
          borderColor: '#AEA495'
        },
        {
          id: 3,
          icon: 'paid',
          opacity: '1',
          text: '選擇付款方式',
          bold: '400',
          color: '#AEA495',
          borderColor: '#AEA495'
        },
        {
          id: 4,
          icon: 'check',
          opacity: '1',
          text: '完成詢價',
          bold: '400',
          color: '#AEA495',
          borderColor: '#AEA495'
        }
      ],
      flowRwd: [
        {
          id: 1,
          icon: 'check',
          opacity: '1',
          text: '完成詢價',
          bold: '400',
          color: '#AEA495',
          borderColor: '#AEA495'
        }
      ],
      windowWidth: window.innerWidth,
      countdown: 5,
      interval: null
    }
  },
  mounted() {
    window.scrollTo(0, 0),
      this.startCountdown(),
      window.addEventListener('resize', this.updateWindowWidth)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateWindowWidth), this.stopCountDown()
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
      }, 1000) // 每1秒更新一次倒计时
    },
    stopCountDown() {
      if (this.interval) {
        clearInterval(this.interval)
      }
    },
    updateWindowWidth() {
      this.windowWidth = window.innerWidth
    }
  },
  computed: {
    isMobile() {
      return this.windowWidth < 450
    }
  }
}
</script>
