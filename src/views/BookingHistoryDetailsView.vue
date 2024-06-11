<template>
    <div class="container">
        <div class="row">
            <small class="col-12 scrumble">首頁
            <span class="material-symbols-outlined">arrow_forward_ios</span>會員中心
            <span class="material-symbols-outlined">arrow_forward_ios</span>預約紀錄
            <span class="material-symbols-outlined">arrow_forward_ios</span>查看詳情</small>
        </div>
        <div class="center_menu">
            <RouterLink to="/membercenter"> <button class="big-btn-primary">會員資料</button></RouterLink>
            <RouterLink to="/memberorderhistory"> <button class="big-btn-secondary">訂單紀錄</button></RouterLink>
            <RouterLink to="/bookinghistory"> <button class="big-btn-primary">預約紀錄</button></RouterLink>
            <RouterLink to="/discounthistory"> <button class="big-btn-primary">優惠券紀錄</button></RouterLink>
        </div>
        <div class="wrap_details">
            <h4>預約紀錄詳情</h4>
            <div class="details_list">
                <p>訂單編號</p>
                <p>2024xxxxxxxx</p>
            </div>
            <div class="details_list">
                <p>訂單日期</p>
                <p>2024-02-29</p>
            </div>
            <div class="details_list">
                <p>姓名</p>
                <p>王大明</p>
            </div>
            <div class="details_list">
                <p>電話</p>
                <p>0912345678</p>
            </div>
            <div class="details_list">
                <p>Email</p>
                <p>abc123@email.com</p>
            </div>
            <div class="details_list">
                <p>地址</p>
                <p>320桃園市中壢區復興路46號9樓</p>
            </div>
            <div class="details_list">
                <p>課程教室</p>
                <p>A教室</p>
            </div>
            <div class="details_list" style="border: none">
                <p>訂單狀態</p>
                <p>已完成</p>
            </div>
            <div class="product_details" style="background-color: #F8F5F2; border: none;">
                <p>商品名稱</p>
                <p>預約時段</p>
                <p>單價</p>
                <p>人數</p>
                <p>合計</p>
            </div>
            <div class="product_details">
                <p>品酒體驗-初級課程1 </p>
                <p>14:00-16:00</p>
                <p>NT.3,200</p>
                <p>1</p>
                <p>NT.3,200</p>
            </div>
            <div class="product_price">
                <p>總價 </p>
                <p>NT.3,200</p>
            </div>
            <div class="product_price" style="border-bottom: 1px solid #000000;">
                <p>折扣 </p>
                <p>NT.0</p>
            </div>
            <div class="product_price">
                <p>總金額 </p>
                <p>NT.3,200</p>
            </div>
        </div>
    </div>
</template>

<script></script>

<style>
.wrap_details {
    margin: auto;
}
.wrap_details h4 {
    text-align: center;
    padding: 20px;
    border-bottom: 1px solid #000000;
    margin: 0 90px;
}
.details_list {
    width: 1000px;
    display: flex;
    align-items: center;
    justify-content: start;
    margin: auto;
    padding: 10px 0;
    border-bottom: 1px solid #000000;
}
.details_list p {
    width: 250px;
    padding: 0 0 0 20px;
    margin: 15px 0 15px 60px;
}

.product_details {
    width: 1000px;
    border-bottom: 1px solid #000000;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    padding: 25px 0;
    
}
.product_details p {
    margin: 0 50px;
    padding: 0 10px
}
.product_price {
    width: 1000px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: auto;
    padding: 25px 0;
}
.product_price p {
    margin: 0 80px;
    padding: 0 20px;
}
</style>
