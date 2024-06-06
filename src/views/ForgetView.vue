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
            <div class="function_btn">
                <button type="button" class="big-btn-primary">發送驗證碼</button>
            </div>
            <div class="account_list">
                <input type="text" id="account" placeholder="請輸入驗證碼">
            </div>
            <div class="function_btn">
                <!-- <button type="button" class="big-btn-primary">下一步</button> -->
                <RouterLink to="/forgetok"> 
                    <a href="" class="big-btn-primary" >下一步</a>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script>
</script>

<style>
.process {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0 ;
}
.process p {
    display: inline-block;
    width: 20px;
    height: 20px;
    color: white;
    border-radius: 100%;
    background-color: #AEA495;
    text-align: center;
}
.process span {
    width: 200px;
    height: 1px;
    background-color: #AEA495;
    margin: 0 10px;
}
.material-symbols-outlined {
    font-size: 16px;
    padding-left: 180px;
}
.function_btn a {
    text-decoration: none;
}
</style>