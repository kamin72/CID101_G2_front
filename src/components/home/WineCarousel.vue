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
        wine: [],
        modules: [EffectCoverflow, Navigation],
        activeSlide: 0, // Initialize activeSlide to 0 to prevent out-of-bound errors
        swiper: null,
      };
    },
    methods: {
      fetchWineData() {
        fetch(`${import.meta.env.VITE_API_URL}/home/wineCarousel.php`)
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              alert(data.msg);
            } else if (data.wine) {
              // Duplicate the wine data array twice
              this.wine = data.wine.concat(data.wine);
              localStorage.setItem('wine', JSON.stringify(this.wine));
              // Reset activeSlide to 0 when new data is fetched
              this.activeSlide = 0;
            }
          });
      },
      onSlideChange(swiper) {
        this.activeSlide = swiper.realIndex;
      },
      parseServerImg(imgURL) {
        return `${import.meta.env.VITE_FILE_URL}/${imgURL}`;
      },
      onSwiper(swiper) {
        this.swiper = swiper;
      },
    },
    mounted() {
      this.fetchWineData();
    },
  }
</script>

<template>
  <swiper
    ref="mySwiper"
      :slidesPerView="5"
      :loop="true"
      :centeredSlides="true"
      :effect="'coverflow'"
      :coverflowEffect="{
        rotate: 0,
        stretch: -60,
        depth: 400,
        modifier: 1,
        slideShadows: false,
      }"
      :breakpoints="{
        430:{
          coverflowEffect:{
            rotate: 0,
            stretch: -50,
            depth: 300,
            modifier: 1,
            slideShadows: false,
          }
        },
        500:{
          coverflowEffect:{
            rotate: 0,
            stretch: -90,
            depth: 450,
            modifier: 1,
            slideShadows: false,
          }
        },
        600:{
          coverflowEffect:{
            rotate: 0,
            stretch: -130,
            depth: 600,
            modifier: 1,
            slideShadows: false,
          }
        },
        700:{
          coverflowEffect:{
            rotate: 0,
            stretch: -130,
            depth: 500,
            modifier: 1,
            slideShadows: false,
          }
        },
        800: {
          coverflowEffect:{
            rotate: 0,
            stretch: -120,
            depth: 400,
            modifier: 1,
            slideShadows: false,
          }
        },
        995: {
          coverflowEffect:{
            rotate: 0,
            stretch: -50,
            depth: 200,
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
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide v-for="item in wine" :key="item.prod_id">
      <img :src="parseServerImg(item.prod_img)" :alt="item.prod_name" class="bottle"/>
    </swiper-slide>
    <button class="swiper-button swiper-button-next"></button>
    <button class="swiper-button swiper-button-prev"></button>  
  </swiper>
  <div class="wine-content" v-if="wine.length > 0">
    <h2>{{ wine[activeSlide]?.prod_ename }}</h2>
    <h3>{{ wine[activeSlide]?.prod_name }}</h3>
    <h4>NT. {{ wine[activeSlide]?.prod_price }}</h4>
    <p>{{ wine[activeSlide]?.prod_describe }}</p>
  </div>
</template>
