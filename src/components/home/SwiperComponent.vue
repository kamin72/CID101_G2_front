<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'

// Import required modules
import { Navigation } from 'swiper/modules'

export default {
  props: ['swiperTitle'],
  data() {
    return {
      course: [],
      news: [],
      modules: [Navigation]
    }
  },

    methods: {
        parseImgCourse(file) {
            return new URL(`../../assets/img/course/courselist/${file}`, import.meta.url).href;
        },
        parseImgNews(file) {
            return new URL(`../../assets/img/news/${file}`, import.meta.url).href;
        },
        // 部屬用-解析伺服器圖片路徑
        parseServerImg(imgURL) {
            return `${import.meta.env.VITE_FILE_URL}/${imgURL}`
        },
        parseServerImgNews(imgURL) {
            return `${import.meta.env.VITE_FILE_URL}/news/${imgURL}`
        },
    },
    async mounted() {
    try {
      const [courseResponse, newsResponse] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/home/courseSwiper.php`).then(response => response.json()),
        fetch(`${import.meta.env.VITE_API_URL}/news.php`).then(response => response.json()),
      ]);

    //   console.log('Course Response:', courseResponse);
    //   console.log('News Response:', newsResponse);

      // 处理 API 响应
      const courseData = courseResponse.course;
      const newsData = newsResponse.news;

      // 验证提取的数据是否为数组
      if (Array.isArray(courseData)) {
        this.course = courseData.slice(0, 10);
      } else {
        console.error('Unexpected course data structure:', courseResponse);
      }

      if (Array.isArray(newsData)) {
        this.news = newsData.slice(0, 10);
      } else {
        console.error('Unexpected news data structure:', newsResponse);
      }
    } catch (error) {
      console.error('Error fetching JSON files:', error);
    }
  },
    components: {
        Swiper,
        SwiperSlide,
    },
};
</script>
<template>
    <div class="title">
        <span></span>
        <h2>{{ swiperTitle }}</h2>
        <span></span>
    </div>
    <!-- Course -->
    <Swiper 
        :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
        }" 
        :slidesPerView="2" 
        :breakpoints="{
            430: {
            slidesPerView: 3,
            spaceBetween: 20,
            },
            995: {
            slidesPerView: 4,
            spaceBetween: 30,
            },
        }" 
        :spaceBetween="30" 
        :loop="true" 
        :modules="modules" 
        v-if="swiperTitle === 'Course'"
    >
        <swiper-slide v-for="(item) in course" :key="item.course_id">
            <router-link :to="{ name: 'courseDetail', params: { id: item.course_id } }">
                <div class="img-wrap">
                    <!-- 部屬用-解析伺服器圖片 -->
                    <img :src="parseServerImg(item.course_image)" :alt="item.course_name">
                    <div class="card-tag" v-if="item.course_ribbon">
                        <p>{{ item.course_ribbon }}</p>
                    </div>
                    <p class="book-now">BOOK NOW</p>
                </div>
                <div class="font-wrap">
                    <h4>{{ item.course_name }}</h4>
                    <p>{{ item.course_startTime }} {{ item.course_endTime }}</p>
                    <div class="price" v-if="item.course_price">
                        <h4><span>NT. </span>{{ item.course_price }}</h4>
                    </div>
                </div>
            </router-link>
        </swiper-slide>
        <button class="swiper-button swiper-button-next"></button>
        <button class="swiper-button swiper-button-prev"></button>
    </Swiper>
    <!-- News -->
    <Swiper 
    :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    }" 
    :slidesPerView="2" 
    :breakpoints="{
            430: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            995: {
                slidesPerView: 4,
                spaceBetween: 30,
            },
        }" :spaceBetween="30" :loop="true" :modules="modules" v-if="swiperTitle === 'News'">

        <swiper-slide v-for="(item) in news" :key="item.news_id">
            <router-link :to="{ name: 'news_detail', params: { id: item.news_id } }">
                <div class="img-wrap">
                    <!-- 部屬用-解析伺服器圖片 -->
                    <img :src="parseServerImgNews(item.news_img)" :alt="item.news_title">
                </div>
                <div class="font-wrap">
                    <h4>{{ item.news_title }}</h4>
                    <p>{{ item.news_date }}</p>
                </div>
            </router-link>
        </swiper-slide>
        <button class="swiper-button swiper-button-next"></button>
        <button class="swiper-button swiper-button-prev"></button>
    </Swiper>
</template>
