<template>
  <!-- 首頁banner -->
  <section class="homeBanner">
    <div class="banner-img"></div>
    <div class="octagon-wrap">
      <div class="octagon-1 octagon">
        <div class="line-top"></div>
        <div class="line-bottom"></div>
      </div>
        <div class="octagon-2 octagon">
          <div class="line-top"></div>
        <div class="line-bottom"></div>
        </div>
        <div class="octagon-3 octagon">
          <div class="line-bottom"></div>
          <div class="line-top"></div>
        </div>
        <div class="octagon-4 octagon">
          <div class="line-bottom"></div>
          <div class="line-top"></div>
        </div>
        <div class="octagon-5 octagon">
          <div class="line-bottom"></div>
          <div class="line-top"></div>
        </div>
        <div class="octagon-6 octagon">
          <div class="line-bottom"></div>
          <div class="line-top"></div>
        </div>
        <div class="octagon-7 octagon">
          <div class="line-bottom"></div>
          <div class="line-top"></div>
        </div>
        <div class="octagon-8 octagon">
          <div class="line-bottom"></div>
          <div class="line-top"></div>
        </div>
    </div>
        
    <div class="homeBanner_container">
      <div class="homeBanner_wine" >
        <div class="homeBanner_wine_wapper" >
          <img src="/src/assets/img/wine/bannerwine.png" class="image" />
            <img src="/src/assets/img/home/wineshadow.png" class="reflection" />
        </div>
      </div>
      <div class="homeBanner_txt"  ref="banner">
        <h3>MEMORABLE</h3>
        <h2>WINE</h2>
        <h4>JOURNEYS</h4>
      </div>
      <div class="homeBanner_mountain">
        <img src="/src/assets/img/home/homebanner2.png" alt="">
      </div>
    </div>   
  </section>

  <!-- 關於我們 -->
  <section class="homeAboutus">
    <div class="container homeAboutus_container">
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

        <div class="more-btn">
        <RouterLink to="/about">MORE</RouterLink>
      </div>

        <div class="homeAboutus_BarrelImg">
          <img src="/src/assets/img/home/BarrelImg.png" />
        </div>
      </div>
    </div>
  </section>
  <!-- 酒瓶輪播 -->
  <section class="wine">
    <div class="container">
      <WineCarousel></WineCarousel>
      <div class="more-btn">
        <RouterLink to="/product">MORE</RouterLink>
      </div>
    </div>
  </section>
  <!-- 地圖 -->
  <section class="home-map">
    <div class="container">
      <div class="title">
        <span></span>
        <h2>Winery Map</h2>
        <span></span>
      </div>
      <img src="../assets/img/home/home-map.png" alt="">
      <div v-for="(card, index) in map" :key="index" class="card" :class="card.type">
        <div class="dot" @click="toggleInfo(index)"></div>
        <div class="card-wrap" :class="{ active: card.isActive }">
          <span class="line"></span>
          <div class="card-info">
            <div class="card-info-image">
              <!-- 部屬用-解析圖片位置 -->
              <img :src="parseServerImg(card.img)" :alt="card.title">
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

  <!-- event輪播圖 -->
  <section class="swiper-wrap swiper-course">
    <div class="container">
      <SwiperComponent swiperTitle="Course"></SwiperComponent>
      <div class="more-btn">
        <RouterLink to="/course">MORE</RouterLink>
      </div>
    </div>
  </section>
  <!-- news輪播圖 -->
  <section class="swiper-wrap swiper-news">
    <div class="container">
      <SwiperComponent swiperTitle="News"></SwiperComponent>
      <div class="more-btn">
        <RouterLink to="/news">MORE</RouterLink>
      </div>
    </div>
  </section>
</template>

<script>
// swiper
import SwiperComponent from '@/components/home/SwiperComponent.vue'
import WineCarousel from '@/components/home/WineCarousel.vue'
import { gsap } from 'gsap';

export default {
  components: {
    SwiperComponent,
    WineCarousel
  },
  data() {
    return {
      map: [
        {
          type: 'card-grape',
          title: '黑皮諾葡萄園',
          description: '這是一座翠綠山麓的小酒莊,擁有得天獨厚的火山岩土壤及涼爽宜人的氣候,非常適合栽種黑皮諾葡萄。陽光充足而夜涼的環境,孕育出獨特的酒香與層次豐富的口感。',
          img: 'home-map-grapegarden.png',
          isActive: false
        },
        {
          type: 'card-service',
          title: '客服中心',
          description: '這裡提供關於葡萄酒的歷史、釀造過程、品種及產地等知識的教育。教導學員品酒的基本技巧，包括觀色、聞香、品味等，並提供品酒實踐機會，讓學員能夠在專業指導下提升品酒水平。',
          img: 'home-map-service.png',
          isActive: false
        },
        {
          type: 'card-class',
          title: '品酒學堂',
          description: '這裡提供關於葡萄酒的歷史、釀造過程、品種及產地等知識的教育。教導學員品酒的基本技巧，包括觀色、聞香、品味等，並提供品酒實踐機會，讓學員能夠在專業指導下提升品酒水平。',
          img: 'home-map-class.png',
          isActive: false
        },
        {
          type: 'card-oak',
          title: '橡木桶室',
          description: '這裡是釀造和儲存優質葡萄酒的核心地帶，參觀我們的橡木桶室，讓您親身體驗葡萄酒從釀造到熟成的過程。讓學員更了解存放與熟成、風味與香氣、顏色與質地、品質提升和儲存空間。',
          img: 'home-map-oak.png',
          isActive: false
        },
        {
          type: 'card-vintage',
          title: '釀造室',
          description: '這裡是釀造和儲存優質葡萄酒的核心地帶，參觀我們的橡木桶室，讓您親身體驗葡萄酒從釀造到熟成的過程。讓學員更了解存放與熟成、風味與香氣、顏色與質地、品質提升和儲存空間。',
          img: 'home-map-vintage.png',
          isActive: false
        }
      ],
      canvas: null,
      ctx: null
    };
  },
  methods: {
    toggleInfo(index) {
      // Toggle the active state of the clicked card
      this.map.forEach((card, idx) => {
        if (idx === index) {
          card.isActive = !card.isActive;
        } else {
          card.isActive = false;
        }
      });
    },
    handleClickOutside(event) {
      if (!event.target.closest('.card')) {
        this.map.forEach(card => card.isActive = false);
      }
    },
    parseImgMap(file) {
      return new URL(`../assets/img/home/${file}`, import.meta.url).href;
    },
    // 部屬用-解析圖片位置
    parseServerImg(imgURL) {
      // 因為圖檔放在server中，只要組出路徑即可，
      // 先確認這個路徑透過瀏覽器開啟有沒有圖檔，再確認斜線那些有沒有寫錯
      // return `https://tibamef2e.com/chd104/ingrid/file/${imgURL}`
      return `${import.meta.env.VITE_FILE_URL}/${imgURL}`
    },
  },
  mounted() {
  //  GSAP animation for octagon
    gsap.to(this.$refs.banner,{ duration: 3,color:"white", ease: "power4.in"});
    gsap.fromTo(".banner-img", {scaleX:0.8,scaleY:0.8},{duration: 3, scaleX:1,scaleY:1, ease: "power4.in"});
    gsap.fromTo(".octagon-1", {width: "100%", height: "10%"},{duration: 3,width: "100%", height: "0", ease: "expo.in"});
    gsap.fromTo(".octagon-2", {width: "100%", height: "10%"},{duration: 3,width: "100%", height: "0", ease: "expo.in"});
    gsap.fromTo(".octagon-3", {width: "50%", height: "100%"},{duration: 3, width: "0", height: "0", ease: "expo.in"});
    gsap.fromTo(".octagon-4", {width: "40%", height: "100%"},{duration: 3,width: "0", height:"100%", ease: "expo.in"});
    gsap.fromTo(".octagon-5", {width: "50%", height: "100%"},{duration: 3,width: "0", height: "0",ease: "expo.in"});
    gsap.fromTo(".octagon-6", {width: "50%", height: "100%"},{duration: 3, width: "0", height: "0", ease: "expo.in"});
    gsap.fromTo(".octagon-7", {width: "40%", height: "100%"},{duration: 3, width: "0", height:"100%", ease: "expo.in"});
    gsap.fromTo(".octagon-8", {width: "50%", height: "100%"},{duration: 3, width: "0", height: "0", ease: "expo.in"});
  
    //map點擊卡片外圍
    document.addEventListener('click', this.handleClickOutside);
    window.scrollTo(0, 0), document.addEventListener('click', this.handleClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
}
</script>
