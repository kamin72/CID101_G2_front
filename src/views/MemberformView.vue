<template>
  <div class="signup_container">
    <div class="wrap_signup">
      <section class="form_flow">
        <CartFlow :flow="item" v-for="item in flow" :key="item.id" />
      </section>
      <!-- 一般會員註冊表單 -->
      <form @submit.prevent="submitForm">
        <!-- 會員帳號 -->
        <div class="form_ltem_list">
          <div class="form_item">
            <label for="account">會員帳號</label>
          </div>
          <div class="form_box">
            <input type="text" id="account" autocomplete="account" v-model="account" @blur="validateAccount"
              placeholder="請輸入帳號" />
          </div>
        </div>
        <!-- 密碼 -->
        <div class="form_ltem_list">
          <div class="form_item">
            <label for="password">會員密碼</label>
          </div>
          <div class="form_box">
            <input :type="pwdFlag ? 'password' : 'text'" id="password" v-model="password" @blur="validatePassword"
              autocomplete="current-password" placeholder="請輸入密碼" />
            <span v-show="pwdFlag" @click="togglePassword" class="material-symbols-outlined">
              visibility_off
            </span>
            <span v-show="!pwdFlag" @click="togglePassword" class="material-symbols-outlined">
              visibility
            </span>
          </div>
        </div>
        <!-- 再輸入一次密碼 -->
        <div class="form_ltem_list" style="position: relative">
          <div class="form_item">
            <label for="password">再輸入一次密碼</label>
          </div>
          <div class="form_box">
            <input :type="pwdFlags ? 'password' : 'text'" id="password_check" autocomplete="new-password"
              v-model="passwordCheck" @blur="validatePasswordCheck" placeholder="再輸入一次密碼" />
            <span v-show="pwdFlags" @click="togglePasswords" class="material-symbols-outlined">
              visibility_off
            </span>
            <span v-show="!pwdFlags" @click="togglePasswords" class="material-symbols-outlined">
              visibility
            </span>
          </div>
        </div>
        <!-- 姓名 -->
        <div class="form_ltem_list">
          <div class="form_item">
            <label>姓名</label>
          </div>
          <div class="form_box">
            <input type="text" id="name" v-model="name" @blur="validateName" placeholder="請輸入姓名" />
          </div>
        </div>
        <!-- 電話 -->
        <div class="form_ltem_list">
          <div class="form_item">
            <label>電話</label>
          </div>
          <div class="form_box">
            <input type="text" id="phone" v-model="phone" @blur="validatePhone" placeholder="請輸入電話" />
          </div>
        </div>
        <!-- Email -->
        <div class="form_ltem_list" style="border: none">
          <div class="form_item">
            <label>Email</label>
          </div>
          <div class="form_box">
            <input type="email" id="email" v-model="email" @blur="validateEmail" placeholder="請輸入Email" />
          </div>
        </div>
        <div class="form_privacy_policy">
          <input type="checkbox" v-model="isChecked" />
          <span style="margin: 0 5px">我同意隱私條款政策 [隱私條款政策]</span>
        </div>
        <!-- <RouterLink to="/memberformok" style="text-decoration: none;">
                </RouterLink>   -->
        <input type="submit" class="big-btn-primary deliverySubmit" style="display: block; margin: 10px auto"
          value="下一步" :disabled="!isChecked" />
      </form>
    </div>
  </div>
</template>

<script>
import CartFlow from '@/components/Cart/CartFlow.vue'

export default {
  components: {
    CartFlow
  },
  data() {
    return {
      flow: [
        {
          id: 1,
          icon: 'receipt_long',
          opacity: '1',
          text: '填寫基本資料',
          bold: '400',
          color: '#AEA495'
        },
        {
          id: 4,
          icon: 'check',
          opacity: '0.3',
          text: '註冊完成',
          bold: '0'
        }
      ],
      pwdFlag: true,
      pwdFlags: true,
      account: '',
      password: '',
      passwordCheck: '',
      name: '',
      phone: '',
      email: '',
      isValidAccount: true,
      isValidPassword: true,
      isValidPhone: true,
      isValidEmail: true,
      isChecked: false
    }
  },
  methods: {
    // 眼睛開閉功能
    togglePassword() {
      this.pwdFlag = !this.pwdFlag
    },
    togglePasswords() {
      this.pwdFlags = !this.pwdFlags
    },
    // 帳號正規判定
    validateAccount() {
      const accountPattern = /^[a-zA-Z0-9]+$/
      this.isValidAccount = accountPattern.test(this.account)
      if (!this.isValidAccount) {
        alert('使用者名稱必須是字母或數字')
      } else {
        this.isValidAccount = true
      }
    },
    // 密碼正規判定
    validatePassword() {
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
      this.isValidPassword = passwordPattern.test(this.password)
      if (!this.isValidPassword) {
        alert('密碼必須至少8個字符，包含至少一個大寫字母、一個小寫字母和一個數字')
      } else {
        this.isValidPassword = true
      }
    },
    // 再輸入一次密碼判定
    validatePasswordCheck() {
      this.isValidPasswordCheck = this.password === this.passwordCheck;
      if (!this.isValidPasswordCheck) {
        alert('輸入的密碼不一致,');
      }
    },
    // 電話正規判定
    validatePhone() {
      const phonePattern = /^\d{10}$/
      this.isValidPhone = phonePattern.test(this.phone)
      if (!this.isValidPhone) {
        alert('電話號碼必須是10位數字')
      } else {
        this.isValidPhone = true
      }
    },
    // Email正規判定
    validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      this.isValidEmail = emailPattern.test(this.email)
      if (!this.isValidEmail) {
        alert('請輸入有效的電子郵件地址')
      } else {
        this.isValidEmail = true
      }
    },
    // 提交的資料
    submitForm() {
      // 這裡可以處理提交的資料，發送到伺服器
      console.log('提交的表單資料:', {
        account: this.account,
        password: this.password,
        name: this.name,
        phone: this.phone,
        email: this.email
      })
      //  模擬提交成功的處理
      alert('表單提交成功！')
      window.location.href = '/memberformok'
    },
  }
}
</script>

<style></style>
