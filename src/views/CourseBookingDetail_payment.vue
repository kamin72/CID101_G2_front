<template>
    <section class="booking_flow">
        <CartFlow :flow="item" v-for="item in flow" :key="item.id" />
    </section>
    <section class="course-booking-section">
        <div class="course-booking-container">
            <form class="col-9 col-md-10 col-sm-12 course-booking-form">

                <!-- 結帳金額 -->
                <div class="form_ltem_list">
                    <div class="form_item">
                        <h4>結帳金額</h4>
                    </div>
                    <div class="form_box">
                        <p>NT. {{ sum }}</p>
                    </div>
                </div>

                <!-- 信用卡/金融卡付款 -->
                <div class="form_ltem_list" style="border: none;">
                    <div class="form_item">
                        <h4>其他需求</h4>
                    </div>
                    <div class="form_box">
                        <div class="creditCardWrap1">
                            <p>卡片號碼</p>
                            <div class="creditCardInput">
                                <input type="text" placeholder="0000"><p>-</p><input type="text" placeholder="0000"><p>-</p><input type="text" placeholder="0000"><p>-</p><input type="text" placeholder="0000">
                            </div>
                        </div>
                        <div class="creditCardWrap2">
                            <div>
                                <p>卡片持有人</p>
                                <input type="text" placeholder="請輸入持卡人姓名">
                            </div>
                            <div>
                                <p>有效期限</p>
                                <input type="text" placeholder="MM/YY">
                            </div>
                            <div>
                                <p>CVV2</p>
                                <input type="text" placeholder="請輸入安全碼">
                            </div>
                        </div>

                    </div>
                </div>
            </form>
            <div class="btn-wrap">
                <button class="big-btn-secondary">
                    上一步
                </button>
                <button class="big-btn-primary">
                    確認無誤
                </button>
            </div>
        </div>
    </section>
</template>

<script>
import CartFlow from '@/components/Cart/CartFlow.vue'
import { mapState, mapActions } from 'pinia';
import courseStore from '@/stores/course';

export default {
    components: {
        CartFlow,
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
                    color: '#AEA495'
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
                    opacity: '1',
                    text: '付款方式',
                    bold: '300',
                    color: '#AEA495'
                },
                {
                    id: 4,
                    icon: 'check',
                    opacity: '0.3',
                    text: '完成預約',
                    bold: '300'
                },
            ],
            memName: '',
            memEmail: '',
            memPhone: '',
            otherRequirements: '',
        }
    },

    computed: {
        ...mapState(courseStore, ['checkoutSum']),
        sum() {
            return this.checkoutSum;
        },
    },

    methods: {
        ...mapActions(courseStore, ['loadCheckoutSum']),
    },

    mounted() {
        // 初始化會員資料
        this.memName = 'John Doe'
        this.memEmail = 'john.doe@example.com'
        this.memPhone = '0912345678'
        this.loadCheckoutSum();
    }
}
</script>

<style></style>