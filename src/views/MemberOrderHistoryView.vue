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
        訂單紀錄
      </small>
    </div>
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
    <!-- 訂單紀錄 -->
    <div class="wrap_order_history" v-if="carts.length <= 0">
      <div class="items_list">尚無資料</div>
    </div>

    <div class="wrap_order_history" v-if="carts.length > 0">
      <div class="items_list">
        <p>訂單編號</p>
        <p>訂單日期</p>
        <p>總金額</p>
        <p>訂單狀態</p>
        <p>操作</p>
      </div>
      <!-- this.carts[0].no -->
      <div class="items" v-for="cart in carts" :key="cart.no">
        <p>{{ cart.cart_id }}</p>
        <p>{{ cart.build_date }}</p>
        <p>{{ cart.cart_paidamount }}</p>
        <p>{{ cart.cart_status_ch }}</p>
        <!-- <button class="small-btn-invalid">取消訂單</button> -->
        <RouterLink to="/" style="text-decoration: none">
          <button class="small-btn-secondary">取消訂單</button>
        </RouterLink>
        <RouterLink to="memberorderhistorydetails" style="text-decoration: none">
          <button class="small-btn-primary">查閱</button>
        </RouterLink>
      </div>
      <!-- <div class="items">
                <p>2024xxxxxxxx</p>
                <p>2024-02-29</p>
                <p>NT.2,500</p>
                <p>已備貨</p>
                <RouterLink to="/" style="text-decoration: none;">
                    <button class="small-btn-secondary">取消訂單</button>
                </RouterLink>
                <RouterLink to="/" style="text-decoration: none;">
                    <button class="small-btn-primary">查閱</button>
                </RouterLink>
            </div> -->
      <!-- <div class="items">
                <p>2024xxxxxxxx</p>
                <p>2024-02-29</p>
                <p>NT.2,500</p>
                <p>未處理</p>
                <RouterLink to="/" style="text-decoration: none;">
                    <button class="small-btn-secondary">取消訂單</button>
                </RouterLink>
                <RouterLink to="/" style="text-decoration: none;">
                    <button class="small-btn-primary">查閱</button>
                </RouterLink>
            </div> -->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import memberStore from '@/stores/loginMember'

export default {
  data() {
    return {
      carts: [],
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
      const formData = new URLSearchParams()
      formData.append('no', this.memberInfo[0].no)
      // `${import.meta.env.VITE_API_URL}/front/member/memberCenter_order.php`
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/front/memberorderhistory/getCart.php`,
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
    this.fetchCarts()
    window.addEventListener('resize', this.updateWindowWidth)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateWindowWidth)
  }
}
</script>

<style></style>
