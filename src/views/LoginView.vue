<template>
    <div class="container">
        <div class="wrap_login">
            <div class="login_item">
                <a href="#" class="log_in">會員登入</a>
                <RouterLink to="/signup"> 
                    <a href="#" class="sign_up">註冊會員</a>
                </RouterLink>
            </div>
            <div class="account_list">
                <!-- <label for="account">帳號</label> -->
                <input type="text" id="account" placeholder="帳號">
            </div>
            <div class="password_list">   
                <!-- <label for="password">密碼</label> -->
                <input type="password" id="password" placeholder="密碼">
                <span class="material-symbols-outlined">
                    visibility_off </span>
            </div>
            <RouterLink to="/forget"> 
                <a href="#" class="forget">忘記密碼?</a>
            </RouterLink>
            <RouterLink to="/membercenter"> 
                <div class="login_btn">
                    <button type="button" class="big-btn-primary">會員登入</button>
                </div>
            </RouterLink>
        </div>
    </div>
</template>

<script>
</script>

<style>
.password_list span  {
    font-size: 16px;
    padding-left: 220px;
}
</style>