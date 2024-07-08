<template>
  <section class="game">
    <div class="game-container">
      <div v-if="!showScorePopup">
        <div class="question">
          <h3>Q.{{ currentQuestionIndex + 1 }}</h3>
          <!-- 題號按順序顯示 -->
          <p>{{ currentQuestion.text }}</p>
        </div>
        <div class="options">
          <button
            v-for="option in currentQuestion.options"
            :key="option.id"
            :class="{
              correct: selectedOption === option.id && option.correct,
              wrong: selectedOption === option.id && !option.correct,
              shake: selectedOption === option.id && !option.correct
            }"
            @click="checkAnswer(option.id)"
          >
            {{ option.text }}
            <span v-if="selectedOption === option.id && option.correct" class="checkmark">✔</span>
          </button>
        </div>
      </div>
      <div class="bottle-glass-container">
        <div class="bottle-container">
          <img
            src="../assets/img/game/winebottle.png"
            alt="Wine Bottle"
            class="wine-bottle"
            :class="{ pouring: isPouring }"
          />
        </div>
        <div class="glass-container">
          <div class="wine-glass">
            <div class="water" :style="{ height: waterLevel + '%' }"></div>
          </div>
          <div class="wine-glass-stem"></div>
          <div class="wine-glass-base"></div>
        </div>
      </div>
    </div>
    <div class="coupon-pic"></div>
    <div v-if="showScorePopup" class="score-popup">
      <div class="score-popup-content">
        <h3>恭喜~你的得分是：{{ totalScore }} 分</h3>
        <div class="letter-icon">
          <div
            class="confetti"
            v-for="index in 100"
            :key="index"
            :style="generateConfettiStyle()"
          ></div>
          <svg
            :class="{ hide: isOpen }"
            width="200"
            height="200"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="64" height="48" y="8" rx="4" fill="#D1D5DB" />
            <path
              class="flap"
              :class="{ open: isOpen }"
              d="M4 8L32 32L60 8"
              stroke="#1F2937"
              stroke-width="4"
              fill="#1F2937"
            />
            <path d="M4 8H60V48H4V8Z" stroke="#1F2937" stroke-width="4" />
          </svg>
          <div class="coupon" :class="{ show: isOpen }">{{ couponMessage }}</div>
        </div>
        <button @click="saveCouponToMember" class="saveCouponToMember">領取優惠券</button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import memberStore from '@/stores/loginMember'

export default {
  name: 'LetterIcon',
  data() {
    return {
      isOpen: false,
      totalScore: 0,
      showScorePopup: false,
      isPouring: false,
      waterLevel: 0,
      increment: 10,
      couponMessage: '',
      questions: [
        {
          num: 'Q.1',
          text: '在品酒時，通常第一步是什麼？',
          options: [
            { id: 1, text: '品嘗', correct: false },
            { id: 2, text: '觀察顏色', correct: true }
          ]
        },
        {
          num: 'Q.2',
          text: '哪一種水果通常被用來製作紅酒？',
          options: [
            { id: 1, text: '蘋果', correct: false },
            { id: 2, text: '葡萄', correct: true }
          ]
        },
        {
          num: 'Q.3',
          text: '在葡萄酒中，什麼是“單寧”？',
          options: [
            { id: 1, text: '一種酸', correct: false },
            { id: 2, text: '一種苦味化合物', correct: true }
          ]
        },
        {
          num: 'Q.4',
          text: '哪一種葡萄品種常被用來製作白葡萄酒？',
          options: [
            { id: 1, text: '赤霞珠', correct: false },
            { id: 2, text: '霞多麗', correct: true }
          ]
        },
        {
          num: 'Q.5',
          text: '紅葡萄酒和白葡萄酒的主要區別是什麼？',
          options: [
            { id: 1, text: '顏色', correct: true },
            { id: 2, text: '酸度', correct: false }
          ]
        },
        {
          num: 'Q.6',
          text: '品酒時，第二步是什麼？',
          options: [
            { id: 1, text: '嗅聞香氣', correct: true },
            { id: 2, text: '搖晃酒杯', correct: false }
          ]
        },
        {
          num: 'Q.7',
          text: '葡萄酒中“餘味”是指什麼？',
          options: [
            { id: 1, text: '葡萄酒的顏色', correct: false },
            { id: 2, text: '口中殘留的味道', correct: true }
          ]
        },
        {
          num: 'Q.8',
          text: '哪一個國家是葡萄酒的主要生產國？',
          options: [
            { id: 1, text: '中國', correct: false },
            { id: 2, text: '法國', correct: true }
          ]
        },
        {
          num: 'Q.9',
          text: '什麼是葡萄酒的“酒體”？',
          options: [
            { id: 1, text: '葡萄酒的稠度', correct: true },
            { id: 2, text: '葡萄酒的香氣', correct: false }
          ]
        },
        {
          num: 'Q.10',
          text: '品酒時，通常最後一步是什麼？',
          options: [
            { id: 1, text: '評價', correct: true },
            { id: 2, text: '吞咽', correct: false }
          ]
        }
      ],
      currentQuestionIndex: 0,
      selectedOption: null,
      couponInfo: null,
      couponList: [],
      memWithCoupon: null
    }
  },
  computed: {
    ...mapState(memberStore, ['memberInfo']),
    currentQuestion() {
      return this.questions[this.currentQuestionIndex]
    }
  },
  created() {
    this.shuffleQuestions()
  },
  mounted() {
    this.fetchCoupon()
    this.getCoupon()
    this.checkLocalStorage()
  },
  methods: {
    ...mapActions(memberStore, ['getMemberData']),
    // 1. 檢查是否有會員資料
    checkLocalStorage() {
      let storage = localStorage.getItem('memberInfo')
      if (storage) {
        this.memberInfo = JSON.parse(storage)
      }
    },
    // 當用戶完成遊戲後，點擊領取優惠券按鈕時
    async handleCouponClaim() {
      this.checkLocalStorage()
      if (this.memberInfo) {
        const response = await this.checkCouponInBackend()
        if (response) {
          await this.saveCouponToMember()
          const today = new Date().toISOString().split('T')[0]
          localStorage.setItem('lastClaimDate', today)
        }
      } else {
        this.promptLogin()
      }
    },
    async checkCouponInBackend() {
      try {
        const response = await fetch('http://localhost/CID101_G2_php/front/checkCoupon.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            memberNo: this.memberInfo[0].no
          })
        })
        const data = await response.json()
        if (data.success) {
          if (data.couponAvailable) {
            return true
          } else {
            alert(data.msg)
            return false
          }
        } else {
          alert(`很抱歉，檢查優惠券時發生錯誤。${data.msg}`)
          return false
        }
      } catch (error) {
        console.error('Network response was not ok:', error)
        alert('很抱歉，檢查優惠券時發生錯誤。')
        return false
      }
    },
    // 2. 將優惠券存入會員資料
    async saveCouponToMember() {
      let couponAmount = this.calculateCouponAmount()
      let today = new Date() // 獲取當前日期

      let coupon = this.couponList.find(
        (item) => item.dis_amount == couponAmount && new Date(item.dis_set_date) >= today
      )

      if (couponAmount > 0 && coupon) {
        let storage = localStorage.getItem('memberInfo')
        if (!storage) {
          // 將當前頁面路徑作為查詢參數傳遞給登入頁面
          this.$router.push({
            path: '/login',
            query: { redirect: this.$route.fullPath }
          })
        }

        const memInfo = JSON.parse(localStorage.getItem('memberInfo'))[0]
        this.memWithCoupon = { ...memInfo, ...coupon }
        // console.log(this.memWithCoupon)

        this.couponMessage = `成功領取${couponAmount}元的優惠券！`
        this.toggleOpen()
      } else {
        alert('很抱歉，暫無符合條件的優惠券。')
        return // 退出函數，不再繼續執行下面的代碼
      }

      try {
        const payload = JSON.stringify({
          memberInfo: this.memWithCoupon // 將整個 memberInfo 對象傳遞給後端
        })
        // console.log(payload) // 在發送請求之前打印 payload 檢查其內容

        const response = await fetch('http://localhost/CID101_G2_php/front/saveCoupon.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: payload
        })

        const data = await response.json()
        if (data.success) {
          // console.log('優惠券已成功存儲到後台')
          alert('資料新增成功')
        } else {
          alert(`很抱歉，儲存優惠券時發生錯誤。${data.msg}`)
        }
      } catch (error) {
        console.error('Network response was not ok:', error)
        alert('很抱歉，儲存優惠券時發生錯誤。')
      }
    },
    calculateCouponAmount() {
      let couponAmount = 0
      if (this.totalScore === 60) {
        couponAmount = 100
      } else if (this.totalScore >= 70 && this.totalScore <= 80) {
        couponAmount = 200
      } else if (this.totalScore === 90) {
        couponAmount = 300
      } else if (this.totalScore === 100) {
        couponAmount = 500
      }
      return couponAmount
    },
    // 3. 提示用戶登錄
    promptLogin() {
      alert('請先登入以領取優惠券')
      this.$router.push('/login')
      // 假設會員在登入後會重定向回遊戲頁面並自動保存優惠券
    },
    fetchCoupon() {
      fetch('http://localhost/CID101_G2_php/front/getCoupon.php')
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert(data.msg)
          } else if (data.coupon) {
            this.couponList = data.coupon
            // console.log(this.couponList);
            // localStorage.setItem('couponInfo', JSON.stringify(data.coupon))
          }
        })
    },
    getCoupon() {
      let storage = localStorage.getItem('couponInfo')
      if (storage) {
        this.couponInfo = JSON.parse(storage)
      } else {
        this.couponInfo = null
      }
    },
    toggleOpen() {
      this.isOpen = !this.isOpen
      if (this.isOpen) {
        this.centerCoupon()
      }
    },
    centerCoupon() {
      if (this.isOpen) {
        const coupon = document.querySelector('.coupon')
        const rect = coupon.getBoundingClientRect()
        const x = window.innerWidth / 2 - rect.width / 2
        const y = window.innerHeight / 2 - rect.height / 2
        coupon.style.transform = `translate(${x}px, ${y}px)`
      }
    },
    generateConfettiStyle() {
      const colors = ['#ff0', '#f0f', '#0ff', '#0f0', '#00f', '#f00']
      const color = colors[Math.floor(Math.random() * colors.length)]
      const left = Math.random() * 100 + 'vw'
      const top = Math.random() * 100 + 'vh'
      const rotate = Math.random() * 360 + 'deg'
      return {
        backgroundColor: color,
        left,
        top,
        transform: `rotate(${rotate})`
      }
    },
    shuffleQuestions() {
      for (let i = this.questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]]
      }
    },
    checkAnswer(optionId) {
      this.selectedOption = optionId
      const selected = this.currentQuestion.options.find((option) => option.id === optionId)
      if (selected.correct) {
        this.isPouring = true
        setTimeout(() => {
          this.isPouring = false
          if (this.waterLevel + this.increment <= 100) {
            this.waterLevel += this.increment
          }
          this.totalScore += 10 // 每答對一題加 10 分
          this.nextQuestion()
        }, 1000)
      } else {
        setTimeout(() => {
          this.nextQuestion()
        }, 1000)
      }
    },
    nextQuestion() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++
        this.selectedOption = null
      } else {
        this.showScorePopup = true // 顯示總分數彈窗
      }
    }
  },
  watch: {
    isOpen() {
      this.centerCoupon()
    }
  }
}
</script>
