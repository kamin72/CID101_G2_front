<template>
    <div class="container">
        <div class="wrap_login">
            <form>
                <div class="login_item">
                    <a href="#" class="log_in">會員登入</a>
                    <RouterLink to="/signup">
                        <a href="#" class="sign_up">註冊會員</a>
                    </RouterLink>
                </div>
                <div class="account_list">
                    <input type="text" id="account" autocomplete="account" placeholder="帳號">
                </div>
                <div class="password_list">
                    <input :type='pwdFlag ? "password" : "text"' id="password" autocomplete="password" placeholder="密碼">
                    <div class="eyes_visibility">
                        <span v-show="pwdFlag" @click="togglePassword" class="material-symbols-outlined">visibility_off
                        </span>
                        <span v-show="!pwdFlag" @click="togglePassword" class="material-symbols-outlined">visibility
                        </span>
                    </div>
                </div>
                <RouterLink to="/forget">
                    <a href="#" class="forget">忘記密碼?</a>
                </RouterLink>
                <RouterLink to="/membercenter">
                    <div class="login_btn">
                        <button type="button" class="big-btn-primary">會員登入</button>
                    </div>
                </RouterLink>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    components: {
    },
    data() {
        return {
            pwdFlag: true,
        }
    },
    methods: {
        togglePassword() {
            this.pwdFlag = !this.pwdFlag;
        }
    }
}
</script>

<style>
</style>