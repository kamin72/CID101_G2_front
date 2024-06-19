<template>
  <!-- 大圖banner -->
  <div class="courseBanner" v-if="course">
    <div class="bgImgWrap">
      <img :src="parseImg(course.image)" alt="" />
    </div>
    <div class="maskWrap">
      <img src="../assets/img/home/homebanner2.png" alt="" />
    </div>
  </div>
  <!-- 課程資訊 -->
  <section class="info" v-if="course">
    <div class="container">
      <div class="courseDetailRow">
        <div class="col-11 col-md-11 col-sm-12 courseTopInfoWrap">
          <div class="courseInfo">
            <h3>{{ course.name }}</h3>
            <div class="courseDetailWrap">
              <div class="courseTime">
                <div class="line"></div>
                <div class="courseWrap">
                  <h4>上課時間 | {{ formatDate(course.date) }}</h4>
                  <p>
                    {{ course.startTime }}-{{ course.endTime }}，{{
                      durationHours(course.startTime, course.endTime)
                    }}小時
                  </p>
                </div>
              </div>
              <div class="courseAdress">
                <div class="line"></div>
                <div class="courseWrap">
                  <h4>上課教室 | 教室{{ course.classroom }}</h4>
                  <p>桃園市中壢區復興路46號9樓</p>
                </div>
              </div>
              <div class="coursePrice">
                <div class="line"></div>
                <div class="courseWrap">
                  <h4>課程價格 | NT. {{ discountedPrice(course.price, course.discount) }}</h4>
                  <p>原價NT. {{ course.price }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="courseIntro">
            <p>
              {{ course.courseIntro }}
            </p>
            <RouterLink to="/courseBookingDetail">
              <button class="big-btn-primary reserveCourse">
                <span class="material-symbols-outlined"> edit_calendar </span>預約課程
              </button>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- 課程介紹 -->
  <CourseDetail1 />
</template>

<script>
import CourseDetail1 from '@/components/Course/CourseDetail1.vue'
import { mapActions } from 'pinia'
import courseStore from '@/stores/course'

export default {
  props: ['id'],
  components: {
    CourseDetail1
  },
  data() {
    return {
      detail: [],
      course: null,
    }
  },
  methods: {
    ...mapActions(courseStore, ['getSpecificData']),
    formatDate(dateString) {
      const date = new Date(dateString)
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      const weekday = ['日', '一', '二', '三', '四', '五', '六'][date.getDay()]
      return `${year}/${month}/${day} (${weekday})`
    },
    durationHours(startTime, endTime) {
      const [startHour, startMinute] = startTime.split(':').map(Number)
      const [endHour, endMinute] = endTime.split(':').map(Number)

      const startTotalMinutes = startHour * 60 + startMinute
      const endTotalMinutes = endHour * 60 + endMinute

      const durationMinutes = endTotalMinutes - startTotalMinutes
      const hours = Math.ceil(durationMinutes / 60)

      return hours
    },
    parseImg(file) {
      return new URL(`../assets/img/course/courselist/${file}`, import.meta.url).href
    },
    //解決部屬網站圖片問題
    // parseServerImg(file) {
	  //   // 因為圖檔放在server中，只要組出路徑即可，
	  //   // 先確認這個路徑透過瀏覽器開啟有沒有圖檔，再確認斜線那些有沒有寫錯
	  //   // return `https://tibamef2e.com/chd104/ingrid/file/${imgURL}`
    //   return `${import.meta.env.VITE_FILE_URL}/${file}`
    // },
    discountedPrice(price, discount) {
      return discount ? price * (1 - discount) : price
    },
    async fetchCourseData() {
      const courseId = this.$route.params.id;
      await this.getSpecificData(courseId);
      this.course = courseStore().specificCourse;
    },
  },
  mounted() {
    this.fetchCourseData();
  },
  watch: {
    '$route.params.id': {
    handler: 'fetchCourseData',
    immediate: true,
  },
  }
}
</script>