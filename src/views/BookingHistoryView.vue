<template>
  <div class="history-container">
    <div class="row">
      <small class="col-12 scrumble">
        <span class="frontPage-bread">
          <RouterLink to="/">首頁</RouterLink>
        </span>
        <span class="material-symbols-outlined">arrow_forward_ios</span>
        <span class="frontPage-bread">
          <RouterLink to="/membercenter">會員中心</RouterLink>
        </span>
        <span class="material-symbols-outlined">arrow_forward_ios</span>
        預約紀錄
      </small>
    </div>
    <div class="center_menu">
      <RouterLink to="/membercenter" style="text-decoration: none">
        <button :class="buttonClass" style="display: inline; margin: 0 2px">會員資料</button>
      </RouterLink>
      <RouterLink to="/memberorderhistory" style="text-decoration: none">
        <button :class="buttonClass" style="display: inline; margin: 0 2px">訂單紀錄</button>
      </RouterLink>
      <RouterLink to="/bookinghistory" style="text-decoration: none">
        <button :class="secondaryButtonClass" style="display: inline; margin: 0 2px">
          預約紀錄
        </button>
      </RouterLink>
      <RouterLink to="/discounthistory" style="text-decoration: none">
        <button :class="buttonClass" style="display: inline; margin: 0 2px">優惠券紀錄</button>
      </RouterLink>
    </div>
    <div class="wrap_booking_history">
      <div class="items_list">
        <p class="cell">預約課程編號</p>
        <p class="cell">課程日期</p>
        <p class="cell">課程名稱</p>
        <p class="cell">預約狀態</p>
        <p class="cell">操作</p>
      </div>
      <div
        class="items"
        v-for="booked_course in booked_courses"
        :key="booked_course.book_customer_id"
      >
        <p class="cell">{{ booked_course.book_id }}</p>
        <p class="cell">{{ booked_course.book_date }}</p>
        <p class="cell">{{ booked_course.book_course_name }}</p>
        <p class="cell">{{ booked_course.book_order_status }}</p>
        <RouterLink to="/" style="text-decoration: none">
          <button class="small-btn-invalid">取消訂單</button>
        </RouterLink>
        <!-- <RouterLink to="/bookinghistorydetails" style="text-decoration: none;"> -->
        <RouterLink
          :to="'/bookinghistorydetails/' + booked_course.book_id"
          style="text-decoration: none"
        >
          <button class="small-btn-primary">查閱</button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import memberStore from '@/stores/loginMember'

export default {
  data() {
    return {
      booked_courses: [],
      windowWidth: window.innerWidth
    }
  },
  computed: {
    ...mapState(memberStore, ['memberInfo', 'accountName', 'isNormalAccount']),
    buttonClass() {
      return this.windowWidth < 996 ? 'small-btn-primary' : 'big-btn-primary'
    },
    secondaryButtonClass() {
      return this.windowWidth < 996 ? 'small-btn-secondary' : 'big-btn-secondary'
    }
  },
  methods: {
    updateWindowWidth() {
      this.windowWidth = window.innerWidth
    },
    async fetchbooked_courses() {
      // const formData = new URLSearchParams()
      // formData.append('no', this.memberInfo[0].no)

      // `${import.meta.env.VITE_API_URL}/front/member/memberCenter_order.php`
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/front/bookinghistory/getBooking.php`,
        {
          // method: 'POST',
          // headers: {
          //     'Content-Type': 'application/x-www-form-urlencoded'
          // },
          // body: formData.toString()
        }
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      // alert(data['booked_courses'].length);
      if (data['booked_courses'].length > 0) {
        this.booked_courses = data['booked_courses']
      } else {
        this.booked_courses = []
      }
      // alert( this.booked_courses[0].no);
    }
  },
  mounted() {
    window.addEventListener('resize', this.updateWindowWidth)
    this.fetchbooked_courses()
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateWindowWidth)
  }
}
</script>

<style></style>
