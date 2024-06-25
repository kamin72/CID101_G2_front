<template>
    <div class="container">
        <div class="wrap_login">
            <form @submit.prevent="login">
                <div class="login_item">
                    <a href="#" class="log_in">會員登入</a>
                    <RouterLink to="/signup">
                        <a href="#" class="sign_up">註冊會員</a>
                    </RouterLink>
                </div>
                <div class="account_list">
                    <input type="text" id="account" v-model="account" placeholder="帳號" name="account">
                    <!-- <span v-if="!isValidaccount">請輸入有效的帳號</span> -->
                </div>
                <div class="password_list">
                    <input :type='pwdFlag ? "password" : "text"' id="password" v-model="password" placeholder="密碼"
                        name="password">
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
export default {
    data() {
        return {
            pwdFlag: true,
            account: '',
            password: '',
            isAuthenticated: false,
            memberInfo: []
        }
    },
    methods: {
        togglePassword() {
            this.pwdFlag = !this.pwdFlag;
        },
        // login() {
        //     // 假設正確的帳號和密碼是 "admin" 和 "password"
        //     if (this.account !== 'abc123' || this.password !== '123123') {
        //         alert('帳號或密碼輸入錯誤');
        //     } else {
        //         alert('登入成功');
        //         // 在這裡可以導向到下一個頁面或執行其他登入成功後的操作
        //     }
        // }
        login() {
            // 模擬帳號和密碼驗證
            if (this.account === 'abc123' && this.password === '123456') {
                this.isAuthenticated = true;
                this.$router.push('/membercenter');
            } else if (this.account === 'who456' && this.password === '112233') {
                this.$router.push('/wholesalercenter');
            } else {
                alert('帳號或密碼輸入錯誤');
            }
        }
        // login() {
        //     const formData = new URLSearchParams();
        //     formData.append('account', this.account);
        //     formData.append('password', this.password);

        //     fetch('http://localhost/php/memberLogin.php', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/x-www-form-urlencoded',
        //         },
        //         body: formData.toString(),
        //     })
        //         .then((res) => res.json())
        //         .then((data) => {
        //             if (data.error) {
        //                 alert(data.msg);
        //             } else if (data.member) {
        //                 alert('welcome');
        //                 this.memberInfo = data.member
        //                 console.log(this.memberInfo)
        //                 localStorage.setItem('memberInfo', JSON.stringify(this.memberInfo))
        //                 // 如果登入成功，可以進行頁面跳轉
        //                 // this.$router.push('/');
        //             } else {
        //                 alert('無此帳號')
        //             }
        //         })
        // }
    },
    created() {
    },
    mounted() {

    },
}


</script>

<style></style>