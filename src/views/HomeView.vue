<template>
  <!-- 開場輪播圖 -->
  <section class="homeBanner">
    <div class="homeBanner_container">

      <div class="homeBanner_wine">
        <div class="homeBanner_wine_wapper">
          <img src="/src/assets/img/wine/bannerwine.png" class="image">
          <img src="/src/assets/img/home/Mask group.png" class="reflection">
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
        <img src="/src/assets/img/home/homeAboutus_pic.png">
      </div>

      <div class="wrap_homeAboutus">

        <div class="homeAboutus_txt">
          <h3>About Us</h3>
          <p>
            歡迎來到酒莊，我們位於浪漫的山莊之中，歷史悠久，擁有百年釀酒傳統。每一瓶葡萄酒都凝聚了代代相傳的技藝與熱情。酒莊創建於十九世紀，由一位熱愛葡萄酒文化的釀酒師創立，他的夢想是讓每個人都能享受到精緻的葡萄美酒。我們提供獨特的品酒體驗，帶您穿越時光，品味百年歷史的沉澱與故事。
          </p>
        </div>


        <div class="wrap_homeAboutus_detail">
          <div class="homeAboutus_detail">
            <img src="/src/assets/img/home/grape.png">
            <p>歷史悠久的釀酒傳統</p>
          </div>
          <div class="homeAboutus_detail">
            <img src="/src/assets/img/home/wine.png">
            <p>獨特的品酒體驗</p>
          </div>
          <div class="homeAboutus_detail">
            <img src="/src/assets/img/home/star.png">
            <p>熱愛葡萄酒文化的釀酒師創立</p>
          </div>
        </div>

        <button>
          <a href="#">MORE</a>
        </button>

        <div class="homeAboutus_BarrelImg">
          <img src="/src/assets/img/home/BarrelImg.png">
        </div>

      </div>
    </div>
  </section>

  <!-- event輪播圖 -->
<section>
  <div class="container">
		<SwiperComponent swiperTitle="Event"></SwiperComponent>
		<SwiperComponent swiperTitle="News"></SwiperComponent>
	</div>
</section>
</template>


<!-- swiper -->
<script>
import SwiperComponent from '@/components/home/SwiperComponent.vue'
export default {
	components: {
		SwiperComponent
	}
}
</script>