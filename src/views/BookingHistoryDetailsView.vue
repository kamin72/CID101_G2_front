<template>
    <div class="container">
        <div class="row">
            <small class="col-12 scrumble">
                <span class="frontPage-bread">
                    <RouterLink to="/">首頁</RouterLink>
                </span>
                <span class="material-symbols-outlined">arrow_forward_ios</span>
                <span class="frontPage-bread">
                    <RouterLink to="/membercenter">會員中心</RouterLink>
                </span>
                <span class="material-symbols-outlined">arrow_forward_ios</span>
                <span class="frontPage-bread">
                <RouterLink to="/bookinghistory">預約紀錄</RouterLink>
                </span>
                <span class="material-symbols-outlined">arrow_forward_ios</span>
                <span class="frontPage-bread">
                    <RouterLink to="/membercenter">查看詳情</RouterLink>
                </span>
            </small>
        </div>
        <div class="center_menu">
            <RouterLink to="/membercenter" style="text-decoration: none;">
                <button :class="buttonClass" style="display: inline; margin: 0 2px;">會員資料</button>
            </RouterLink>
            <RouterLink to="/memberorderhistory" style="text-decoration: none;">
                <button :class="buttonClass" style="display: inline; margin: 0 2px;">訂單紀錄</button>
            </RouterLink>
            <RouterLink to="/bookinghistory" style="text-decoration: none;">
                <button :class="secondaryButtonClass" style="display: inline; margin: 0 2px;">預約紀錄</button>
            </RouterLink>
            <RouterLink to="/discounthistory" style="text-decoration: none;">
                <button :class="buttonClass" style="display: inline; margin: 0 2px;">優惠券紀錄</button>
            </RouterLink>
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

<script>
export default {
    data() {
        return {
            windowWidth: window.innerWidth
        };
    },
    computed: {
        buttonClass() {
            return this.windowWidth < 996 ? 'small-btn-primary' : 'big-btn-primary';
        },
        secondaryButtonClass() {
            return this.windowWidth < 996 ? 'small-btn-secondary' : 'big-btn-secondary';
        }
    },
    methods: {
        updateWindowWidth() {
            this.windowWidth = window.innerWidth;
        }
    },
    mounted() {
        window.addEventListener('resize', this.updateWindowWidth);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.updateWindowWidth);
    }
};
</script>

<style>
</style>
