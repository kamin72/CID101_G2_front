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
                批發商會員資料
            </small>
        </div>
        <!-- 會員中心導覽列 -->
        <div class="center_menu">
            <RouterLink to="/wholesalercenter" style="text-decoration: none;">
                <button :class="secondaryButtonClass" style="display: inline; margin: 0 2px;">會員資料</button>
            </RouterLink>
            <RouterLink to="/wholesalerorderhistory" style="text-decoration: none;">
                <button :class="buttonClass" style="display: inline; margin: 0 2px;">訂單紀錄</button>
            </RouterLink>
        </div>
        <div class="wrap_mem_center">
            <div class="member_info_list">
                <div class="member_type">
                    <h3>王大明</h3>
                    <h4>批發商會員</h4>
                </div>
                <div class="member_icon">
                    <span class="material-symbols-outlined">perm_contact_calendar</span>
                    <h4>會員資料</h4>
                </div>
                <div class="member_info">
                    <label>會員帳號</label>
                    <input type="text" value="who456" disabled="disabled" style="background-color: #F8F5F2;">
                </div>
                <div class="member_info">
                    <label>Email</label>
                    <input type="text" value="who456@email.com">
                </div>
                <div class="member_info">
                    <label>手機電話</label>
                    <input type="text" value="0900000000">
                </div>
                <div class="member_info">
                    <label>公司名稱</label>
                    <input type="text" value="緯育股份有限公司" disabled="disabled" style="background-color: #F8F5F2;">
                </div>
                <div class="member_info">
                    <label>公司統編</label>
                    <input type="text" value="34567890" disabled="disabled" style="background-color: #F8F5F2;">
                </div>
                <div class="member_info">
                    <label>公司地址</label>
                    <input type="text" value="桃園市中壢區復興路46號9樓" disabled="disabled" style="background-color: #F8F5F2;">
                </div>
                <div class="member_info">
                    <label></label>
                    <input type="text" value="(公司資訊如需更動請聯絡我們)" disabled="disabled" style="background-color: #F8F5F2;">
                </div>
                <button class="big-btn-primary cart" style="display: inline-block;">儲存</button>
            </div>
        </div>
    </div>
    <!-- 會員中心導覽列 -->
    <div class="center_menu">
      <RouterLink to="/wholesalercenter" style="text-decoration: none">
        <button :class="secondaryButtonClass" style="display: inline; margin: 0 2px">
          會員資料
        </button>
      </RouterLink>
      <RouterLink to="/wholesalerorderhistory" style="text-decoration: none">
        <button :class="buttonClass" style="display: inline; margin: 0 2px">訂單紀錄</button>
      </RouterLink>
    </div>
    <div class="wrap_mem_center">
      <div class="member_info_list">
        <div class="member_type">
          <h3>王大明</h3>
          <h4>批發商會員</h4>
        </div>
        <div class="member_icon">
          <span class="material-symbols-outlined">perm_contact_calendar</span>
          <h4>會員資料</h4>
        </div>
        <div class="member_info">
          <label>會員帳號</label>
          <input type="text" value="who456" disabled="disabled" style="background-color: #f8f5f2" />
        </div>
        <div class="member_info">
          <label>Email</label>
          <input type="text" value="who456@email.com" />
        </div>
        <div class="member_info">
          <label>手機電話</label>
          <input type="text" value="0900000000" />
        </div>
        <div class="member_info">
          <label>公司名稱</label>
          <input
            type="text"
            value="緯育股份有限公司"
            disabled="disabled"
            style="background-color: #f8f5f2"
          />
        </div>
        <div class="member_info">
          <label>公司統編</label>
          <input
            type="text"
            value="34567890"
            disabled="disabled"
            style="background-color: #f8f5f2"
          />
        </div>
        <div class="member_info">
          <label>公司地址</label>
          <input
            type="text"
            value="桃園市中壢區復興路46號9樓"
            disabled="disabled"
            style="background-color: #f8f5f2"
          />
        </div>
        <div class="member_info">
          <label></label>
          <input
            type="text"
            value="(公司資訊如需更動請聯絡我們)"
            disabled="disabled"
            style="background-color: #f8f5f2"
          />
        </div>
        <button class="big-btn-primary cart" style="display: inline-block">儲存</button>
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

<style>
.center_menu {
  margin: 40px 0;
  border-bottom: 1px solid #322d26;
  padding-bottom: 20px;
}

.wrap_mem_center {
  margin: auto;
}

.member_info_list {
  width: 500px;
  background-color: #f8f5f2;
  margin: 30px auto;
  text-align: center;
}

.member_type {
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 10px solid #ede7de;
}

.member_type h3 {
  margin: 10px 0;
}

.member_type h4 {
  margin: 10px 0 0 50px;
}

.member_icon {
  display: flex;
  padding: 30px;
}

.member_info {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
}

.member_info input {
  outline: none;
  border: none;
  background: #ffffff;
  padding: 10px;
}

.member_info label {
  display: block;
  width: 100px;
  padding: 10px;
}

.member_info_list button {
  margin: 30px 0;
}
</style>
