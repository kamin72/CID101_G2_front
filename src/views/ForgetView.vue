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
                <input type="text" id="account" placeholder="請輸入電子信箱">
            </div>
            <RouterLink to="/forgetok" class="function_btn"> 
                <button type="button" class="big-btn-primary" style="margin: 20px; display: inline-block;">發送信件</button>
            </RouterLink>
            <!-- 
            由信件內容提供連結forgetok
            <div class="account_list">
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
</script>

<style>

.material-symbols-outlined {
    font-size: 16px;
    padding-left: 180px;
}

</style>