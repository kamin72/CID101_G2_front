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
            <div class="account_list">
                <input type="text" id="email" v-model="email" @blur="validateEmail" placeholder="請輸入電子信箱">
            </div>
            <!-- <span v-if="!isValidEmail" class="prompt">請輸入有效的電子郵件地址</span> -->
            <span v-if="errorMessage" class="prompt">{{ errorMessage }}</span>
            <button type="button" class="big-btn-primary" :disabled="!isEmailValid" style="margin-top: 80px; display: inline-block;">
                發送信件
            </button>
            <!-- 由信件內容提供連結forgetok -->

            <!-- <div class="account_list">
                <input type="text" id="account" placeholder="請輸入驗證碼">
            </div>
            <div class="function_btn"  style="margin-top: 40px">
                <RouterLink to="/forgetok"> 
                    <a href="" class="big-btn-primary">下一步</a>
                </RouterLink>
            </div> -->
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            errorMessage: '',
        }
    },
    methods: {
        validateEmail() {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(this.email)) {
                this.errorMessage = '請輸入有效的電子郵件';
                return false;
            }
            this.errorMessage = '';
            return this.$router.push('/forgetok');
        },
    }
}
</script>

<style>

</style>