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
            <div class="password_list" style="position: relative;">
                <input :type='pwdFlag ? "password" : "text"' id="password" autocomplete="password" placeholder="設定新密碼">
                <span v-show="pwdFlag" @click="togglePassword" class="material-symbols-outlined"
                    style="font-size: 16px;position: absolute; margin-left: 160px;">visibility_off
                </span>
                <span v-show="!pwdFlag" @click="togglePassword" class="material-symbols-outlined"
                    style="font-size: 16px;position: absolute;margin-left: 160px;">visibility
                </span>
            </div>
            <div class="password_list" style="position: relative;">
                <input :type='pwdFlag ? "password" : "text"' id="password_check" autocomplete="password_check"
                    placeholder="再次輸入密碼">
                <span v-show="pwdFlag" @click="togglePassword" class="material-symbols-outlined"
                    style="font-size: 18px;position: absolute; margin-left: 160px;">visibility_off
                </span>
                <span v-show="!pwdFlag" @click="togglePassword" class="material-symbols-outlined"
                    style="font-size: 18px;position: absolute; margin-left: 160px;">visibility
                </span>
            </div>
            <div class="function_btn" style="margin-top: 40px">
                <button type="button" class="big-btn-primary" style="margin-top: 30px;">完成</button>
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
.material-symbols-outlined {
    font-size: 16px;
    padding-left: 220px;
}
</style>