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
      <RouterLink to="/bookinghistory" style="text-decoration: none">
        <button :class="buttonClass" style="display: inline; margin: 0 2px">預約紀錄</button>
      </RouterLink>
      <RouterLink to="/discounthistory" style="text-decoration: none">
        <button :class="buttonClass" style="display: inline; margin: 0 2px">優惠券紀錄</button>
      </RouterLink>
    </div>
    <!-- 訂單紀錄查閱 -->
    <div class="wrap_details" v-if="carts_detail">
      <h4>訂單紀錄詳情</h4>
      <div class="details_list">
        <p>訂單編號</p>
        <!-- <p>2024xxxxxxxx</p> -->
        <p>{{ orderInfo.cart_id }}</p>
      </div>
      <div class="details_list">
        <p>訂單日期</p>
        <!-- <p>2024-02-29</p> -->
        <p>{{ orderInfo.build_date }}</p>
      </div>
      <div class="details_list">
        <p>姓名</p>
        <!-- <p>王陽明</p> -->
        <p>{{ orderInfo.cart_name }}</p>
      </div>
      <div class="details_list">
        <p>電話</p>
        <!-- <p>0912345678</p> -->
        <p>{{ orderInfo.phone }}</p>
      </div>
      <div class="details_list">
        <p>Email</p>
        <!-- <p>abc123@email.com</p> -->
        <p>{{ orderInfo.email }}</p>
      </div>
      <div class="details_list">
        <p>總金額</p>
        <!-- <p>NT.2,500</p> -->
        <p>{{ orderInfo.cart_paidamount }}</p>
      </div>
      <div class="details_list" style="border: none">
        <p>訂單狀態</p>
        <!-- <p>已完成</p> -->
        <p>{{ switchOrderStatus(orderInfo.cart_status) }}</p>
      </div>
      <div class="product_details" style="background-color: #f8f5f2; border: none">
        <p>商品名稱</p>
        <p>單價</p>
        <p>數量</p>
        <p>合計</p>
      </div>
      <div class="product_details" v-for="(item, index) in orderItem" :key="index">
        <p>{{ item.prod_name }}</p>
        <p>$NT. {{ item.price }}</p>
        <p>{{ item.amount }}</p>
        <p>$NT. {{ item.amount * item.price }}</p>
      </div>
      <div class="product_price">
        <p>總價</p>
        <!-- <p>NT.2,500</p> -->
        <p>$NT. {{ orderInfo.cart_paidamount }}</p>
      </div>
      <div class="product_price" style="border-bottom: 1px solid #000000">
        <p>折扣</p>
        <!-- <p>NT.0</p> -->
        <p>-$NT. {{ orderInfo.cart_discount }}</p>
      </div>
      <div class="product_price">
        <p>總金額</p>
        <!-- <p>NT.2,500</p> -->
        <p>$NT. {{ totalPaid }}</p>
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
      carts_detail: {},
      orderData: [],
      orderItem: [],
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
    orderInfo() {
      const cartId = this.$route.params.id
      return this.orderData.find((data) => data.cart_id == cartId) || []
    },
    totalPaid() {
      return this.orderInfo.cart_paidamount - this.orderInfo.cart_discount
    }
  },
  watch: {
    // '$route.params.id': {
    //   handler(cartId) {
    //     this.fetchcarts(cartId)
    //   },
    //   immediate: true
    // }
  },
  // watch: {
  //     carts() {
  //         const cartId = this.$route.params.id // 從路由參數中獲取產品 ID
  //         // console.log(this.carts)
  //         this.carts_detail = this.carts.find((cart) => cart.cart_id === Number(cartId)) || {}  // 根據 ID 找到對應的產品詳情
  //     },
  //     '$route.params.id': {
  //         handler() {
  //             const cartId = this.$route.params.id // 從路由參數中獲取產品 ID
  //             console.log(this.carts)
  //             this.carts_detail = this.carts.find((cart) => cart.cart_id === Number(cartId)) || {} // 根據 ID 找到對應的產品詳情
  //             this.fetchcarts(cartId);
  //         },
  //         immediate: true
  //     },
  // },
  methods: {
    async fetchAllOrderData() {
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
        this.orderData = data['carts']
        // console.log(this.orderData)
      } else {
        this.orderData = []
      }
    },
    async fetchOrderItems() {
      const cartId = this.$route.params.id
      // const response = await fetch(
      //     'http://localhost/CID101_G2_php/front/memberorderhistory/getCart.php',

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/front/memberorderhistory/getMemberOrderItem.php?cartId=${cartId}`
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      // alert(data['carts'].length);
      if (!data.error) {
        this.orderItem = data.orderItem
        // console.log(this.orderItem)
      } else {
        alert('無相關資料')
      }
    },
    switchOrderStatus(status) {
      const statusMap = {
        0: '未處理',
        1: '處理中',
        2: '已備貨',
        3: '已取件',
        4: '請求取消',
        5: '已取消'
      }
      return statusMap[status] || '未知狀態'
    }
  },
  mounted() {
    this.fetchAllOrderData()
    this.fetchOrderItems()
    window.addEventListener('resize', this.updateWindowWidth)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateWindowWidth)
  }
}
</script>

<style></style>
