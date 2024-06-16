<template>
  <section class="game">
    <div class="game-container">
      <div class="question">
        <h3>{{ currentQuestion.num}}</h3>
        <p>{{ currentQuestion.text }}</p>
      </div>
      <div class="options">
        <button
          v-for="option in currentQuestion.options"
          :key="option.id"
          :class="{ correct: isCorrect && selectedOption === option.id, wrong: !isCorrect && selectedOption === option.id }"
          @click="checkAnswer(option.id)"
        >
          {{ option.text }}
          <span v-if="isCorrect && selectedOption === option.id" class="checkmark">✔</span>
        </button>
      </div>

      <div class="winebottle" :class="{ pour: pouring }">
        <img src="../assets/img/game/winebottle.png" alt="">
      </div>
      <div class="wineglass">
        <img src="../assets/img/game/wineglass.png" alt="">
        <div class="wine-in-glass" :style="{ height: wineHeight }"></div>
      </div>
    </div>
  </section> 
</template>
  
<script>
  export default {
    data() {
      return {
        wineHeight: '0px',
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
        // 其他問題數據
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
        isCorrect: false,
        pouring: false,
        // wineHeight: '0px',
      };
    },
    computed: {
      currentQuestion() {
        return this.questions[this.currentQuestionIndex];
      }
    },
    methods: {
      checkAnswer(optionId) {
      this.selectedOption = optionId;
      const selected = this.currentQuestion.options.find(option => option.id === optionId);
      this.isCorrect = selected.correct;

      if (this.isCorrect) {
        this.pouring = true;
        setTimeout(() => {
          this.nextQuestion();
          this.pouring = false;
        }, 2000); // 延迟2秒
      } else {
        this.$nextTick(() => {
          this.shakeOption(() => {
            this.nextQuestion();
          });
        });
      }
    },
    nextQuestion() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
        this.selectedOption = null;
        this.isCorrect = false;
      } else {
        this.allQuestionsAnswered = true;
      }
    },
    shakeOption(callback) {
      const optionButton = this.$el.querySelector('.wrong');
      if (optionButton) {
        optionButton.classList.add('shake');
        setTimeout(() => {
          optionButton.classList.remove('shake');
          if (typeof callback === 'function') {
            callback();
          }
        }, 500); // 震动持续0.5秒
      }
    }
  },
  watch: {
    pouring(newVal) {
      if (newVal) {
        let currentHeight = parseInt(this.wineHeight);
        const interval = setInterval(() => {
          currentHeight += 5; // 每次增加5像素，可以根据需要调整
          this.wineHeight = currentHeight + 'px';
          if (currentHeight >= 100) {
            clearInterval(interval);
          }
        }, 200); // 每次增加液体的时间间隔，可以根据需要调整
      } 
    }
  }
  };
</script>
  
<style scoped lang="scss">
.winebottle {
  position: relative;
  transition: transform 2s;
}
.winebottle.pour {
  transform: rotate(-13deg);
}
.wine {
  width: 20px;
  height: 100px;
  background: linear-gradient(to bottom, rgba(255,0,0,0.8), rgba(255,0,0,0.5));
  // border-radius: 10px 10px 0 0; /* 圓角效果 */
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  animation: pour 2s forwards;
}

@keyframes pour {
  0% {
    height: 0;
    bottom: 0;
    clip-path: polygon(50% 0%, 50% 0%, 50% 0%); /* 初始狀態為點 */
  }
  5% {
    height: 5px;
    clip-path: polygon(50% 0%, 49% 100%, 51% 100%);
  }
  10% {
    height: 10px;
    clip-path: polygon(50% 0%, 48% 100%, 52% 100%);
  }
  15% {
    height: 15px;
    clip-path: polygon(50% 0%, 47% 100%, 53% 100%);
  }
  20% {
    height: 20px;
    clip-path: polygon(50% 0%, 46% 100%, 54% 100%);
  }
  25% {
    height: 25px;
    clip-path: polygon(50% 0%, 45% 100%, 55% 100%);
  }
  30% {
    height: 30px;
    clip-path: polygon(50% 0%, 44% 100%, 56% 100%);
  }
  35% {
    height: 35px;
    clip-path: polygon(50% 0%, 43% 100%, 57% 100%);
  }
  40% {
    height: 40px;
    clip-path: polygon(50% 0%, 42% 100%, 58% 100%);
  }
  45% {
    height: 45px;
    clip-path: polygon(50% 0%, 41% 100%, 59% 100%);
  }
  50% {
    height: 50px;
    clip-path: polygon(50% 0%, 40% 100%, 60% 100%);
  }
  55% {
    height: 55px;
    clip-path: polygon(50% 0%, 39% 100%, 61% 100%);
  }
  60% {
    height: 60px;
    clip-path: polygon(50% 0%, 38% 100%, 62% 100%);
  }
  65% {
    height: 65px;
    clip-path: polygon(50% 0%, 37% 100%, 63% 100%);
  }
  70% {
    height: 70px;
    clip-path: polygon(50% 0%, 36% 100%, 64% 100%);
  }
  75% {
    height: 75px;
    clip-path: polygon(50% 0%, 35% 100%, 65% 100%);
  }
  80% {
    height: 80px;
    clip-path: polygon(50% 0%, 34% 100%, 66% 100%);
  }
  85% {
    height: 85px;
    clip-path: polygon(50% 0%, 33% 100%, 67% 100%);
  }
  90% {
    height: 90px;
    clip-path: polygon(50% 0%, 32% 100%, 68% 100%);
  }
  95% {
    height: 95px;
    clip-path: polygon(50% 0%, 31% 100%, 69% 100%);
  }
  100% {
    height: 100px;
    bottom: -100px;
    clip-path: polygon(50% 0%, 30% 100%, 70% 100%);
  }
}

.wineglass {
  position: relative;
  overflow: hidden;
}
.wine-in-glass {
  width: 100%; /* 根據需要調整以適應酒杯 */
  height: 0;
  background: red;
  position: absolute;
  bottom: 0;
  left: 0;
  transition: height 2s;
} 


</style>
