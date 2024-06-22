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
                預約紀錄
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
                <!-- <button class="big-btn-secondary">預約紀錄</button> -->
                <button :class="secondaryButtonClass" style="display: inline; margin: 0 2px;">預約紀錄</button>
            </RouterLink>
            <RouterLink to="/discounthistory" style="text-decoration: none;">
                <!-- <button class="big-btn-primary">優惠券紀錄</button> -->
                <button :class="buttonClass" style="display: inline; margin: 0 2px;">優惠券紀錄</button>
            </RouterLink>
        </div>
        <div class="wrap_booking_history">
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
                <RouterLink to="/" style="text-decoration: none;">
                    <button class="small-btn-secondary">取消訂單</button>
                </RouterLink>
                <RouterLink to="/bookinghistorydetails" style="text-decoration: none;">
                    <button class="small-btn-primary">查閱</button>
                </RouterLink>
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

<style></style>
