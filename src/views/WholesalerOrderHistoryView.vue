<template>
  <div class="history-container">
    <div class="row">
      <small class="col-12 scrumble">
        <span class="frontPage-bread">
          <RouterLink to="/">首頁</RouterLink>
        </span>
        <span class="material-symbols-outlined">arrow_forward_ios</span>
        <span class="frontPage-bread">
          <RouterLink to="/wholesalercenter">會員中心</RouterLink>
        </span>
        <span class="material-symbols-outlined">arrow_forward_ios</span>
        訂單紀錄
      </small>
    </div>
    <div class="center_menu">
      <RouterLink to="/wholesalercenter" style="text-decoration: none">
        <!-- <button class="big-btn-primary"">會員資料</button> -->
        <button :class="buttonClass" style="display: inline; margin: 0 2px">會員資料</button>
      </RouterLink>
      <RouterLink to="/wholesalerorderhistory" style="text-decoration: none">
        <button :class="secondaryButtonClass" style="display: inline; margin: 0 2px">
          訂單紀錄
        </button>
      </RouterLink>
    </div>
    <!-- 訂單紀錄 -->
    <div class="wrap_order_history">
      <div class="items_list">
        <p>訂單編號</p>
        <p>訂單日期</p>
        <p>總金額</p>
        <p>訂單狀態</p>
        <p>操作</p>
      </div>
      <div class="items">
        <p>2024xxxxxxxx</p>
        <p>2024-02-29</p>
        <p>NT.2,500</p>
        <p>已完成</p>
        <button class="small-btn-invalid">取消訂單</button>
        <RouterLink to="memberorderhistorydetails" style="text-decoration: none">
          <button class="small-btn-primary">查閱</button></RouterLink
        >
      </div>
      <div class="items">
        <p>2024xxxxxxxx</p>
        <p>2024-02-29</p>
        <p>NT.2,500</p>
        <p>已備貨</p>
        <RouterLink to="/" style="text-decoration: none">
          <button class="small-btn-secondary">取消訂單</button>
        </RouterLink>
        <RouterLink to="/" style="text-decoration: none">
          <button class="small-btn-primary">查閱</button>
        </RouterLink>
      </div>
      <div class="items">
        <p>2024xxxxxxxx</p>
        <p>2024-02-29</p>
        <p>NT.2,500</p>
        <p>未處理</p>
        <RouterLink to="/" style="text-decoration: none">
          <button class="small-btn-secondary">取消訂單</button>
        </RouterLink>
        <RouterLink to="/" style="text-decoration: none">
          <button class="small-btn-primary">查閱</button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      windowWidth: window.innerWidth
    }
  },
  computed: {
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
