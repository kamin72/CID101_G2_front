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
                    v-model="newPassword" placeholder="請輸入新密碼" @input="validatePassword">
                <div class="eyes_visibility">
                    <span v-show="pwdFlag" @click="togglePassword" class="material-symbols-outlined">
                        visibility_off
                    </span>
                    <span v-show="!pwdFlag" @click="togglePassword" class="material-symbols-outlined">
                        visibility
                    </span>
                </div>
            </div>
            <span v-if="errorMessage" class="prompt_psw">{{ errorMessage }}
            </span>

            <div class="password_list">
                <input :type='pwdFlags ? "password" : "text"' id="password_check" autocomplete="password_check"
                    placeholder="再次輸入密碼" @input="validateConfirmPassword" v-model="confirmPassword">
                <div class="eyes_visibility">
                    <span v-show="pwdFlags" @click="togglePasswords" class="material-symbols-outlined">visibility_off
                    </span>
                    <span v-show="!pwdFlags" @click="togglePasswords" class="material-symbols-outlined">
                        visibility
                    </span>
                </div>
            </div>
            <span v-if="errorMessages" class="prompt_psw">
                {{ errorMessage }}
            </span>
            <div class="function_btn" style="margin-top: 40px">
                <button type="button" class="big-btn-primary" style="display: inline-block;margin-top: 30px;"
                    :disabled="!isFormValid">
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
            errorMessage: '',
            isPasswordMatch: true,
        }
    },
    methods: {
        // 眼睛開閉
        togglePassword() {
            this.pwdFlag = !this.pwdFlag;
        },
        togglePasswords() {
            this.pwdFlags = !this.pwdFlags;
        },
        // 密碼需符合規定
        validatePassword() {
            const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            // if (!passwordPattern.test(this.newPassword)) {
            //     this.errorMessage = '密碼不符合規定';
            //     return false;
            // }
            if (this.newPassword !== this.password_check) {
                this.errorMessages = '密碼與確認密碼不一致';
                return false;
            }
            this.errorMessage = '';
            return true;
        },
        resetPassword() {
            if (this.isFormValid) {
                alert('密碼重設成功');
                this.$router.push('/');
            }
        },
    }
}
</script>

<style></style>