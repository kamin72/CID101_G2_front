<template>
  <div class="details-container">
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
        <span class="frontPage-bread">
          <RouterLink to="/bookinghistory">預約紀錄</RouterLink>
        </span>
        <span class="material-symbols-outlined">arrow_forward_ios</span>
        <span class="frontPage-bread">
          <RouterLink to="/membercenter">查看詳情</RouterLink>
        </span>
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
    <div class="wrap_details">
      <h4>預約紀錄詳情</h4>
      <div class="details_list">
        <p>預約課程編號</p>
        <!-- <p>2024xxxxxxxx</p> -->
        <p>{{ booked_detail.book_id }}</p>
      </div>
      <div class="details_list">
        <p>訂單日期</p>
        <!-- <p>2024-02-29</p> -->
        <p>{{ booked_detail.book_date }}</p>
      </div>
      <div class="details_list">
        <p>姓名</p>
        <!-- <p>王大明</p> -->
        <p>{{ booked_detail.name }}</p>
      </div>
      <div class="details_list">
        <p>電話</p>
        <!-- <p>0912345678</p> -->
        <p>{{ booked_detail.phone }}</p>
      </div>
      <div class="details_list">
        <p>Email</p>
        <!-- <p>abc123@email.com</p> -->
        <p>{{ booked_detail.email }}</p>
      </div>
      <!-- <div class="details_list">
                <p>地址</p>
                <p>{{ booked_detail.address }}</p>
            </div> -->
      <div class="details_list">
        <p>課程教室</p>
        <!-- <p>A教室</p> -->
        <p>{{ booked_detail.course_room }}</p>
      </div>
      <div class="details_list" style="border: none">
        <p>訂單狀態</p>
        <!-- <p>已完成</p> -->
        <p>{{ booked_detail.book_order_status }}</p>
      </div>
      <div class="product_details" style="background-color: #f8f5f2; border: none">
        <p>課程名稱</p>
        <p>單價</p>
        <p>人數</p>
        <p>合計</p>
      </div>
      <div class="product_details">
        <!-- <p>品酒體驗-初級課程1 </p>
                <p>NT.3,200</p>
                <p>1</p>
                <p>NT.3,200</p> -->
        <p>{{ booked_detail.book_course_name }}</p>
        <p>{{ booked_detail.book_course_price }}</p>
        <p>{{ booked_detail.book_amount }}</p>
        <p>{{ booked_detail.book_payable_amount }}</p>
      </div>
      <div class="product_price">
        <p>總價</p>
        {{ booked_detail.book_payable_amount }}
      </div>
      <div class="product_price" style="border-bottom: 1px solid #000000">
        <p>折扣</p>
        {{ booked_detail.dis_amount }}
      </div>
      <div class="product_price">
        <p>總金額</p>
        {{ booked_detail.book_paid_amount }}
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
      booked_detail: {},
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
  watch: {
    booked_courses() {
      const bookedId = this.$route.params.id // 從路由參數中獲取產品 ID

      console.log(this.booked_courses)
      this.booked_detail =
        this.booked_courses.find((booked_course) => booked_course.book_id === Number(bookedId)) ||
        {} // 根據 ID 找到對應的產品詳情
    },
    '$route.params.id': {
      handler() {
        const bookedId = this.$route.params.id // 從路由參數中獲取產品 ID
        console.log(this.booked_courses)
        this.booked_detail =
          this.booked_courses.find((booked_course) => booked_course.book_id === Number(bookedId)) ||
          {} // 根據 ID 找到對應的產品詳情
        this.fetchbooked_courses(bookedId)
      },
      immediate: true
    }
  },
  methods: {
    async fetchbooked_courses() {
      // `${import.meta.env.VITE_API_URL}/front/member/memberCenter_order.php`
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/front/bookinghistory/getBooking.php`
      )
      console.log(response)

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
    },
    updateWindowWidth() {
      this.windowWidth = window.innerWidth
    }
  },
  mounted() {
    window.addEventListener('resize', this.updateWindowWidth)
    const bookedId = this.$route.params.id
    this.fetchbooked_courses(bookedId)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateWindowWidth)
  }
}
</script>

<style></style>
