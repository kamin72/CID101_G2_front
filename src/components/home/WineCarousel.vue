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
            wine:[
                {
                    id:1,
                    nameEn: 'Wine1',
                    nameCh:'葡萄酒1',
                    price:'1200',
                    txt:'我是介紹我是介紹我是介紹我是介紹我是介紹我是介紹',
                    img:'/src/assets/img/wine/Elegant-Red-Wine.png'
                },
                {
                    id:2,
                    nameEn: 'Wine2',
                    nameCh:'葡萄酒2',
                    price:'1200',
                    txt:'我是介紹我是介紹我是介紹我是介紹我是介紹我是介紹',
                    img:'/src/assets/img/wine/Elegant-Red-Wine.png'
                },
                {
                    id:3,
                    nameEn: 'Wine3',
                    nameCh:'葡萄酒3',
                    price:'1200',
                    txt:'我是介紹我是介紹我是介紹我是介紹我是介紹我是介紹',
                    img:'/src/assets/img/wine/Elegant-Red-Wine.png'
                },
                {
                    id:4,
                    nameEn: 'Wine4',
                    nameCh:'葡萄酒4',
                    price:'1200',
                    txt:'我是介紹我是介紹我是介紹我是介紹我是介紹我是介紹',
                    img:'/src/assets/img/wine/Elegant-Red-Wine.png'
                },
                {
                    id:5,
                    nameEn: 'Wine5',
                    nameCh:'葡萄酒5',
                    price:'1200',
                    txt:'我是介紹我是介紹我是介紹我是介紹我是介紹我是介紹',
                    img:'/src/assets/img/wine/Elegant-Red-Wine.png'
                },
            ],
            modules: [EffectCoverflow, Navigation]
      };
    },
  };
</script>
<template>
    <swiper
    ref="mySwiper"
    :slidesPerView="5"
    :loop="true"
    :centeredSlides="true"
    :initialSlide="2"
    :loopAdditionalSlides="1"
    :effect="'coverflow'"
    :coverflowEffect="{
      rotate: 0,
      stretch: 10,
      depth: 200,
      modifier: 1,
      slideShadows: false,
    }"
    :navigation="true"
    :modules="modules"
    class="wineSwiper"
    >
    <swiper-slide v-for="bottle in wine" :key="bottle.id">
        <img :src="bottle.img" alt="bottle.nameCh">
    </swiper-slide>
    
  </swiper>
 
</template>