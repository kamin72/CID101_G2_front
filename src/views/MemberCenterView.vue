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
        <span v-if="identity == 1" class="material-symbols-outlined">arrow_forward_ios</span>
        <span v-if="identity == 1">一般會員資料</span>
        <span v-if="identity == 2" class="material-symbols-outlined">arrow_forward_ios</span>
        <span v-if="identity == 2">批發商會員資料</span>
      </small>
    </div>
    <!-- 會員中心導覽列 -->
    <div class="center_menu">
      <RouterLink to="/membercenter" style="text-decoration: none">
        <button :class="secondaryButtonClass" style="display: inline; margin: 0 2px">
          會員資料
        </button>
      </RouterLink>
      <RouterLink to="/memberorderhistory" style="text-decoration: none">
        <button :class="buttonClass" style="display: inline; margin: 0 2px">訂單紀錄</button>
      </RouterLink>
      <RouterLink v-if="identity == 1" to="/bookinghistory" style="text-decoration: none">
        <button :class="buttonClass" style="display: inline; margin: 0 2px">預約紀錄</button>
      </RouterLink>
      <RouterLink v-if="identity == 1" to="/discounthistory" style="text-decoration: none">
        <button :class="buttonClass" style="display: inline; margin: 0 2px">優惠券紀錄</button>
      </RouterLink>
    </div>

    <span :class="initial" style="display: none"></span>

    <form @submit.prevent="submitForm">
      <div class="wrap_mem_center">
        <div class="member_info_list">
          <div class="member_type">
            <!-- <h3>王陽明</h3> -->
            <h3>{{ accountName }}</h3>
            <h4>一般會員</h4>
          </div>
          <div class="member_icon">
            <span class="material-symbols-outlined"> perm_contact_calendar </span>
            <h4>會員資料</h4>
          </div>
          <div class="member_info">
            <label>會員帳號</label>
            <input
              type="text"
              id="account"
              v-model="this.memberInfo[0].account"
              disabled="disabled"
              style="background-color: #f8f5f2"
            />
          </div>
          <div class="member_info">
            <label>Email</label>
            <input
              type="text"
              id="email"
              @blur="validateEmail"
              v-model="this.memberInfo[0].email"
            />
          </div>
          <div class="member_info">
            <label>手機電話</label>
            <input
              type="text"
              id="phone"
              @blur="validatePhone"
              v-model="this.memberInfo[0].phone"
            />
          </div>
          <input
            type="submit"
            class="big-btn-primary"
            style="display: inline-block; margin: 20px auto"
            value="儲存"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import memberStore from '@/stores/loginMember'
// import { identity } from 'lodash'

export default {
  data() {
    return {
      isValidPhone: true,
      isValidEmail: true,
      isUpdated: false,
      windowWidth: window.innerWidth,
      errorMessages: {
        account: '',
        phone: '',
        email: ''
      }
    }
  },
  computed: {
    ...mapState(memberStore, ['memberInfo', 'accountName', 'isNormalAccount']),
    initial() {
      //this.account = this.memberInfo[0].account;
      //this.email = this.memberInfo[0].email;
      //this.phone = this.memberInfo[0].phone;
    },
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
    ...mapActions(memberStore, ['fetchMemberData', 'fetchMemberCompData']),

    updateWindowWidth() {
      this.windowWidth = window.innerWidth
      this.fetchUser()
    },
    mounted() {
      window.addEventListener('resize', this.updateWindowWidth)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.updateWindowWidth)
    },
    created() {
      //console.log(this.memberInfo[0].email);
    },
    // 電話正規判定
    validatePhone() {
      const phonePattern = /^\d{10}$/
      this.isValidPhone = phonePattern.test(this.memberInfo[0].phone)
      if (!this.isValidPhone) {
        this.errorMessages.phone = this.isValidPhone ? '' : '電話號碼必須是10位數字'
      } else {
        this.errorMessages.phone = ''
        this.isValidPhone = true
      }
    },
    // Email正規判定
    validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      this.isValidEmail = emailPattern.test(this.memberInfo[0].email)
      if (!this.isValidEmail) {
        this.errorMessages.email = this.isValidEmail ? '' : '請輸入有效的電子郵件地址'
      } else {
        this.errorMessages.email = ''
        this.isValidEmail = true
      }
    },
    // 提交儲存的資料
    async submitForm() {
      // 這裡可以處理提交的資料，發送到伺服器
      //   console.log('提交的表單資料:', {
      //     account: this.memberInfo[0].account,
      //     phone: this.memberInfo[0].phone,
      //     email: this.memberInfo[0].email
      //   })

      this.validatePhone()
      this.validateEmail()

      if (this.isValidPhone && this.isValidEmail) {
        // 發送 post 請求
        await this.updateMember()

        if (this.identity == 1) {
          this.fetchMemberData()
        } else if (this.identity == 2) {
          this.fetchMemberCompData()
        }

        if (this.isUpdated) {
          alert('儲存成功')
        } else {
          alert('儲存失敗')
        }
      }
    },
    async updateMember() {
      try {
        const formData = new URLSearchParams()
        formData.append('action', 'updateMember')
        formData.append('account', this.memberInfo[0].account)
        formData.append('phone', this.memberInfo[0].phone)
        formData.append('email', this.memberInfo[0].email)

        // const response = await fetch `${import.meta.env.VITE_API_URL}(member/memberCenter.php)`, {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/front/member/memberCenter.php`,
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

        if (data['update']) {
          this.isUpdated = true
        } else {
          this.isUpdated = false
        }
      } catch (error) {
        this.error = error
        console.error('There was a problem with the fetch operation:', error)
      } finally {
        this.loading = false
      }
    }
  },
  mounted() {
    this.fetchMemberData()
    this.fetchMemberCompData()
    // console.log(this.memberInfo?.[0]['identity'])
  }
}
</script>

<style></style>
