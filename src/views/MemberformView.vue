<template>
  <div class="signup_container">
    <div class="wrap_signup">
      <section class="form_flow">
        <CartFlow :flow="item" v-for="item in flow" :key="item.id" />
      </section>
      <!-- 一般會員註冊表單 -->
      <form @submit.prevent="submitForm">
        <!-- 會員帳號 -->
        <div class="form_item_list">
          <div class="form_item">
            <label for="account">會員帳號</label>
          </div>
          <div class="form_box">
            <input type="text" id="account" autocomplete="account" v-model="account" @blur="validateAccount"
              placeholder="請輸入帳號" />
            <span v-if="errorMessages.account" class="form-prompt">{{
              errorMessages.account
            }}</span>
          </div>
        </div>
        <!-- 會員密碼 -->
        <div class="form_item_list">
          <div class="form_item">
            <label for="password">會員密碼</label>
          </div>
          <div class="form_box">
            <input :type="pwdFlag ? 'password' : 'text'" id="password" v-model="password" @blur="validatePassword" autocomplete="current-password" placeholder="請輸入密碼" />
            <span v-show="pwdFlag" @click="togglePassword" class="material-symbols-outlined">
              visibility_off
            </span>
            <span v-show="!pwdFlag" @click="togglePassword" class="material-symbols-outlined">
              visibility
            </span>
            <span v-if="errorMessages.password" class="form-prompt">{{
              errorMessages.password
            }}</span>
          </div>
        </div>
        <!-- 再輸入一次密碼 -->
        <div class="form_item_list" style="position: relative">
          <div class="form_item">
            <label for="password">再輸入一次密碼</label>
          </div>
          <div class="form_box">
            <input :type="pwdFlags ? 'password' : 'text'" id="password_check" autocomplete="new-password" v-model="passwordCheck" @blur="validatePasswordCheck" placeholder="再輸入一次密碼" />
            <span v-show="pwdFlags" @click="togglePasswords" class="material-symbols-outlined">
              visibility_off
            </span>
            <span v-show="!pwdFlags" @click="togglePasswords" class="material-symbols-outlined">
              visibility
            </span>
            <span v-if="errorMessages.passwordCheck" class="form-prompt">{{
              errorMessages.passwordCheck
            }}</span>
          </div>
        </div>
        <!-- 姓名 -->
        <div class="form_item_list">
          <div class="form_item">
            <label>姓名</label>
          </div>
          <div class="form_box">
            <input type="text" id="name" v-model="name" @blur="validateName" placeholder="請輸入姓名" />
            <span v-if="errorMessages.name" class="form-prompt">{{ errorMessages.name }}</span>
          </div>
        </div>
        <!-- 電話 -->
        <div class="form_item_list">
          <div class="form_item">
            <label>電話</label>
          </div>
          <div class="form_box">
            <input type="text" id="phone" v-model="phone" @blur="validatePhone" placeholder="請輸入電話" />
            <span v-if="errorMessages.phone" class="form-prompt">{{ errorMessages.phone }}</span>
          </div>
        </div>
        <!-- Email -->
        <div class="form_item_list" style="border: none">
          <div class="form_item">
            <label>Email</label>
          </div>
          <div class="form_box">
            <input type="email" id="email" v-model="email" @blur="validateEmail" placeholder="請輸入Email" />
            <span v-if="errorMessages.phone" class="form-prompt">{{ errorMessages.phone }}</span>
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
      isChecked: false,
      isRegisted: false,
      isSuccessRegist: false,
      errorMessages: {
        account: '',
        password: '',
        passwordCheck: '',
        name: '',
        phone: '',
        email: ''
      }
    }
  },
  methods: {
    // 切換密碼可見性
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
        this.errorMessages.account = this.isValidAccount ? '' : '帳號必須是字母或數字組成'
        this.account = ''
      } else {
        this.errorMessages.account = '';
        this.isValidAccount = true
      }
    },
    // 密碼正規判定
    validatePassword() {
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
      this.isValidPassword = passwordPattern.test(this.password)
      if (!this.isValidPassword) {
        this.errorMessages.password = this.isValidPassword
          ? ''
          : '密碼必須至少8個字符，包含至少一個大寫字母、一個小寫字母和一個數字'
      } else {
        this.errorMessages.password = '';
        this.isValidPassword = true
      }
    },
    // 再輸入一次密碼判定
    validatePasswordCheck() {
      this.isValidPasswordCheck = this.password === this.passwordCheck
      if (!this.isValidPasswordCheck) {
        this.errorMessages.passwordCheck = this.isValidPasswordCheck ? '' : '輸入的密碼不一致'
      } else {
        this.errorMessages.passwordCheck = ''
        this.isValidPasswordCheck = true
      }
    },
    // 姓名正規判定
    validateName() {
      this.isValidName = this.name.trim() !== ''
      this.errorMessages.name = this.isValidName ? '' : '姓名不可為空'
    },
    // 電話正規判定
    validatePhone() {
      const phonePattern = /^\d{10}$/
      this.isValidPhone = phonePattern.test(this.phone)
      if (!this.isValidPhone) {
        this.errorMessages.phone = this.isValidPhone ? '' : '電話號碼必須是10位數字'
      } else {
        this.errorMessages.phone = '';
        this.isValidPhone = true
      }
    },
    // Email正規判定
    validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      this.isValidEmail = emailPattern.test(this.email)
      if (!this.isValidEmail) {
        this.errorMessages.email = this.isValidEmail ? '' : '請輸入有效的電子郵件地址'
      } else {
        this.errorMessages.email = '';
        this.isValidEmail = true
      }
    },
    // 提交的資料
    async submitForm() {
      // 這裡可以處理提交的資料，發送到伺服器
      console.log('提交的表單資料:', {
        account: this.account,
        password: this.password,
        passwordCheck: this.passwordCheck,
        name: this.name,
        phone: this.phone,
        email: this.email
      })
      // 模擬提交成功的處理

      this.validateAccount()
      this.validatePassword()
      this.validatePasswordCheck()
      this.validatePhone()
      this.validateEmail()

      if (
        this.isValidAccount &&
        this.isValidPassword &&
        this.isValidPasswordCheck &&
        this.isValidPhone &&
        this.isValidEmail
      ) {
        // 發送 post 請求
        await this.getMember()

        if (this.isRegisted) {
          alert('此帳號已註冊')
        } else {
          await this.setMember()
          if (this.isSuccessRegist) {
            alert('註冊成功')
            window.location.href = '/memberformok'
          }
        }
      }
    },
    async getMember() {
      try {
        const formData = new URLSearchParams()
        formData.append('action', 'getMember')
        formData.append('account', this.account)
        const response = await fetch('http://localhost/CID101_G2_php/front/member.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: formData.toString()
        })
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        if (data['member'].length > 0) {
          this.isRegisted = true
        } else {
          this.isRegisted = false
        }
      } catch (error) {
        this.error = error
        console.error('There was a problem with the fetch operation:', error)
      } finally {
        this.loading = false
      }
    },

    async setMember() {
      try {
        const formData = new URLSearchParams()
        formData.append('action', 'setMember')
        formData.append('account', this.account)
        formData.append('password', this.password)
        formData.append('name', this.name)
        formData.append('phone', this.phone)
        formData.append('email', this.email)

        const response = await fetch('http://localhost/CID101_G2_php/front/member.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: formData.toString()
        })
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        alert(data['created'])
        if (data['created'] === true) {
          this.isSuccessRegist = true
        }
      } catch (error) {
        this.error = error
        console.error('There was a problem with the fetch operation:', error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style></style>
