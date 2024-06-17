<template>
  <!-- 開場輪播圖 -->
  <section class="homeBanner">
    <div class="homeBanner_container">
      <div class="homeBanner_wine">
        <div class="homeBanner_wine_wapper">
          <img src="/src/assets/img/wine/bannerwine.png" class="image" />
          <img src="/src/assets/img/home/wineshadow.png" class="reflection" />
        </div>
      </div>
      <div class="homeBanner_txt">
        <h3>MEMORABLE</h3>
        <h2>WINE</h2>
        <h4>JOURNEYS</h4>
      </div>
    </div>
  </section>

  <!-- 關於我們 -->
  <section class="homeAboutus">
    <div class="homeAboutus_container">
      <div class="homeAboutus_pic">
        <img src="/src/assets/img/home/homeAboutus_pic.png" />
      </div>

      <div class="wrap_homeAboutus">
        <div class="homeAboutus_txt">
          <h2>About Us</h2>
          <p>
            歡迎來到酒莊，我們位於浪漫的山莊之中，歷史悠久，擁有百年釀酒傳統。每一瓶葡萄酒都凝聚了代代相傳的技藝與熱情。酒莊創建於十九世紀，由一位熱愛葡萄酒文化的釀酒師創立，他的夢想是讓每個人都能享受到精緻的葡萄美酒。我們提供獨特的品酒體驗，帶您穿越時光，品味百年歷史的沉澱與故事。
          </p>
        </div>

        <div class="wrap_homeAboutus_detail">
          <div class="homeAboutus_detail">
            <img src="/src/assets/img/home/grape.png" />
            <p>歷史悠久的釀酒傳統</p>
          </div>
          <div class="homeAboutus_detail">
            <img src="/src/assets/img/home/wine.png" />
            <p>獨特的品酒體驗</p>
          </div>
          <div class="homeAboutus_detail">
            <img src="/src/assets/img/home/star.png" />
            <p>熱愛葡萄酒文化的釀酒師創立</p>
          </div>
        </div>

        <RouterLink to="/About">
          <a href="#">
            <button>MORE</button>
          </a>
        </RouterLink>

        <div class="homeAboutus_BarrelImg">
          <img src="/src/assets/img/home/BarrelImg.png" />
        </div>
      </div>
    </div>
  </section>
  <!-- 酒瓶輪播 -->
  <section>
    <div class="container">
      <WineCarousel></WineCarousel>
    </div>
  </section>
  <!-- 地圖 -->
  <!-- <section class="home-map">
<div class="container">
    <img src="../assets/img/home/home-map.png" alt="">
    <div class="card card-grape">
      <div class="dot"></div>
      <span></span>
      <div class="card-info">
        <div class="card-info-image">
          <img src="../assets/img/home/home-map-grapegarden.png" alt="">
        </div>
        <div class="card-info-txt">
          <h4>黑皮諾葡萄園</h4>
          <p>這是一座翠綠山麓的小酒莊,擁有得天獨厚的火山岩土壤及涼爽宜人的氣候,非常適合栽種黑皮諾葡萄。陽光充足而夜涼的環境,孕育出獨特的酒香與層次豐富的口感。</p>
        </div>
      </div>
    </div>
    <div class="card card-service">
      <div class="dot"></div>
      <span></span>
      <div class="card-info">
        <div class="card-info-image">
          <img src="../assets/img/home/home-map-service.png" alt="">
        </div>
        <div class="card-info-txt">
          <h4>客服中心</h4>
          <p>這裡提供關於葡萄酒的歷史、釀造過程、品種及產地等知識的教育。教導學員品酒的基本技巧，包括觀色、聞香、品味等，並提供品酒實踐機會，讓學員能夠在專業指導下提升品酒水平。</p>
        </div>
      </div>
    </div>
  
</div>
</section> -->
  <div id="app">
    <section class="home-map">
      <div class="container">
        <img src="../assets/img/home/home-map.png" alt="" />

        <div v-for="(card, index) in cards" :key="index" class="card" :class="card.type">
          <div class="dot" @click="toggleInfo(index)"></div>
          <div class="card-wrap" :class="{ active: card.isActive }">
            <span class="line"></span>
            <div class="card-info">
              <div class="card-info-image">
                <img :src="card.img" :alt="card.title" />
              </div>
              <div class="card-info-txt">
                <h4>{{ card.title }}</h4>
                <p>{{ card.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <!-- event輪播圖 -->
  <section>
    <div class="container">
      <SwiperComponent swiperTitle="Event"></SwiperComponent>
      <SwiperComponent swiperTitle="News"></SwiperComponent>
    </div>
  </section>
</template>

<script>
// swiper
import SwiperComponent from '@/components/home/SwiperComponent.vue'
import WineCarousel from '@/components/home/WineCarousel.vue'

export default {
  components: {
    SwiperComponent,
    WineCarousel
  },
  mounted() {
    window.scrollTo(0, 0), document.addEventListener('click', this.handleClickOutside)
  },
  data() {
    return {
      cards: [
        {
          type: 'card-grape',
          title: '黑皮諾葡萄園',
          description:
            '這是一座翠綠山麓的小酒莊,擁有得天獨厚的火山岩土壤及涼爽宜人的氣候,非常適合栽種黑皮諾葡萄。陽光充足而夜涼的環境,孕育出獨特的酒香與層次豐富的口感。',
          img: 'src/assets/img/home/home-map-grapegarden.png',
          isActive: false
        },
        {
          type: 'card-service',
          title: '客服中心',
          description:
            '這裡提供關於葡萄酒的歷史、釀造過程、品種及產地等知識的教育。教導學員品酒的基本技巧，包括觀色、聞香、品味等，並提供品酒實踐機會，讓學員能夠在專業指導下提升品酒水平。',
          img: 'src/assets/img/home/home-map-service.png',
          isActive: false
        },
        {
          type: 'card-class',
          title: '品酒學堂',
          description:
            '這裡提供關於葡萄酒的歷史、釀造過程、品種及產地等知識的教育。教導學員品酒的基本技巧，包括觀色、聞香、品味等，並提供品酒實踐機會，讓學員能夠在專業指導下提升品酒水平。',
          img: 'src/assets/img/home/home-map-class.png',
          isActive: false
        },
        {
          type: 'card-oak',
          title: '橡木桶室',
          description:
            '這裡是釀造和儲存優質葡萄酒的核心地帶，參觀我們的橡木桶室，讓您親身體驗葡萄酒從釀造到熟成的過程。讓學員更了解存放與熟成、風味與香氣、顏色與質地、品質提升和儲存空間。',
          img: 'src/assets/img/home/home-map-oak.png',
          isActive: false
        },
        {
          type: 'card-vintage',
          title: '釀造室',
          description:
            '這裡是釀造和儲存優質葡萄酒的核心地帶，參觀我們的橡木桶室，讓您親身體驗葡萄酒從釀造到熟成的過程。讓學員更了解存放與熟成、風味與香氣、顏色與質地、品質提升和儲存空間。',
          img: 'src/assets/img/home/home-map-vintage.png',
          isActive: false
        }
      ]
    }
  },
  methods: {
    toggleInfo(index) {
      // Toggle the active state of the clicked card
      this.cards.forEach((card, idx) => {
        if (idx === index) {
          card.isActive = !card.isActive
        } else {
          card.isActive = false
        }
      })
    },
    handleClickOutside(event) {
      if (!event.target.closest('.card')) {
        this.cards.forEach((card) => (card.isActive = false))
      }
    }
  },

  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  }
}
</script>
