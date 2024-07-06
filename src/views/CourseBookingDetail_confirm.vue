<template>
    <section v-if="!isMobile" class="booking_flow">
        <CartFlow :flow="item" v-for="item in flow" :key="item.id" />
    </section>
    <section v-else class="cartFlowRWD">
        <CartFlowRWD :flowRwd="itemRwd" v-for="itemRwd in flowRwd" :key="itemRwd.id" />
    </section>
    <section class="course-booking-section">
        <div class="course-booking-container">
            <form class="col-9 col-md-10 col-sm-12 course-booking-form">
                <!-- 活動名稱 -->
                <div class="form_ltem_list">
                    <div class="form_item">
                        <h4>活動名稱</h4>
                    </div>
                    <div class="form_box">
                        <p>{{ course.course_name }}</p>
                    </div>
                </div>

                <!-- 課程價格 -->
                <div class="form_ltem_list">
                    <div class="form_item">
                        <h4>課程價格</h4>
                    </div>
                    <div class="form_box">
                        <p>NT. {{ course.course_price }}</p>
                    </div>
                </div>

                <!-- 折價券 -->
                <div class="form_ltem_list">
                    <div class="form_item">
                        <h4>折價券</h4>
                    </div>
                    <div class="form_box">
                        <p>{{ discount }} 元折價券</p>
                    </div>
                </div>

                <!-- 人數 -->
                <div class="form_ltem_list">
                    <div class="form_item">
                        <h4>人數</h4>
                    </div>
                    <div class="form_box">
                        <p>{{ participantCount }}</p>
                    </div>
                </div>

                <!-- 結帳金額 -->
                <div class="form_ltem_list">
                    <div class="form_item">
                        <h4>結帳金額</h4>
                    </div>
                    <div class="form_box">
                        <p>NT. {{ sum }}</p>
                    </div>
                </div>

                <!-- 姓名 -->
                <div class="form_ltem_list">
                    <div class="form_item">
                        <h4>姓名</h4>
                    </div>
                    <div class="form_box">
                        <p>{{ memName }}</p>
                    </div>
                </div>

                <!-- email -->
                <div class="form_ltem_list">
                    <div class="form_item">
                        <h4>email</h4>
                    </div>
                    <div class="form_box">
                        <p>{{ memEmail }}</p>
                    </div>
                </div>

                <!-- 電話號碼 -->
                <div class="form_ltem_list">
                    <div class="form_item">
                        <h4>電話號碼</h4>
                    </div>
                    <div class="form_box">
                        <p>{{ memPhone }}</p>
                    </div>
                </div>

                <!-- 其他需求 -->
                <div class="form_ltem_list" style="border: none;">
                    <div class="form_item">
                        <h4>其他需求</h4>
                    </div>
                    <div class="form_box">
                        <p>{{ otherRequirements }}</p>
                    </div>
                </div>
            </form>
            <div class="btn-wrap">
                <RouterLink :to="'/courseBookingDetail/' + course.course_id" style="text-decoration: none;">
                    <button class="big-btn-secondary">
                        上一步
                    </button>
                </RouterLink>
                <RouterLink :to="'/courseBookingDetail_pay/' + course.course_id" style="text-decoration: none;">
                    <button class="big-btn-primary">
                        確認無誤
                    </button>
                </RouterLink>
            </div>
        </div>
    </section>
</template>

<script>
import CartFlow from '@/components/Cart/CartFlow.vue'
import CartFlowRWD from '@/components//Cart/CartFlowRWD.vue'
import { mapState, mapActions } from 'pinia';
import courseStore from '@/stores/course';
import memberStore from '@/stores/loginMember'

export default {
    components: {
        CartFlow,
        CartFlowRWD,
    },

    data() {
        return {
            flow: [
                {
                    id: 1,
                    icon: 'edit_document',
                    opacity: '1',
                    text: '填寫預約資料',
                    bold: '300',
                    color: '#AEA495',
                    borderColor: '#AEA495',
                },
                {
                    id: 2,
                    icon: 'checklist',
                    opacity: '1',
                    text: '確認預約資料',
                    bold: '300',
                    color: '#AEA495'
                },
                {
                    id: 3,
                    icon: 'paid',
                    opacity: '0.3',
                    text: '付款方式',
                    bold: '300',
                },
                {
                    id: 4,
                    icon: 'check',
                    opacity: '0.3',
                    text: '完成預約',
                    bold: '300'
                },
            ],
            flowRwd: [
                {
                    id: 1,
                    icon: 'edit_document',
                    opacity: '1',
                    text: '填寫預約資料',
                    bold: '300',
                    color: '#AEA495',
                    borderColor: '#AEA495',
                },
                {
                    id: 2,
                    icon: 'checklist',
                    opacity: '1',
                    text: '確認預約資料',
                    bold: '300',
                    color: '#AEA495'
                }
            ],
            windowWidth: window.innerWidth,
            discount:""
        }
    },

    computed: {
        ...mapState(courseStore, ['specificCourse', 'checkoutSum', 'otherRequirements', 'participantCount']),
        ...mapState(memberStore, ['memberInfo']),

        memName() {
            return this.memberInfo?.[0]?.name || ''
        },
        memEmail() {
            return this.memberInfo?.[0]?.email || ''
        },
        memPhone() {
            return this.memberInfo?.[0]?.phone || ''
        },
        sum() {
            return this.loadCheckoutSum;
        },
        course() {
            return this.specificCourse || [];
        },
        isMobile() {
            return this.windowWidth < 450
        },
        
    },

    methods: {
        ...mapActions(courseStore, ['loadCheckoutSum', 'getData']),
        updateWindowWidth() {
            this.windowWidth = window.innerWidth
        },
    },

    mounted() {
        // 初始化會員資料
        memberStore().getMemberData();
        window.addEventListener('resize', this.updateWindowWidth)
        this.discount = localStorage.getItem('selectedDiscount')
    },

    beforeUnmount() {
        window.removeEventListener('resize', this.updateWindowWidth)
    },
}
</script>

<style></style>