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
            content: [],
            events :[  
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
            }] ,
            news: [
                {
                    id: 1,
                    title: "歷史故事分享會",
                    date: '2024/6/1',
                    img: '/src/assets/img/home/newscard1.png'
                },
                {
                    id: 2,
                    title: "營業公告",
                    date: '2024/6/2',
                    img: '/src/assets/img/home/newscard2.png'
                },
                {
                    id: 3,
                    title: "夏季品酒會開放報名",
                    date: '2024/6/3',
                    img: '/src/assets/img/home/newscard3.png'
                },
                {
                    id: 4,
                    title: "葡萄酒的釀酒故事",
                    date: '2024/6/3',
                    img: '/src/assets/img/home/newscard4.png'
                },
                {
                    id: 5,
                    title: "春季葡萄園的復甦",
                    date: '2024/6/3',
                    img: '/src/assets/img/home/newscard5.png'
                }
            ],
            modules: [Navigation]
            }
    },
    methods:{
        getContent(){
            if(this.swiperTitle === "Event"){
                this.content = this.events;
            }else if(this.swiperTitle === "News"){
                this.content = this.news;
            }
        },
    },
    mounted(){
        this.getContent()
    },
  components: {
    Swiper,
    SwiperSlide
  }
}
</script>
<template>
    <div class="title">
        <span></span>
        <h2>{{ swiperTitle }}</h2>
        <span></span>
    </div>
    <Swiper
    :navigation="{
	nextEl: '.swiper-button-next',
	prevEl: '.swiper-button-prev'
	}"
    :slidesPerView="2"
	:breakpoints="{
        430: {
        slidesPerView: 3,
        spaceBetween: 10
        },
        768: {  
        slidesPerView: 4,
        spaceBetween: 30
        },
	}"
	:spaceBetween="30"
	:loop="true"
	:modules="modules"
>

    <swiper-slide v-for="(item) in content" :key="item.id">
        <div class="img-wrap">
            <img :src="item.img" alt="item.title">
            <div class="card-ribbon" v-if="item.tag">
                <p>{{item.tag}}</p>
            </div>
            <a class="book-now" href="#" v-if="swiperTitle === 'Events'">BOOK NOW</a>
        </div>
        <div class="font-wrap">
            <h4>{{ item.title }}</h4>
            <p>{{ item.date }}</p>
            <div class="price" v-if="item.price">
                <h4><span>NT. </span>{{ item.price }}</h4>
            </div>
        </div>
        
    </swiper-slide>
    <button class="swiper-button swiper-button-next"></button>
	<button class="swiper-button swiper-button-prev"></button>	
</Swiper>
</template>
