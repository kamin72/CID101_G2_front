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
      return new URL(`../../assets/img/course/courselist/${file}`, import.meta.url).href
    },
    parseImgNews(file) {
      return new URL(`../../assets/img/news/${file}`, import.meta.url).href
    },
    // 部屬用-解析伺服器圖片路徑
    parseServerImg(imgURL) {
      return `${import.meta.env.VITE_FILE_URL}/${imgURL}`
    }
  },
  mounted() {
    Promise.all([
      // 部屬用-解析伺服器json位置
      // 雙引號要改成反引號!!!!!!!!!!!!!!!!!!!
      fetch(`${import.meta.env.VITE_ORIGIN_URL}/courses.json`).then((response) => response.json()),
      fetch(`${import.meta.env.VITE_ORIGIN_URL}/news.json`).then((response) => response.json())
    ])
      .then(([courseData, newsData]) => {
        this.course = courseData.slice(0, 10) // 取前十個資料
        this.news = newsData.slice(0, 10)
      })
      .catch((error) => {
        console.error('Error fetching JSON files:', error)
      })
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
        spaceBetween: 20
      },
      995: {
        slidesPerView: 4,
        spaceBetween: 30
      }
    }"
    :spaceBetween="30"
    :loop="true"
    :modules="modules"
    v-if="swiperTitle === 'Course'"
  >
    <swiper-slide v-for="item in course" :key="item.id">
      <router-link :to="{ name: 'courseDetail', params: { id: item.id } }">
        <div class="img-wrap">
          <!-- 部屬用-解析伺服器圖片 -->
          <img :src="parseServerImg(item.image)" :alt="item.title" />
          <div class="card-tag" v-if="item.tag">
            <p>{{ item.tag }}</p>
          </div>
          <p class="book-now">BOOK NOW</p>
        </div>
        <div class="font-wrap">
          <h4>{{ item.name }}</h4>
          <p>{{ item.date }} {{ item.startTime }}</p>
          <div class="price" v-if="item.price">
            <h4><span>NT. </span>{{ item.price }}</h4>
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
        spaceBetween: 20
      },
      995: {
        slidesPerView: 4,
        spaceBetween: 30
      }
    }"
    :spaceBetween="30"
    :loop="true"
    :modules="modules"
    v-if="swiperTitle === 'News'"
  >
    <swiper-slide v-for="item in news" :key="item.id">
      <router-link :to="{ name: 'news_detail', params: { id: item.id } }">
        <div class="img-wrap">
          <!-- 部屬用-解析伺服器圖片 -->
          <img :src="parseServerImg(item.image)" :alt="item.name" />
        </div>
        <div class="font-wrap">
          <h4>{{ item.name }}</h4>
          <p>{{ item.date }}</p>
        </div>
      </router-link>
    </swiper-slide>
    <button class="swiper-button swiper-button-next"></button>
    <button class="swiper-button swiper-button-prev"></button>
  </Swiper>
</template>
