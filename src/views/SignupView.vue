<template>
    <div class="login_container">
        <div class="wrap_login">
            <div class="login_item">
                <RouterLink to="/login"> 
                    <a href="#" class="log_in">會員登入</a>
                </RouterLink>
                <a href="#" class="sign_up">註冊會員</a>
            </div>
            <div class="sign_up_item">
                <RouterLink to="/memberform"> 
                    <a href="#" class="big-btn-primary">一般會員</a>
                </RouterLink>
                <RouterLink to="/wholesalerform"> 
                    <a href="#" class="big-btn-primary">批發商</a>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script>
</script>
<style>
.sign_up_item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin: 50px 0;
}
.sign_up_item a {
    text-decoration: none;
    display: inline-block;
}
</style>    