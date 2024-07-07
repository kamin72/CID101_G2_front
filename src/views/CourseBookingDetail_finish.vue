<template>
    <section v-if="!isMobile" class="booking_flow">
        <CartFlow :flow="item" v-for="item in flow" :key="item.id" />
    </section>
    <section v-else class="cartFlowRWD">
        <CartFlowRWD :flowRwd="itemRwd" v-for="itemRwd in flowRwd" :key="itemRwd.id" />
    </section>
    <section class="course-booking-section">
        <div class="course-booking-container">
            <div class="wrapFinish">
                <div class="finish">
                    <div class="finishIcon">
                        <GreenCheckmark :size="100" color="#4CAF50" />
                        <h2 style="margin-left: 15px;">完成詢價</h2>
                    </div>
                    <h3>{{ countdown }} 幾秒後跳轉至首頁......</h3>
                </div>
                <RouterLink to="/">
                    <button class="big-btn-primary">回首頁</button>
                </RouterLink>
            </div>
        </div>
    </section>
</template>

<script>
import CartFlow from '@/components/Cart/CartFlow.vue'
import CartFlowRWD from '@/components//Cart/CartFlowRWD.vue'
import GreenCheckmark from './GreenCheckmark.vue'  // 確保路徑正確
import { mapState, mapActions } from 'pinia';
import courseStore from '@/stores/course';

export default {
    components: {
        CartFlow,
        CartFlowRWD,
        GreenCheckmark,
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
                    color: '#AEA495',
                    borderColor: '#AEA495',
                },
                {
                    id: 3,
                    icon: 'paid',
                    opacity: '1',
                    text: '付款方式',
                    bold: '300',
                    color: '#AEA495',
                    borderColor: '#AEA495',
                },
                {
                    id: 4,
                    icon: 'check',
                    opacity: '1',
                    text: '完成預約',
                    bold: '300',
                    color: '#AEA495'
                },
            ],
            flowRwd: [
                {
                    id: 3,
                    icon: 'paid',
                    opacity: '1',
                    text: '付款方式',
                    bold: '300',
                    color: '#AEA495',
                    borderColor: '#AEA495',
                },
                {
                    id: 4,
                    icon: 'check',
                    opacity: '1',
                    text: '完成預約',
                    bold: '300',
                    color: '#AEA495',
                }
            ],
            countdown: 5,
            interval: null,
            windowWidth: window.innerWidth,
        }
    },

    computed: {
        ...mapState(courseStore, ['checkoutSum']),
        sum() {
            return this.checkoutSum;
        },
        isMobile() {
            return this.windowWidth < 450
        },
    },

    methods: {
        ...mapActions(courseStore, ['loadCheckoutSum', 'clearBookingData']),
        startCountdown() {
            this.interval = setInterval(() => {
                if (this.countdown > 0) {
                    this.countdown--
                } else {
                    clearInterval(this.interval)
                    this.interval = null
                    this.$router.push('/')
                }
            }, 1000)
        },
        stopCountdown() {
            if (this.interval) {
                clearInterval(this.interval)
                this.interval = null
            }
        },
        updateWindowWidth() {
            this.windowWidth = window.innerWidth
        },
    },

    mounted() {
        // 初始化會員資料
        this.memName = 'John Doe'
        this.memEmail = 'john.doe@example.com'
        this.memPhone = '0912345678'
        this.loadCheckoutSum()
        window.scrollTo(0, 0), this.startCountdown()
        window.addEventListener('resize', this.updateWindowWidth)
        // 清除預約數據
        this.clearBookingData();
    },

    beforeUnmount() {
        this.stopCountdown()
        window.removeEventListener('resize', this.updateWindowWidth)
    },
}
</script>

<style></style>