<template>
  <div class="container">
    <div class="row">
      <small class="col-12 scrumble"
        >首頁<span class="material-symbols-outlined">arrow_forward_ios</span>品酒課程
      </small>
    </div>
  </div>
  <section class="section-recom-course">
    <div class="container">
      <div class="row">
        <div class="col-12 recom-course">
          <div class="title-wrap">
            <div class="line"></div>
            <h2>Recommended</h2>
            <div class="line"></div>
          </div>
        </div>
        <!-- 活動卡片1-1 -->
        <div class="col-3 col-md-4 col-sm-6 event-card1">
          <div class="img-wrap">
            <img src="https://picsum.photos/300/300/?random=10" />
            <div class="card-ribbon">
              <p>早鳥優惠</p>
            </div>
            <div class="book-now">
              <p>BOOK NOW</p>
            </div>
          </div>
          <div class="font-wrap">
            <h4>品酒初級課程1</h4>
            <p>2024/5/18 開課</p>
          </div>
          <h4>NT. 3200</h4>
        </div>
        <!-- 活動卡片1-2 -->
        <div class="col-3 col-md-4 col-sm-6 event-card1">
          <div class="img-wrap">
            <img src="https://picsum.photos/300/300/?random=10" />
            <div class="card-ribbon">
              <p>早鳥優惠</p>
            </div>
            <div class="book-now">
              <p>BOOK NOW</p>
            </div>
          </div>
          <div class="font-wrap">
            <h4>品酒初級課程1</h4>
            <p>2024/5/18 開課</p>
          </div>
          <h4>NT. 3200</h4>
        </div>
        <!-- 活動卡片1-3 -->
        <div class="col-3 col-md-4 col-sm-6 event-card1">
          <div class="img-wrap">
            <img src="https://picsum.photos/300/300/?random=10" />
            <div class="card-ribbon">
              <p>早鳥優惠</p>
            </div>
            <div class="book-now">
              <p>BOOK NOW</p>
            </div>
          </div>
          <div class="font-wrap">
            <h4>品酒初級課程1</h4>
            <p>2024/5/18 開課</p>
          </div>
          <h4>NT. 3200</h4>
        </div>
        <!-- 活動卡片1-4 -->
        <div class="col-3 col-md-4 col-sm-6 event-card1">
          <div class="img-wrap">
            <img src="https://picsum.photos/300/300/?random=10" />
            <div class="card-ribbon">
              <p>早鳥優惠</p>
            </div>
            <div class="book-now">
              <p>BOOK NOW</p>
            </div>
          </div>
          <div class="font-wrap">
            <h4>品酒初級課程1</h4>
            <p>2024/5/18 開課</p>
          </div>
          <h4>NT. 3200</h4>
        </div>
      </div>
    </div>
  </section>
  <section class="section-search-course">
    <div class="container">
      <div class="row">
        <div class="col-12 search-course">
          <div class="title-wrap">
            <div class="line"></div>
            <h2>Search</h2>
            <div class="line"></div>
          </div>
          <div class="col-11 search-course-list-wrap">
            <div class="search-course-tabs-panel">
              <div class="search-course-calen-tab">
                <div class="big-btn-primary">
                  從日曆中選擇
                  <div class="triangle"></div>
                </div>
              </div>
              <div class="search-course-list-tab">
                <div class="big-btn-secondary">
                  從清單中選擇
                  <div class="triangle"></div>
                </div>
              </div>
            </div>
            <!-- 預約日曆 -->
            <!-- <div class="col-10 calendar">
              <div class="calendar-header">
                <span class="prev material-symbols-outlined" @click="prevMonth">arrow_back_ios</span>
                <h4 class="month-year">{{ currentYear }}.{{ currentMonth }}</h4>
                <span class="next material-symbols-outlined" @click="nextMonth">arrow_forward_ios</span>
              </div>
              <div class="calendar-body">
                <div class="weekdays">
                  <p v-for="weekday in weekdays" :key="weekday">{{ weekday }}</p>
                </div>
                <div class="days">
                  <div v-for="n in startDayOfWeek" :key="n" class="day empty"></div>
                  <div v-for="day in days" :key="day.date" class="day" :class="{ today: day.isToday, 'has-course': hasCourse(day.date)}" @click="selectDate(day.date)"><span>{{ day.date.getDate() }}</span><span v-if="hasCourse(day.date)" class="course-name">{{ getCourseNameByDate(day.date) }}</span></div><div v-for="n in endDayOfWeek" :key="n" class="day empty"></div>
                </div>
              </div>
            </div> -->

            <!-- 活動卡片1 -->
            <div class="col-8 col-md-7 col-sm-12">
              <div class="event-card2">
                <div class="img-wrap">
                  <img src="https://picsum.photos/600/600/?random=10" />
                </div>
                <div class="event-card2-info-wrap">
                  <div class="event-card2-left-wrap">
                    <div class="event-card2-title-wrap">
                      <h4>初級品酒課程1</h4>
                      <p>2024/05/18 開課</p>
                    </div>
                    <div class="intro-wrap">
                      <p>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
                    </div>
                  </div>
                  <div class="right-wrap">
                    <div class="price">
                      <h4><span>NT. </span>3200</h4>
                    </div>
                  </div>
                </div>
                <div class="small-btn-primary">
                  詳情資訊<span class="material-symbols-outlined">arrow_forward_ios</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      currentDate: new Date(),
      selectedDate: null,
      courses: [
        // 課程物件陣列
        { date: new Date(2024, 4, 18), name: '品酒初級課程1' },
        { date: new Date(2024, 4, 25), name: '品酒進階課程' }
        // 其他課程...
      ]
    }
  },
  computed: {
    currentMonth() {
      return this.currentDate.getMonth() + 1
    },
    currentYear() {
      return this.currentDate.getFullYear()
    },
    startDayOfWeek() {
      const startDate = new Date(this.currentYear, this.currentDate.getMonth(), 1)
      return startDate.getDay()
    },
    endDayOfWeek() {
      const endDate = new Date(this.currentYear, this.currentDate.getMonth() + 1, 0)
      const endDay = endDate.getDay()
      return 6 - endDay
    },
    days() {
      const days = []
      const startDate = new Date(this.currentYear, this.currentDate.getMonth(), 1)
      const endDate = new Date(this.currentYear, this.currentDate.getMonth() + 1, 0)

      for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
        const day = new Date(date)
        days.push({
          date: day,
          isToday: day.toDateString() === new Date().toDateString()
        })
      }
      return days
    }
  },
  methods: {
    prevMonth() {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1)
    },
    nextMonth() {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1)
    },
    selectDate(date) {
      this.selectedDate = date
      // 可以在這裡執行選擇日期後的操作
    },
    hasCourse(date) {
      return this.courses.some((course) => course.date.toDateString() === date.toDateString())
    },
    getCourseNameByDate(date) {
      const course = this.courses.find(
        (course) => course.date.toDateString() === date.toDateString()
      )
      return course ? course.name : ''
    }
  }
}
</script>
