<template>
  <!-- 大圖banner -->
  <div class="courseBanner" v-if="course">
    <div class="bgImgWrap">
      <img :src="parseServerImg(course.course_image)" alt="" />
    </div>
    <div class="maskWrap">
      <img :src="parseServerImg('homebanner2.png')" alt="" />
    </div>
  </div>
  <!-- 課程資訊 -->
  <section class="info" v-if="course">
    <div class="container">
      <div class="courseDetailRow">
        <div class="col-11 col-md-11 col-sm-12 courseTopInfoWrap">
          <div class="courseInfo">
            <h3>{{ course.course_name }}</h3>
            <div class="courseDetailWrap">
              <div class="courseTime">
                <div class="line"></div>
                <div class="courseWrap">
                  <h4>時間 | {{ formatDate(course.course_startTime) }}</h4>
                  <p>
                    {{ courseTime(course.course_startTime, course.course_endTime) }}，{{
                      durationHours(course.course_startTime, course.course_endTime)
                    }}小時
                  </p>
                </div>
              </div>
              <div class="courseAdress">
                <div class="line"></div>
                <div class="courseWrap">
                  <h4>地點 | 教室{{ course.course_room }}</h4>
                  <p>桃園市中壢區復興路46號9樓</p>
                </div>
              </div>
              <div class="coursePrice">
                <div class="line"></div>
                <div class="courseWrap">
                  <h4>
                    價格 | NT. {{ discountedPrice(course.course_price, course.course_discount) }}
                  </h4>
                  <p>原價NT. {{ course.course_price }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="courseIntro">
            <p>
              {{ course.course_intro }}
            </p>
            <RouterLink
              :to="{ name: 'courseBookingDetail', params: { id: course.course_id } }"
              style="text-decoration: none"
            >
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
  <CourseDetail1 :courseId="$route.params.id" />
</template>

<script>
import CourseDetail1 from '@/components/Course/CourseDetail1.vue'
import { mapActions, mapState } from 'pinia'
import courseStore from '@/stores/course'

export default {
  components: {
    CourseDetail1
  },

  data() {
    return {
      detail: []
    }
  },

  props: {
    courseId: {
      type: [Number, String],
      required: true
    }
  },

  methods: {
    // 要return東西
    ...mapActions(courseStore, ['getSpecificData', 'getData']),
    formatDate(dateString) {
      const date = new Date(dateString)
      // 添加錯誤的檢查
      if (isNaN(date.getTime())) {
        console.error('Invalid date:', dateString)
        return 'Invalid Date'
      }
      // 格式化日期
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      const weekday = ['日', '一', '二', '三', '四', '五', '六'][date.getDay()]
      return `${year}/${month}/${day} (${weekday})`
    },
    courseTime(startDateTime, endDateTime) {
      if (!startDateTime || !endDateTime) return ''

      // 創建 Date 對象
      const startDate = new Date(startDateTime)
      const endDate = new Date(endDateTime)

      // 格式化時間
      const formatTime = (date) => {
        return date.toTimeString().slice(0, 5) // 獲取 "HH:MM" 格式
      }

      // 返回格式化的時間範圍
      return `${formatTime(startDate)}-${formatTime(endDate)}`
    },
    durationHours(startDateTime, endDateTime) {
      if (!startDateTime || !endDateTime) return 0
      const startDate = new Date(startDateTime)
      const endDate = new Date(endDateTime)
      // 添加錯誤的檢查
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        console.error('Invalid date:', startDateTime, endDateTime)
        return 0
      }

      const durationMilliseconds = endDate - startDate
      const hours = Math.ceil(durationMilliseconds / (1000 * 60 * 60))
      return hours
    },
    parseServerImg(file) {
      return `${import.meta.env.VITE_FILE_URL}/${file}`
    },
    discountedPrice(price, discount) {
      return discount ? price * discount : price
    }
  },

  async mounted() {
    try {
      //再呼叫一次pinia的getSpecificData()
      await this.getSpecificData(this.$route.params.id)
    } catch (error) {
      console.error('Failed to fetch specific course data:', error)
    }
    console.log(this.specificCourse)
  },

  computed: {
    // computed是渲染畫面後要做的事
    ...mapState(courseStore, ['specificCourse']), // 抓課程id
    course() {
      // 定義course = specificCourse
      return this.specificCourse
    }
  }
}
</script>
