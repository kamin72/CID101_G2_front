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
                <input type="password" id="password" placeholder="設定新密碼">
                <span class="material-symbols-outlined">
                    visibility_off </span>
            </div>
            <div class="password_list">   
                <input type="password" id="password" placeholder="再次輸入密碼">
                <span class="material-symbols-outlined">
                    visibility_off </span>
            </div>
            <div class="function_btn" style="margin-top: 40px">
                <button type="button" class="big-btn-primary" style="margin-top: 30px;">完成</button>
            </div>
        </div>
    </div>
</template>

<script>
</script>

<style>
.material-symbols-outlined {
    font-size: 16px;
    padding-left: 220px;
}
</style>