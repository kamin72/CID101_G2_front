<template>
    <div class="container">
        <div class="row">
            <small class="col-12 scrumble">首頁
            <span class="material-symbols-outlined">arrow_forward_ios</span>會員中心
            <span class="material-symbols-outlined">arrow_forward_ios</span>優惠券紀錄</small>
        </div>
        <div class="center_menu">
            <RouterLink to="/membercenter"> <button class="big-btn-primary">會員資料</button></RouterLink>
            <RouterLink to="/memberorderhistory"> <button class="big-btn-primary">訂單紀錄</button></RouterLink>
            <RouterLink to="/bookinghistory"> <button class="big-btn-primary">預約紀錄</button></RouterLink>
            <RouterLink to="/discounthistory"> <button class="big-btn-secondary">優惠券紀錄</button></RouterLink>
        </div>
        <div class="wrap_order_history">
            <div class="items_list">
                <p>獲得日期</p>
                <p>優惠券名稱</p>
                <p>優惠券內容</p>
                <p>使用期限</p>
                <p>優惠券狀態</p>
            </div>
            <div class="items">
                <p>2024-05-01</p>
                <p>小遊戲9折優惠卷</p>
                <p>不限金額9折</p>
                <p>2024-05-31 23:59:59</p>
                <p>未使用</p>
            </div>
        </div>
    </div>
</template>

<script></script>

<style>

.items_list p {
    margin: 0 45px;
    padding: 10px;
}

.items p {
    margin: 0 35px;
    padding: 10px;
}

</style>
