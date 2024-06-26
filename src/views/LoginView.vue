<template>
    <div class="login_container">
        <div class="wrap_login">
            <form @submit.prevent="login">
                <div class="login_item">
                    <a href="#" class="log_in">會員登入</a>
                    <RouterLink to="/signup">
                        <a href="#" class="sign_up">註冊會員</a>
                    </RouterLink>
                </div>
                <div class="account_list">
                    <input type="text" id="account" v-model="account" autocomplete="account" placeholder="帳號">
                    <!-- <span v-if="!isValidaccount">請輸入有效的帳號</span> -->
                </div>
                <div class="password_list">
                    <input :type='pwdFlag ? "password" : "text"' id="password" v-model="password" autocomplete="password" placeholder="密碼">
                    <div class="eyes_visibility">
                        <span v-show="pwdFlag" @click="togglePassword" class="material-symbols-outlined">visibility_off
                        </span>
                        <span v-show="!pwdFlag" @click="togglePassword" class="material-symbols-outlined">visibility
                        </span>
                    </div>
                </div>
                <RouterLink to="/forget" style="text-decoration: none;">
                    <a href="#" class="forget">忘記密碼?</a>
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
    handleLogin() {
      try {
        const success = this.login(this.account, this.password)
        if (success) {
          // 如果登入成功，進行頁面跳轉
          this.$router.push('/')
        }
      } catch (error) {
        console.error('Login error:', error)
      }
    }
  }
}
</script>

<style></style>
