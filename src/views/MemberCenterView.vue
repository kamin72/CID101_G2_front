<template>
    <div class="container">
        <div class="row">
            <small class="col-12 scrumble">首頁<span class="material-symbols-outlined">arrow_forward_ios</span>我們的酒</small>
        </div>
        <div class="center_menu">
            <button type="button" class="big-btn-primary">會員資料</button>
            <button type="button" class="big-btn-secondary">訂單紀錄</button>
            <button type="button" class="big-btn-secondary">預約紀錄</button>
            <button type="button" class="big-btn-secondary">優惠券紀錄</button>
        </div>
        <div class="wrap_mem_center">
            
            <div class="member_info_list">
                <div class="member_type">
                    <h3>王小明</h3>
                    <h4>一般會員</h4>
                </div>
                <div class="member_icon">
                    <span class="material-symbols-outlined">perm_contact_calendar</span>
                    <h4>會員資料</h4>
                </div>
                <div class="member_info">
                    <label>會員帳號</label>
                    <p>abc123</p>
                </div>
                <div class="member_info">
                    <label>Email</label>
                    <input type="text" value="123@email.com">
                </div>
                <div class="member_info">
                    <label>手機電話</label>
                    <input type="text" value="091234567">
                </div>
                <button class="big-btn-primary cart">儲存</button>
            </div>
        </div>
    </div>
</template>

<script></script>

<style>
.center_menu {
    border-bottom: 1px solid #322D26;
    padding-bottom: 20px;
}

.wrap_mem_center {
    margin: auto;
}

.member_info_list {
    width: 500px;
    background-color: #F8F5F2;
    margin: 10px auto;
}
.member_type {
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 10px solid #EDE7DE;
    
}
.member_type h4 {
    margin: 35px;
}
.member_icon {
    display: flex;
    padding: 20px;
}
.member_info {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
}
.member_info input {
    outline: none;
    border: none;
    background: #FFFFFF;
    padding: 10px;
}
.member_info label {
    display: block;
    width: 100px;
    padding: 10px;

}
</style>
