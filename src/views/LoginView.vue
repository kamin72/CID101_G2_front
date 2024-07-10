<template>
  <div class="login_container" style="padding: 50px 0;">
    <div class="wrap_login">
      <form @submit.prevent="handleLogin">
        <div class="login_item">
          <a href="#" class="log_in" style="border-bottom: 2px solid #322d26">會員登入</a>
          <RouterLink to="/signup" style="text-decoration: none">
            <a href="#" class="sign_up">註冊會員</a>
          </RouterLink>
        </div>
        <div class="account_list">
          <input type="text" id="account" v-model="account" placeholder="帳號" name="account" autocomplete="account" />
          <!-- <span v-if="!isValidaccount">請輸入有效的帳號</span> -->
        </div>
        <div class="password_list">
          <input :type="pwdFlag ? 'password' : 'text'" id="password" v-model="password" placeholder="密碼"
            autocomplete="current-password" name="password" />
          <div class="eyes_visibility">
            <span v-show="pwdFlag" @click="togglePassword" class="material-symbols-outlined">visibility_off
            </span>
            <span v-show="!pwdFlag" @click="togglePassword" class="material-symbols-outlined">visibility
            </span>
          </div>
        </div>
        <!-- <RouterLink to="/forget" style="text-decoration: none">
                    <a href="#" class="forget">忘記密碼?</a>
                </RouterLink> -->
        <RouterLink to="/forget" style="text-decoration: none">
          <p class="forget">忘記密碼?</p>
        </RouterLink>
        <div class="login_btn">
          <button type="submit" class="big-btn-primary">會員登入</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import memberStore from '@/stores/loginMember'

export default {
  data() {
    return {
      pwdFlag: true,
      account: '',
      password: '',
      isAuthenticated: false
      // memberInfo: []
    }
  },
  methods: {
    ...mapActions(memberStore, ['login']),
    togglePassword() {
      this.pwdFlag = !this.pwdFlag
    },
    async handleLogin() {
      try {
        const success = await this.login(this.account, this.password)
        if (success === true) {
          // 登入成功後，檢查是否有重定向路徑
          const redirectPath = this.$route.query.redirect
          if (redirectPath) {
            this.$router.push(redirectPath)
          } else {
            // 如果登入成功，進行頁面跳轉
            this.$router.push('/')
          }
        }
      } catch (error) {
        console.error('登入錯誤:', error)
        // 處理登入錯誤
      }
    }
  }
}
</script>

<style></style>
