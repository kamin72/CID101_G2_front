<script>
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';

  // Import Swiper styles
  import 'swiper/css';

  // import required modules
  import { Navigation } from 'swiper/modules';

  export default {
  props: ['swiperTitle'],
    data () {
        return {
            content: [
            {
                id:1,
                title: "品酒體驗-初級課程1",
                price:'1200',
                date:'2024/5/18 開課',
                img:'/src/assets/img/home/eventcard1.png'
            },
            {
                id:2,
                title: "品酒體驗-初級課程1",
                price:'1200',
                date:'2024/5/18 開課',
                img:'/src/assets/img/home/eventcard2.png'
            },
            {
                id:3,
                title: "品酒體驗-中級課程1",
                price:'1200',
                date:'2024/5/18 開課',
                img:'/src/assets/img/home/eventcard3.png',
                tag:'早鳥優惠'
            },
            {
                id:4,
                title: "品酒體驗-進階課程1",
                price:'1200',
                date:'2024/5/18 開課',
                img:'/src/assets/img/home/eventcard4.png'
            },
            {
                id:5,
                title: "品酒體驗-初級課程2",
                price:'1200',
                date:'2024/5/18 開課',
                img:'/src/assets/img/home/eventcard5.png'
            }
            ],
            modules: [Navigation]
            }
    },
  components: {
    Swiper,
    SwiperSlide
  }
}
</script>
<template>
    <h2>{{ swiperTitle }}</h2>
    <Swiper
    :slidesPerView="2"
	:breakpoints="{
		768: {slidesPerView: 4}
	}"
	:spaceBetween="30"
	:navigation="true"
	:loop="true"
	:modules="modules"
>

    <swiper-slide v-for="(item) in content" :key="item.id">
      
        <div class="img-wrap">
            <img :src="item.img" alt="item.title">
            <div class="card-ribbon">
                <p>{{item.tag}}</p>
            </div>
            <a class="book-now" href="#">BOOK NOW</a>
        </div>
        <div class="font-wrap">
            <h4>{{ item.title }}</h4>
            <p>{{ item.date }}</p>
        </div>
        <div class="price">
            <h4><span>NT. </span>{{ item.price }}</h4>
        </div>
    </swiper-slide>
</Swiper>
</template>