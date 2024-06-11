<template>
    <div class="container">
        <div class="row">
            <small class="col-12 scrumble">首頁
            <span class="material-symbols-outlined">arrow_forward_ios</span>會員中心
            <span class="material-symbols-outlined">arrow_forward_ios</span>預約紀錄</small>
        </div>
        <div class="center_menu">
            <RouterLink to="/membercenter"> <button class="big-btn-primary">會員資料</button></RouterLink>
            <RouterLink to="/memberorderhistory"> <button class="big-btn-primary">訂單紀錄</button></RouterLink>
            <RouterLink to="/bookinghistory"> <button class="big-btn-secondary">預約紀錄</button></RouterLink>
            <RouterLink to="/discounthistory"> <button class="big-btn-primary">優惠券紀錄</button></RouterLink>
        </div>
        <div class="wrap_order_history">
            <div class="items_list">
                <p>課程日期</p>
                <p>預約時段</p>
                <p>活動名稱</p>
                <p>人數</p>
                <p>總金額</p>
                <p>預約狀態</p>
                <p>操作</p>
            </div>
            <div class="items">
                <p>2024-05-18</p>
                <p>14:00-16:00</p>
                <p>品酒體驗-初級課程1</p>
                <p>1</p>
                <p>NT.3,200</p>
                <p>預約完成</p>
                <RouterLink to="/"> <button class="small-btn-secondary">取消訂單</button></RouterLink>
                <RouterLink to="/bookinghistorydetails"> <button class="small-btn-primary">查閱</button></RouterLink>
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
