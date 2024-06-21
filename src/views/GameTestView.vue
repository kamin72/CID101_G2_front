<template>
  <section class="game">
    <div class="game-container">
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
    <Router-link to="/GameTotal">
      <button>領取</button>
    </Router-link>
    </div>
  </section>
</template>

  
  <script>
  export default {
    data() {
      return {
        isPouring: false,
        waterLevel: 0,
        increment: 10, // 每次回答正确增加的水量百分比
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
    created() { // 這裡是新的，組件初始化時隨機排序問題
    this.shuffleQuestions();
  },
    methods: {
        shuffleQuestions() { // 這裡是新的，隨機排序問題的函數
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
          alert('所有问题已回答完毕！');
          // 可以在这里添加跳转或其他逻辑
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .game-container {
    position: relative;
  }
  .bottle-container {
    /* outline: 1px solid red; */
    position: relative;
    margin: 20px 0;
    right: -45%;
    width: 46%;
    transition: transform 1s;
  }
  .wine-bottle {
    width: 100%;
    height: 100%;
    transform-origin: bottom center;
    transition: transform 1s;
  }
  .wine-bottle.pouring {
    transform: rotate(-15deg);
  }
  .glass-container {
  width: 100px;
  height: 250px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  right: -10%;
  bottom: -165%;
}
  .wine-glass {
  position: relative;
  border: 2px solid #CEE1ED;
  background-color: #CEE1ED;
  border-radius: 0 0 50% 50%;
  overflow: hidden;

  width: 120px;
  height: 155px;
  }
  .wine-glass-stem {
  width: 6px;
  height: 80px;
  background-color: #CEE1ED;
  margin-top: -2px;
}
.wine-glass-base {
  width: 95px;
  height: 10px;
  background-color: #CEE1ED;
  border-radius: 50%;
  margin-top: -2px;
}
.water {
    position: absolute;
    bottom: 43%;
    width: 100%;
    background-color: rgba(165, 42, 42, 0.8);
    transition: height 1s;
    border-radius: 0 0 50% 50%;
  }
  button {
    margin-top: 20px;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  button.correct {
    background-color: lightgreen;
  }
  button.wrong {
    background-color: lightcoral;
  }
  button.shake {
    animation: shake 0.5s;
  }
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
  </style>
  