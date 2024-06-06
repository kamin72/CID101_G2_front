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
            <div class="function_btn">
                <button type="button" class="big-btn-primary">完成</button>
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
    margin: 20px 0 40px 0;
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
.function_btn {
    margin-top: 30px;
}
.material-symbols-outlined {
    font-size: 16px;
    padding-left: 220px;
}
</style>