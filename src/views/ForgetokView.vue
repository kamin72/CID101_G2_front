<template>
    <div class="login_container">
        <div class="wrap_login">
            <div class="login_item">
                <h4>忘記密碼</h4>
            </div>
            <div class="process">
                <p>1</p>
                <span></span>
                <p>2</p>
            </div>
            <div class="password_list">
                <input :type='pwdFlag ? "password" : "text"' id="new_password" autocomplete="new_password"
                    v-model="newPassword" placeholder="請輸入新密碼" @blur="validatePassword">
                <div class="eyes_visibility">
                    <span v-show="pwdFlag" @click="togglePassword" class="material-symbols-outlined">
                        visibility_off
                    </span>
                    <span v-show="!pwdFlag" @click="togglePassword" class="material-symbols-outlined">
                        visibility
                    </span>
                </div>

            </div>
            <span v-if="passwordErrorMessage" class="prompt_psw">
                {{ passwordErrorMessage }}
            </span>

            <div class="password_list">
                <input :type='pwdFlags ? "password" : "text"' id="password_check" autocomplete="password_check"
                    placeholder="再次輸入密碼" @blur="validatePasswordCheck" v-model="confirmPassword">
                <div class="eyes_visibility">
                    <span v-show="pwdFlags" @click="togglePasswords" class="material-symbols-outlined">visibility_off
                    </span>
                    <span v-show="!pwdFlags" @click="togglePasswords" class="material-symbols-outlined">
                        visibility
                    </span>
                </div>
            </div>
            <span v-if="confirmPasswordErrorMessage" class="prompt_psw">
                {{ confirmPasswordErrorMessage }}
            </span>
            <div class="function_btn" style="margin-top: 40px">
                <button type="button" class="big-btn-primary" style="display: inline-block;"
                    :disabled="!isFormValid" @click="resetPassword">
                    重設密碼
                </button>
            </div>
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
            pwdFlags: true,
            newPassword: '',
            confirmPassword: '',
            passwordErrorMessage: '',
            confirmPasswordErrorMessage: '',
            isValidPassword: false,
            isValidPasswordCheck: false
        }
    },
    computed: {
        isFormValid() {
            return this.isValidPassword && this.isValidPasswordCheck;
        }
    },
    methods: {
        // 切換密碼可見性
        togglePassword() {
            this.pwdFlag = !this.pwdFlag;
        },
        togglePasswords() {
            this.pwdFlags = !this.pwdFlags;
        },
        // 新密碼正規判定
        validatePassword() {
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
            this.isValidPassword = passwordPattern.test(this.newPassword)
            if (!this.isValidPassword) {
                this.passwordErrorMessage = '密碼必須至少8個字符，包含至少一個大寫字母、一個小寫字母和一個數字'
            } else {
                this.passwordErrorMessage = '';
                this.isValidPassword = true
            }
        },
        // 再輸入一次密碼判定
        validatePasswordCheck() {
            this.isValidPasswordCheck = this.newPassword === this.confirmPassword;
            if (!this.isValidPasswordCheck) {
                this.confirmPasswordErrorMessage = '輸入的密碼不一致'
            } else {
                this.confirmPasswordErrorMessage = '';
                this.isValidPasswordCheck = true
            }
        },
        resetPassword() {
            if (this.isFormValid) {
                alert('重設密碼成功');
                this.$router.push('/');
            }
        },
    },
}
</script>

<style></style>