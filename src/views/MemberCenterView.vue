<template>
    <div class="container">
        <div class="row">
            <small class="col-12 scrumble">首頁
                <span class="material-symbols-outlined">arrow_forward_ios</span>會員中心
                <span class="material-symbols-outlined">arrow_forward_ios</span>會員資料</small>
        </div>
        <div class="center_menu">
            <RouterLink to="/membercenter" style="text-decoration: none;">
                <!-- <button class="big-btn-secondary">會員資料</button> -->
                <button :class="secondaryButtonClass" style="display: inline; margin: 0 2px;">會員資料</button>
            </RouterLink>
            <RouterLink to="/memberorderhistory" style="text-decoration: none;">
                <!-- <button class="big-btn-primary">訂單紀錄</button> -->
                <button :class="buttonClass" style="display: inline; margin: 0 2px;">訂單紀錄</button>
            </RouterLink>
            <RouterLink to="/bookinghistory" style="text-decoration: none;">
                <!-- <button class="big-btn-primary">預約紀錄</button> -->
                <button :class="buttonClass"style="display: inline; margin: 0 2px;">預約紀錄</button>
            </RouterLink>
            <RouterLink to="/discounthistory" style="text-decoration: none;">
                <!-- <button class="big-btn-primary">優惠券紀錄</button> -->
                <button :class="buttonClass" style="display: inline; margin: 0 2px;">優惠券紀錄</button>
            </RouterLink>
        </div>
        <div class="wrap_mem_center">
            <div class="member_info_list">
                <div class="member_type">
                    <h3>王小明</h3>
                    <h4>一般會員</h4>
                </div>
                <div class="member_icon">
                    <span class="material-symbols-outlined">
                        perm_contact_calendar
                    </span>
                    <h4>會員資料</h4>
                </div>
                <div class="member_info">
                    <label>會員帳號</label>
                    <input type="text" value="abc123" disabled="disabled" style="background-color: #F8F5F2;">
                </div>
                <div class="member_info">
                    <label>Email</label>
                    <input type="text" value="123@email.com">
                </div>
                <div class="member_info">
                    <label>手機電話</label>
                    <input type="text" value="091234567">
                </div>
                <button class="big-btn-primary cart" style="display: inline-block;">儲存</button>
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
