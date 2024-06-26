<template>
  <section class="game">
    <div class="game-container">
      <div v-if="!showScorePopup">
        <div class="question">
          <h3>Q.{{ currentQuestionIndex + 1 }}</h3> <!-- 題號按順序顯示 -->
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
          <img src="../assets/img/game/winebottle.png" alt="Wine Bottle" class="wine-bottle" :class="{ 'pouring': isPouring }" />
        </div>
        <div class="glass-container">
          <div class="wine-glass">
            <div class="water" :style="{ height: waterLevel + '%' }"></div>
          </div>
          <div class="wine-glass-stem"></div> <!-- 新增红酒杯的脚 -->
          <div class="wine-glass-base"></div> <!-- 新增红酒杯的底部 -->
        </div>
      </div>
    </div>
  <div class="coupon-pic"></div>
    <div v-if="showScorePopup" class="score-popup">
      <div class="score-popup-content">
        <h3>恭喜~你的得分是：{{ totalScore }} 分</h3>
        <!-- --------------------------------------------------------- -->
        <div class="letter-icon">
          <div class="confetti" v-for="index in 100" :key="index" :style="generateConfettiStyle()"></div>
          <svg :class="{ hide: isOpen }" width="200" height="200" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="64" height="48" y="8" rx="4" fill="#D1D5DB"/>
            <path class="flap" :class="{ open: isOpen }" d="M4 8L32 32L60 8" stroke="#1F2937" stroke-width="4" fill="#1F2937"/>
            <path d="M4 8H60V48H4V8Z" stroke="#1F2937" stroke-width="4"/>
          </svg>
        <div class="coupon" :class="{ show: isOpen }">{{ couponMessage }}</div>
    </div>
    <!-- --------------------------------------------------------- -->
        <button @click="claimCoupon">領取優惠券</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'LetterIcon',
  data() {
    return {
      isOpen: false,
      totalScore: 0, // 用于存储用户的总分数
      showScorePopup: false, // 控制弹窗显示
      isPouring: false,
      waterLevel: 0,
      increment: 10, // 每次回答正确增加的水量百分比
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
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    }
  },
  created() {
    this.shuffleQuestions();
  },
  methods: {
    toggleOpen() {  
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.centerCoupon();
      }
    },
    centerCoupon() {
      if (this.isOpen) {
        const coupon = document.querySelector('.coupon');
        const rect = coupon.getBoundingClientRect();
        const x = window.innerWidth / 2 - rect.width / 2;
        const y = window.innerHeight / 2 - rect.height / 2;
        coupon.style.transform = `translate(${x}px, ${y}px)`;
      }
    },
    watch: {
      isOpen() {
        this.centerCoupon();
      },
    },
    generateConfettiStyle() {
      const colors = ['#ff0', '#f0f', '#0ff', '#0f0', '#00f', '#f00'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100 + 'vw';
      const top = Math.random() * -50 + 'vh'; 
      const rotate = Math.random() * 360 + 'deg';
      return {
        backgroundColor: color,
        left,
        top,
        transform: `rotate(${rotate})`
      };
  },
    shuffleQuestions() {
      for (let i = this.questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
      }
    },
    checkAnswer(optionId) {
      this.selectedOption = optionId;
      const selected = this.currentQuestion.options.find(option => option.id === optionId);
      if (selected.correct) {
        this.isPouring = true;
        setTimeout(() => {
          this.isPouring = false;
          if (this.waterLevel + this.increment <= 100) {
            this.waterLevel += this.increment;
          }
          this.nextQuestion();
        }, 1000); // 模拟倒水动画时间
      } else {
        setTimeout(() => {
          this.nextQuestion();
        }, 1000); // 延迟以显示错误效果
      }
    },
    nextQuestion() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
        this.selectedOption = null;
      } else {
        this.totalScore = this.questions.filter(q => {
          const selectedOption = q.options.find(o => o.id === this.selectedOption);
          return selectedOption && selectedOption.correct;
        }).length * 10;
        this.showScorePopup = true;
      }
    },
    claimCoupon() {
      let couponAmount = 0;
      if (this.totalScore === 60) {
        couponAmount = 100;
      } else if (this.totalScore >= 70 && this.totalScore <= 80) {
        couponAmount = 200;
      } else if (this.totalScore === 90) {
        couponAmount = 300;
      } else if (this.totalScore === 100) {
        couponAmount = 500;
      }
      if (couponAmount > 0) {
        this.couponMessage = `成功領取${couponAmount}元的優惠券！`;
        this.toggleOpen();
      } else {
        alert('很抱歉，暫無符合條件的優惠券。');
      }
    }
  }
};
</script>


<style scoped>
/* .game-container {
  position: relative;
} */
/* .bottle-container {
  position: relative;
  margin: 20px 0;
  right: -45%;
  width: 46%;
  transition: transform 1s;
} */
/* .wine-bottle {
  width: 100%;
  height: 100%;
  transform-origin: bottom center;
  transition: transform 1s;
} */
/* .wine-bottle.pouring {
  transform: rotate(-15deg);
} */
/* .glass-container {
  width: 100px;
  height: 250px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  right: -10%;
  bottom: -165%;
} */
/* .wine-glass {
  position: relative;
  border: 2px solid #CEE1ED;
  background-color: #CEE1ED;
  border-radius: 0 0 50% 50%;
  overflow: hidden;
  width: 120px;
  height: 155px;
} */
/* .wine-glass-stem {
  width: 6px;
  height: 80px;
  background-color: #CEE1ED;
  margin-top: -2px;
} */
/* .wine-glass-base {
  width: 95px;
  height: 10px;
  background-color: #CEE1ED;
  border-radius: 50%;
  margin-top: -2px;
} */
/* .water {
  position: absolute;
  bottom: 43%;
  width: 100%;
  background-color: rgba(165, 42, 42, 0.8);
  transition: height 1s;
  border-radius: 0 0 50% 50%;
} */
/* button {
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
} */
/* button.correct {
  background-color: lightgreen;
}
button.wrong {
  background-color: lightcoral;
}
button.shake {
  animation: shake 0.5s;
} */
@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
}
.checkmark {
  color: green;
  font-weight: bold;
  margin-left: 10px;
}
.bottle-glass-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: absolute;
  right: 10px;
  top: 10px;
}
.wine-glass {
  position: relative;
  width: 120px;
  height: 155px;
  border: 2px solid #CEE1ED;
  background-color: #CEE1ED;
  border-radius: 0 0 50% 50%;
  overflow: hidden;
}
.water {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: rgba(165, 42, 42, 0.8);
  transition: height 1s;
}
.score-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}
.score-popup-content {
  background: white;
  padding: 20px;
  text-align: center;
  border-radius: 10px;
  pointer-events: auto; /* 确保弹窗内的元素仍可点击 */
}
.score-popup-content button:hover {
  background-color: #7f1023;
}
.options {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px; /* 控制按鈕之間的間距 */
}
.options button {
  width: 160px;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}
/*  */
.letter-icon {
  height: 100%;
  width: 100%;
  position: relative;
  /* overflow: hidden; */
}

svg {
  max-width: 100%;
  height: auto;
  transition: opacity 1s ease;
}

svg.hide {
  opacity: 0;
}

.flap {
  transform-origin: top;
  transition: transform 0.8s ease;

}


.coupon {
  /* outline: 1px solid red; */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
  background-color: #7f1023;
  padding: 20px 40px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  color: white;
  opacity: 0;
  z-index: -1;
  transition: opacity 0.5s ease, transform 1s ease;
  display: flex;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5); 
  clip-path: polygon(
    0 0, 2% 10%, 0 20%, 2% 30%, 0 40%, 2% 50%, 0 60%, 2% 70%, 0 80%, 2% 90%, 0 100%,
    100% 100%, 98% 90%, 100% 80%, 98% 70%, 100% 60%, 98% 50%, 100% 40%, 98% 30%, 100% 20%, 98% 10%, 100% 0
  );
}


.coupon.show {
  opacity: 1;
  z-index: 1;
  animation: popup 1.5s ease forwards;
}

@keyframes popup {
  0% {
    transform: translate(-50%, -50%) scale(0.5);
  }
  50% {
    transform: translate(-50%, -50%) scale(0.7);
  }
  100% {
    transform: translate(-50%, -50%) scale(1.5);
  }
}

/* 彩带动画 */
.confetti {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #f00; /* 彩带颜色 */
  animation: confetti-fall 4s infinite; /* 使用动画 */
}

/* 彩带动画关键帧 */
@keyframes confetti-fall {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh); 
    opacity: 0;
  }
}
</style>