<template>
  <section class="game">
    <RouterLink to="/">
      <img src="../assets/img/game/leftGame.png" alt="Exit Game" class="exit-game" />
    </RouterLink>
    <div class="game-container">
      <div v-if="!showScorePopup">
        <div class="question">
          <h3>Q.{{ currentQuestionIndex + 1 }}</h3>
          <!-- 題號按順序顯示 -->
          <p>{{ currentQuestion.q_name }}</p>
        </div>
        <div class="options">
          <button
            v-for="option in options"
            :key="option.id"
            :class="{
              correct: selectedOption === option.id && option.correct == option.text,
              wrong: selectedOption === option.id && option.correct != option.text,
              shake: selectedOption === option.id && option.correct != option.text
            }"
            @click="checkAnswer(option.id)"
          >
            {{ option.text }}
            <span
              v-if="selectedOption === option.id && option.correct == option.text"
              class="checkmark"
              >✔</span
            >
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
      questions: [],
      currentQuestionIndex: 0,
      selectedOption: null,
      couponInfo: null,
      couponList: [],
      memWithCoupon: null,
      correct: null
    }
  },
  computed: {
    ...mapState(memberStore, ['memberInfo']),
    currentQuestion() {
      return this.questions[this.currentQuestionIndex]
    },

    options() {
      if (this.currentQuestion) {
        return [
          {
            id: 1,
            text: this.currentQuestion.q_option_a,
            correct: this.currentQuestion.q_ans
          },
          {
            id: 2,
            text: this.currentQuestion.q_option_b,
            correct: this.currentQuestion.q_ans
          }
        ]
      }
      return []
    }
  },
  created() {
    this.shuffleQuestions()
    this.fetchQuestions()
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
    fetchQuestions() {
      fetch(`${import.meta.env.VITE_API_URL}/front/question.php`)
        .then((response) => response.json())
        .then((data) => {
          if (!data.error) {
            this.questions = data.question
            // console.log(this.questions)
          } else {
            console.error(data.msg)
          }
        })
        .catch((error) => {
          console.error('Error fetching questions:', error)
        })
    },
    async checkCouponInBackend() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/front/checkCoupon.php`, {
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
        const memInfo = JSON.parse(localStorage.getItem('memberInfo'))[0]
        this.memWithCoupon = { ...memInfo, ...coupon }
        // console.log(this.memWithCoupon)

        this.couponMessage = `$${couponAmount}優惠券！`
        this.toggleOpen()
        this.$router.push('/discounthistory')
      } else {
        alert('很抱歉，暫無符合條件的優惠券。')
        return
      }

      try {
        const payload = JSON.stringify({
          memberInfo: this.memWithCoupon // 將整個 memberInfo 對象傳遞給後端
        })
        // console.log(payload)

        const response = await fetch(`${import.meta.env.VITE_API_URL}/front/saveCoupon.php`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: payload
        })

        const data = await response.json()
        if (data.success) {
          console.log('優惠券已成功存儲到後台')
          alert('資料新增成功')
        } else {
          alert(`很抱歉，${data.msg}`)
        }
      } catch (error) {
        console.error('Network response was not ok:', error)
        alert('很抱歉，儲存優惠券時發生錯誤。')
      }
    },
    calculateCouponAmount() {
      let couponAmount = 0
      if (this.totalScore === 60) {
        couponAmount = 50
      } else if (this.totalScore >= 70 && this.totalScore <= 80) {
        couponAmount = 100
      } else if (this.totalScore === 90) {
        couponAmount = 200
      } else if (this.totalScore === 100) {
        couponAmount = 300
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
      fetch(`${import.meta.env.VITE_API_URL}/front/getCoupon.php`)
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
      const selected = this.options.find((option) => option.id === optionId)
      if (selected.correct === selected.text) {
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
