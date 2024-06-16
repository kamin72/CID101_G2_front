<template>
  <!-- 大圖banner -->
  <div class="courseBanner">
    <div class="bgImgWrap" v-if="course">
      <img :src="parseImg(course.image)" alt="" />
    </div>
    <div class="maskWrap">
      <img src="../../assets/img/home/homebanner2.png" alt="" />
    </div>
  </div>
  <!-- 課程資訊 -->
  <section class="info">
    <div class="container">
      <div class="courseDetailRow">
        <div class="col-11 col-md-11 col-sm-12 courseTopInfoWrap">
          <div class="courseInfo" v-if="course">
            <h3>{{ course.name }}</h3>
            <div class="courseDetailWrap">
              <div class="courseTime">
                <div class="line"></div>
                <div class="courseWrap">
                  <h4>上課時間 | {{ formatDate(course.date) }}</h4>
                  <p>{{ course.startTime }}-{{ course.endTime }}，{{ durationHours(course.startTime,
                    course.endTime) }}小時</p>
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
          <div class="courseIntro" v-if="course">
            <p>
              {{ course.courseIntro }}
            </p>
            <button class="big-btn-primary reserveCourse">
              <span class="material-symbols-outlined"> edit_calendar </span>預約課程
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- 課程介紹 -->
  <CourseDetail v-if="course" />
  <!-- <section class="introduction">
    <div class="container">
      <div class="courseDetailRow">
        <div class="col-11 col-md-11 col-sm-12  courseBottomInfoWrap">
          <div class="teacher">
            <div class="teacherImg">
              <img src="../../../src/assets/img/course/courseDetail/teacher.jpg" alt="teacher" />
            </div>
            <div class="teacherInfo">
              <h3 class="teacherName">嚴鈺婷 Ms. Yan</h3>
              <h4 class="expertise">資深品酒家 / WSET高級認證執酒師</h4>
              <p class="teacherIntro">
                嚴鈺婷出身釀酒世家，自幼對酒類深感興趣。她畢業於英國頂尖酒學院，後赴多國實習，累積15年釀酒與品酒經驗。嚴鈺婷精通葡萄酒釀造，是資深品酒家和鑑酒師，對葡萄酒細節有獨到見解。她擁有WSET高級認證，是國內頂尖品酒權威講師，上課風格專注幽默，致力傳承品酒樂趣，啟發更多人熱愛美酒。
              </p>
            </div>
          </div>
          <div class="feature">
            <div class="featWrap">
              <div class="iconWrap">
                <img src="../../../src/assets/img/course/courseDetail/icon1.png" alt="" />
              </div>
              <h4>葡萄酒基礎知識</h4>
              <ul>
                <li>葡萄酒的歷史與分類</li>
                <li>釀酒工藝和常見葡萄品種介紹</li>
                <li>酒杯的選擇和基本禮儀</li>
              </ul>
            </div>
            <div class="featWrap">
              <div class="iconWrap">
                <img src="../../../src/assets/img/course/courseDetail/icon2.png" alt="" />
              </div>
              <h4>視覺品酒</h4>
              <ul>
                <li>了解酒液顏色及其含義</li>
                <li>辨識酒漬、酒體及其他視覺線索</li>
                <li>實作:體驗不同顏色和質地的葡萄酒</li>
              </ul>
            </div>
            <div class="featWrap">
              <div class="iconWrap">
                <img src="../../../src/assets/img/course/courseDetail/icon3.png" alt="" />
              </div>
              <h4>嗅覺品酒</h4>
              <ul>
                <li>認識不同酒香的來源</li>
                <li>水果、香料、木質等香氣辨識</li>
                <li>實作:培養嗅覺記憶與辨識能力</li>
              </ul>
            </div>
            <div class="featWrap">
              <div class="iconWrap">
                <img src="../../../src/assets/img/course/courseDetail/icon4.png" alt="" />
              </div>
              <h4>口感品酒</h4>
              <ul>
                <li>酸度、單寧、甜度等味覺體驗</li>
                <li>後味和餘韻的感受</li>
                <li>實作:品嚐各種葡萄酒並作記錄</li>
              </ul>
            </div>
            <div class="featWrap">
              <div class="iconWrap">
                <img src="../../../src/assets/img/course/courseDetail/icon5.png" alt="" />
              </div>
              <h4>醒酒與珍藏</h4>
              <ul>
                <li>了解醒酒的目的和技巧</li>
                <li>適合醒酒的酒款和時間</li>
                <li>家用酒窖葡萄酒存放建議</li>
              </ul>
            </div>
          </div>
          <button class="big-btn-primary reserveCourse">
            <span class="material-symbols-outlined"> edit_calendar </span>預約課程
          </button>
        </div>
      </div>
    </div>
  </section> -->
</template>

<script>
export default {
  data() {
    return {
      course: null,
    };
  },
  components: {
    CourseDetail: () => import(`@/components/Course/${this.course.id}.vue`),
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const weekday = ['日', '一', '二', '三', '四', '五', '六'][date.getDay()];
      return `${year}/${month}/${day} (${weekday})`;
    },
    durationHours(startTime, endTime) {
      const [startHour, startMinute] = startTime.split(':').map(Number);
      const [endHour, endMinute] = endTime.split(':').map(Number);

      const startTotalMinutes = startHour * 60 + startMinute;
      const endTotalMinutes = endHour * 60 + endMinute;

      const durationMinutes = endTotalMinutes - startTotalMinutes;
      const hours = Math.ceil(durationMinutes / 60);

      return hours;
    },
    parseImg(file) {
      return new URL(`../../assets/img/course/courselist/${file}`, import.meta.url)
        .href;
    },
    discountedPrice(price, discount) {
    return discount ? price * (1 - discount) : price;
    },
  },
  mounted() {
    const courseId = this.$route.params.id;
    fetch('../../../public/courses.json')
      .then(response => response.json())
      .then(data => {
        this.course = data.find(course => course.id === courseId);
      })
      .catch(error => {
        console.error('Error fetching course data:', error);
      });
  },
};
</script>
