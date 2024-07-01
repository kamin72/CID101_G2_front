<template>
    <div class="login_container">
        <div class="wrap_login">
            <div class="login_item">
                <RouterLink to="/login" style="text-decoration: none;"> 
                    <a href="#" class="log_in">會員登入</a>
                </RouterLink>
                <a href="#" class="sign_up" style="border-bottom: 2px solid #322D26;">註冊會員</a>
            </div>
            <div class="sign_up_item">
                <RouterLink to="/memberform" style="text-decoration: none;"> 
                    <a href="#" class="big-btn-primary">一般會員</a>
                </RouterLink>
                <RouterLink to="/wholesalerform" style="text-decoration: none;"> 
                    <a href="#" class="big-btn-primary">批發商</a>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script>
</script>
<style>
</style>    