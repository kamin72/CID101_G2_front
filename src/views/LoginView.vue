<template>
    <div class="container">
        <div class="wrap_login">
            <form @submit.prevent="handleLogin">
                <div class="login_item">
                    <a href="#" class="log_in">會員登入</a>
                    <RouterLink to="/signup">
                        <a href="#" class="sign_up">註冊會員</a>
                    </RouterLink>
                </div>
                <div class="account_list">
                    <input type="text" id="account" v-model="account" placeholder="帳號" name="account" />
                    <!-- <span v-if="!isValidaccount">請輸入有效的帳號</span> -->
                </div>
                <div class="password_list">
                    <input :type="pwdFlag ? 'password' : 'text'" id="password" v-model="password" placeholder="密碼"
                        name="password" />
                    <div class="eyes_visibility">
                        <span v-show="pwdFlag" @click="togglePassword" class="material-symbols-outlined">visibility_off
                        </span>
                        <span v-show="!pwdFlag" @click="togglePassword" class="material-symbols-outlined">visibility
                        </span>
                    </div>
                </div>
                <RouterLink to="/forget" style="text-decoration: none">
                    <a href="#" class="forget">忘記密碼?</a>
                </RouterLink>
                <!-- <RouterLink to="/membercenter">
                    <div class="login_btn">
                        <button type="button" class="big-btn-primary">會員登入</button>
                    </div>
                </RouterLink> -->
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
                const success = await this.login(this.account, this.password);
                if (success === true) {
                    // 如果登入成功，進行頁面跳轉
                    this.$router.push('/');
                }
            } catch (error) {
                console.error('登入錯誤:', error);
                // 處理登入錯誤
            }
        }
    }
}
</script>

<style></style>
