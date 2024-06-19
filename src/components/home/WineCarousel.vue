<script>
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/css';
  import 'swiper/css/effect-coverflow';
  import 'swiper/css/navigation';

  // import required modules
  import { EffectCoverflow, Navigation } from 'swiper/modules';

  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    data() {
      return {
        wine: [
          {
            id: 1,
            nameEn: 'Modern Red Wine',
            nameCh: '精釀紅酒 2016',
            price: '1200',
            txt: '香氣優雅，充滿了黑醋栗的香氣，並帶有李子白蘭地、香草、焦糖、丁香和肉桂的味道。此酒散發出新鮮的皮革和橄欖的味道，並伴有豐富而細緻的單寧和鐵一樣的礦物質味。口感圓潤、精緻、複雜，回味持久。',
            img: '/src/assets/img/wine/Elegant-Red-Wine.png',
          },
          {
            id: 2,
            nameEn: 'White Wine',
            nameCh: '精選白葡萄酒',
            price: '1200',
            txt: '香氣優雅，充滿了黑醋栗的香氣，並帶有李子白蘭地、香草、焦糖、丁香和肉桂的味道。此酒散發出新鮮的皮革和橄欖的味道，並伴有豐富而細緻的單寧和鐵一樣的礦物質味。口感圓潤、精緻、複雜，回味持久。',
            img: '/src/assets/img/wine/Ice-White-Wine.png',
          },
          {
            id: 3,
            nameEn: 'Modern Red Wine3',
            nameCh: '葡萄酒3',
            price: '1200',
            txt: '香氣優雅，充滿了黑醋栗的香氣，並帶有李子白蘭地、香草、焦糖、丁香和肉桂的味道。此酒散發出新鮮的皮革和橄欖的味道，並伴有豐富而細緻的單寧和鐵一樣的礦物質味。口感圓潤、精緻、複雜，回味持久。',
            img: '/src/assets/img/wine/Pearl-White-Wine.png',
          },
          {
            id: 4,
            nameEn: 'Modern Red Wine4',
            nameCh: '葡萄酒4',
            price: '1200',
            txt: '香氣優雅，充滿了黑醋栗的香氣，並帶有李子白蘭地、香草、焦糖、丁香和肉桂的味道。此酒散發出新鮮的皮革和橄欖的味道，並伴有豐富而細緻的單寧和鐵一樣的礦物質味。口感圓潤、精緻、複雜，回味持久。',
            img: '/src/assets/img/wine/Star-Fortified-Wine.png',
          },
          {
            id: 5,
            nameEn: 'Modern Red Wine5',
            nameCh: '葡萄酒5',
            price: '1200',
            txt: '香氣優雅，充滿了黑醋栗的香氣，並帶有李子白蘭地、香草、焦糖、丁香和肉桂的味道。此酒散發出新鮮的皮革和橄欖的味道，並伴有豐富而細緻的單寧和鐵一樣的礦物質味。口感圓潤、精緻、複雜，回味持久。',
            img: '/src/assets/img/wine/Sky-Sparkling-Wine.png',
          },
        ],
        modules: [EffectCoverflow, Navigation],
        activeSlide: 2, // Track the active slide index
      };
    },
    methods: {
      onSlideChange(swiper) {
        this.activeSlide = swiper.realIndex;
      },
    }
  }
</script>

<template>
    <swiper
      ref="mySwiper"
      :slidesPerView="5"
      :loop="true"
      :centeredSlides="true"
      :initialSlide="2"
      :loopAdditionalSlides="2"
      :effect="'coverflow'"
      :coverflowEffect="{
        rotate: 0,
        stretch: 0,
        depth: 200,
        modifier: 3,
        slideShadows: false,
      }"
      :breakpoints="{
        430: {
          coverflowEffect:{
            rotate: 0,
            stretch: 0,
            depth: 500,
            modifier: 1,
            slideShadows: false,
          }
	      },
        995: {
          coverflowEffect:{
            rotate: 0,
            stretch: 0,
            depth: 500,
            modifier: 1,
            slideShadows: false,
          }
	      }
      }"
      :navigation="{
	    nextEl: '.swiper-button-next',
	    prevEl: '.swiper-button-prev'
	    }"
      :modules="modules"
      class="wineSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide v-for="bottle in wine" :key="bottle.id">
        <img :src="bottle.img" :alt="bottle.nameCh" class="bottle"/>
      </swiper-slide>
      <button class="swiper-button swiper-button-next"></button>
      <button class="swiper-button swiper-button-prev"></button>	
    </swiper>
    <div class="wine-content">
      <h2>{{ wine[activeSlide].nameEn }}</h2>
      <h3>{{ wine[activeSlide].nameCh }}</h3>
      <h4>NT. {{ wine[activeSlide].price }}</h4>
      <p>{{ wine[activeSlide].txt }}</p>
    </div>
</template>
