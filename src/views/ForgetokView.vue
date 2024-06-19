<template>
    <div class="container">
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
                <input :type='pwdFlag ? "password" : "text"' id="password" autocomplete="password" placeholder="設定新密碼">
                <div class="eyes_visibility">
                    <span v-show="pwdFlag" @click="togglePassword" class="material-symbols-outlined">
                        visibility_off
                    </span>
                    <span v-show="!pwdFlag" @click="togglePassword" class="material-symbols-outlined">
                        visibility
                    </span>
                </div>
            </div>
            <div class="password_list">
                <input :type='pwdFlags ? "password" : "text"' id="password_check" autocomplete="password_check"
                    placeholder="再次輸入密碼">
                <div class="eyes_visibility">
                    <span v-show="pwdFlags" @click="togglePasswords" class="material-symbols-outlined">visibility_off
                    </span>
                    <span v-show="!pwdFlags" @click="togglePasswords" class="material-symbols-outlined">
                        visibility
                    </span>
                </div>
            </div>
            <div class="function_btn" style="margin-top: 40px">
                <button type="button" class="big-btn-primary" style="display: inline-block;margin-top: 30px;">
                    完成
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
            pwdFlags: true
        }
    },
    methods: {
        togglePassword() {
            this.pwdFlag = !this.pwdFlag;
        },
        togglePasswords() {
            this.pwdFlags = !this.pwdFlags;
        }
    }
}
</script>

<style></style>