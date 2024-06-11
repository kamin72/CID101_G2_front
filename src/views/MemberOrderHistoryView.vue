<template>
    <div class="container">
        <div class="row">
            <small class="col-12 scrumble">首頁
            <span class="material-symbols-outlined">arrow_forward_ios</span>會員中心
            <span class="material-symbols-outlined">arrow_forward_ios</span>訂單紀錄</small>
        </div>
        <div class="center_menu">
            <RouterLink to="/membercenter"> <button class="big-btn-primary">會員資料</button></RouterLink>
            <RouterLink to="/memberorderhistory"> <button class="big-btn-secondary">訂單紀錄</button></RouterLink>
            <RouterLink to="/bookinghistory"> <button class="big-btn-primary">預約紀錄</button></RouterLink>
            <RouterLink to="/discounthistory"> <button class="big-btn-primary">優惠券紀錄</button></RouterLink>
        </div>
        <div class="wrap_order_history">
            <div class="items_list">
                <p>訂單編號</p>
                <p>訂單日期</p>
                <p>總金額</p>
                <p>訂單狀態</p>
                <p>操作</p>
            </div>
            <div class="items">
                <p>2024xxxxxxxx</p>
                <p>2024-02-29</p>
                <p>NT.2,500</p>
                <p>已完成</p>
                <button class="small-btn-invalid">取消訂單</button>
                <RouterLink to="memberorderhistorydetails"> <button class="small-btn-primary">查閱</button></RouterLink>
            </div>
            <div class="items">
                <p>2024xxxxxxxx</p>
                <p>2024-02-29</p>
                <p>NT.2,500</p>
                <p>已備貨</p>
                <RouterLink to="/"> <button class="small-btn-secondary">取消訂單</button></RouterLink>
                <RouterLink to="/"> <button class="small-btn-primary">查閱</button></RouterLink>
            </div>
            <div class="items">
                <p>2024xxxxxxxx</p>
                <p>2024-02-29</p>
                <p>NT.2,500</p>
                <p>未處理</p>
                <RouterLink to="/"> <button class="small-btn-secondary">取消訂單</button></RouterLink>
                <RouterLink to="/"> <button class="small-btn-primary">查閱</button></RouterLink>
            </div>
        </div>
    </div>
</template>

<script></script>

<style>
</style>
