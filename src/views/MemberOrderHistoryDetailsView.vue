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
          <RouterLink to="/memberorderhistory">訂單紀錄</RouterLink>
        </span>
        <span class="material-symbols-outlined">arrow_forward_ios</span>
        查看詳情
      </small>
    </div>
    <!-- 會員中心導覽列 -->
    <div class="center_menu">
      <RouterLink to="/membercenter" style="text-decoration: none">
        <button :class="buttonClass" style="display: inline; margin: 0 2px">會員資料</button>
      </RouterLink>
      <RouterLink to="/memberorderhistory" style="text-decoration: none">
        <button :class="secondaryButtonClass" style="display: inline; margin: 0 2px">
          訂單紀錄
        </button>
      </RouterLink>
      <RouterLink v-if="identity == 1" to="/bookinghistory" style="text-decoration: none">
        <button :class="buttonClass" style="display: inline; margin: 0 2px">預約紀錄</button>
      </RouterLink>
      <RouterLink v-if="identity == 1" to="/discounthistory" style="text-decoration: none">
        <button :class="buttonClass" style="display: inline; margin: 0 2px">優惠券紀錄</button>
      </RouterLink>
    </div>
    <!-- 訂單紀錄查閱 -->
    <div class="wrap_details">
      <!-- <div class="wrap_details" v-for="cart in carts" :key="cart.no"> -->
      <h4>訂單紀錄詳情</h4>
      <div class="details_list">
        <p>訂單編號</p>
        <p>2024xxxxxxxx</p>
        <!-- <p> {{ cart.cart_id }}</p> -->
      </div>
      <div class="details_list">
        <p>訂單日期</p>
        <p>2024-02-29</p>
        <!-- <p> {{ cart.build_date }} </p> -->
      </div>
      <div class="details_list">
        <p>姓名</p>
        <p>王小明</p>
        <!-- <p>{{ accountName }}</p> -->
      </div>
      <div class="details_list">
        <p>電話</p>
        <p>0912345678</p>
      </div>
      <div class="details_list">
        <p>Email</p>
        <p>abc123@email.com</p>
      </div>
      <div class="details_list">
        <p>總金額</p>
        <p>NT.2,500</p>
      </div>
      <div class="details_list" style="border: none">
        <p>訂單狀態</p>
        <p>已完成</p>
      </div>
      <div class="product_details" style="background-color: #f8f5f2; border: none">
        <p>商品名稱</p>
        <p>單價</p>
        <p>數量</p>
        <p>合計</p>
      </div>
      <div class="product_details">
        <p>俄勒岡之光紅酒 1997</p>
        <p>NT. 2,500</p>
        <p>1</p>
        <p>NT. 2,500</p>
      </div>
      <!-- <div class="product_details">
                <p>{{ item_id }} </p>
                <p>{{ price }} </p>
                <p>{{ amount }} </p>
                <p>{{ cart_paidamount }} </p>
            </div> -->
      <div class="product_price">
        <p>總價</p>
        <p>NT.2,500</p>
      </div>
      <div class="product_price" style="border-bottom: 1px solid #000000">
        <p>折扣</p>
        <p>NT.0</p>
      </div>
      <div class="product_price">
        <p>總金額</p>
        <p>NT.2,500</p>
        <!-- <p>{{ cart_paidamount }} </p> -->
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
      windowWidth: window.innerWidth,
      carts: []
    }
  },
  computed: {
    ...mapState(memberStore, ['memberInfo', 'accountName', 'isNormalAccount']),
    buttonClass() {
      return this.windowWidth < 996 ? 'small-btn-primary' : 'big-btn-primary'
    },
    secondaryButtonClass() {
      return this.windowWidth < 996 ? 'small-btn-secondary' : 'big-btn-secondary'
    },
    identity() {
      if (this.memberInfo?.[0]['identity'] == 1) {
        return 1
      } else {
        return 2
      }
    }
  },
  methods: {
    updateWindowWidth() {
      this.windowWidth = window.innerWidth
    },
    async fetchCarts() {
      // fetch `${import.meta.env.VITE_API_URL}(member/memberCenter_order.php`

      const formData = new URLSearchParams()
      formData.append('no', this.memberInfo[0].no)

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/front/memberorderhistory/getCart`,
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
      // alert(data['carts'].length);
      if (data['carts'].length > 0) {
        this.carts = data['carts']
      } else {
        this.carts = []
      }
      // alert( this.carts[0].no);
    }
  },
  mounted() {
    window.addEventListener('resize', this.updateWindowWidth)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateWindowWidth)
  }
}
</script>

<style></style>
