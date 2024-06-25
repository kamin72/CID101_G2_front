<template>
    <div class="history-container">
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
                優惠券紀錄
            </small>
        </div>
        <div class="center_menu">
            <RouterLink to="/membercenter" style="text-decoration: none;">
                <!-- <button class="big-btn-primary">會員資料</button> -->
                <button :class="buttonClass" style="display: inline; margin: 0 2px;">會員資料</button>
            </RouterLink>
            <RouterLink to="/memberorderhistory" style="text-decoration: none;">
                <!-- <button class="big-btn-primary">訂單紀錄</button> -->
                <button :class="buttonClass" style="display: inline; margin: 0 2px;">訂單紀錄</button>
            </RouterLink>
            <RouterLink to="/bookinghistory" style="text-decoration: none;"> 
                <!-- <button class="big-btn-primary">預約紀錄</button> -->
                <button :class="buttonClass" style="display: inline; margin: 0 2px;">預約紀錄</button>
            </RouterLink>
            <RouterLink to="/discounthistory" style="text-decoration: none;">
                <!-- <button class="big-btn-secondary">優惠券紀錄</button> -->
                <button :class="secondaryButtonClass" style="display: inline; margin: 0 2px;">優惠券紀錄</button>
            </RouterLink>
        </div>
        <div class="wrap_discount_history">
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
                <p>2024-05-31<br>
                    23:59:59</p>
                <p>未使用</p>
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
