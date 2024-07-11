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
        優惠券紀錄
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
        <button :class="buttonClass" style="display: inline; margin: 0 2px">預約紀錄</button>
      </RouterLink>
      <RouterLink to="/discounthistory" style="text-decoration: none">
        <button :class="secondaryButtonClass" style="display: inline; margin: 0 2px">
          優惠券紀錄
        </button>
      </RouterLink>
    </div>
    <div class="wrap_order_history" v-if="discounts.length <= 0">
      <div class="items_list">尚無資料</div>
    </div>
    <div class="wrap_discount_history" v-if="discounts.length > 0">
      <div class="items_list">
        <p>取得日期</p>
        <p>優惠券名稱</p>
        <p>使用期限</p>
        <p>優惠券狀態</p>
      </div>
      <div class="items" v-for="discount in discounts" :key="discount.member_no">
        <p>{{ discount.dis_got_date }}</p>
        <p>{{ discount.dis_name }}</p>
        <p>{{ discount.dis_set_date }}</p>
        <p>{{ discount_status(discount.dis_use_date) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import memberStore from '@/stores/loginMember'

export default {
  data() {
    return {
      discounts: [],
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
    discount_status(dis) {
      if (dis == '0000-00-00 00:00:00') {
        return '未使用'
      }
    },
    updateWindowWidth() {
      this.windowWidth = window.innerWidth
    },
    async fetchDiscounts() {
      const formData = new URLSearchParams()
      formData.append('no', this.memberInfo[0].no)
      // fetch `${import.meta.env.VITE_API_URL}/front/discounthistory/getDiscount.php`
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/front/discounthistory/getDiscount.php`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: formData.toString()
        }
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      // alert(data['discounts'].length);
      if (data['discounts'].length > 0) {
        this.discounts = data['discounts']
        // console.log(this.discounts)
      } else {
        this.discounts = []
      }
      // alert( this.discount[0].no);
    }
  },
  mounted() {
    this.fetchDiscounts()
    window.addEventListener('resize', this.updateWindowWidth)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateWindowWidth)
  }
}
</script>

<style></style>
