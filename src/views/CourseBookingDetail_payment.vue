<template>
    <section v-if="!isMobile" class="booking_flow">
        <CartFlow :flow="item" v-for="item in flow" :key="item.id" />
    </section>
    <section v-else class="cartFlowRWD">
        <CartFlowRWD :flowRwd="itemRwd" v-for="itemRwd in flowRwd" :key="itemRwd.id" />
    </section>
    <section class="course-booking-section">
        <div class="course-booking-container">
            <form @submit.prevent="submitForm" class="col-9 col-md-10 col-sm-12 course-booking-form">

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
                    <div class="form_box" style="display: flex; flex-direction: column; align-items: unset">
                        <div class="creditCardWrap1">
                            <p style="margin-left: 0px; margin-top: 0px;
                margin-bottom: 15px;">卡片號碼</p>
                            <div class="creditCardInput">
                                <input v-model="cardNumber1" type="text" placeholder="0000" required maxlength="4">
                                <p>-</p>
                                <input v-model="cardNumber2" type="text" placeholder="0000" required maxlength="4">
                                <p>-</p>
                                <input v-model="cardNumber3" type="text" placeholder="0000" required maxlength="4">
                                <p>-</p>
                                <input v-model="cardNumber4" type="text" placeholder="0000" required maxlength="4">
                            </div>
                        </div>
                        <br>
                        <div class="creditCardWrap2">
                            <div>
                                <p>卡片持有人</p>
                                <input v-model="cardHolder" type="text" placeholder="持卡人姓名" required>
                            </div>
                            <div>
                                <p>有效期限</p>
                                <input v-model="expiryDate" type="text" placeholder="MM/YY" required maxlength="5">
                            </div>
                            <div>
                                <p>CVV2</p>
                                <input v-model="cvv" type="text" placeholder="安全碼" required maxlength="3">
                            </div>
                        </div>

                    </div>
                </div>
                <div class="btn-wrap">
                    <RouterLink :to="'/courseBookingDetail_confirm/' + course.id" style="text-decoration: none;">
                        <button type="button" class="big-btn-secondary">
                            上一步
                        </button>
                    </RouterLink>
                    <button type="submit" class="big-btn-primary">
                        確認付款
                    </button>
                </div>

            </form>
        </div>
    </section>
</template>

<script>
import CartFlow from '@/components/Cart/CartFlow.vue'
import CartFlowRWD from '@/components//Cart/CartFlowRWD.vue'
import { mapState, mapActions } from 'pinia';
import courseStore from '@/stores/course';

export default {
    components: {
        CartFlow,
        CartFlowRWD
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
            flowRwd: [
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
                }
            ],
            cardNumber1: '',
            cardNumber2: '',
            cardNumber3: '',
            cardNumber4: '',
            cardHolder: '',
            expiryDate: '',
            cvv: '',
            windowWidth: window.innerWidth,
        }
    },

    computed: {
        ...mapState(courseStore, ['specificCourse', 'checkoutSum']),
        sum() {
            return this.checkoutSum;
        },
        course() {
            return this.specificCourse || [];
        },
        isMobile() {
            return this.windowWidth < 450
        },
    },

    methods: {
        ...mapActions(courseStore, ['loadCheckoutSum']),
        submitForm() {
            const validationResult = this.validateForm();
            if (validationResult === true) {
                // 如果表單驗證通過，可以進行提交操作
                console.log('表單提交成功');
                // 導航到完成頁面
                this.$router.push('/courseBookingDetail_finish/' + this.course.id);
            } else {
                // 顯示警告視窗，列出所有錯誤
                alert('請檢查並修正以下問題：\n\n' + validationResult.join('\n'));
            }
        },
        validateForm() {
            let errors = [];

            // 驗證卡號
            if (this.cardNumber1.length !== 4 || this.cardNumber2.length !== 4 ||
                this.cardNumber3.length !== 4 || this.cardNumber4.length !== 4) {
                errors.push('請確保所有卡號欄位都填寫了4位數字');
            }

            // 驗證持卡人姓名
            if (this.cardHolder.trim() === '') {
                errors.push('請填寫持卡人姓名');
            }

            // 驗證有效期限
            if (this.expiryDate.length !== 5 || !this.expiryDate.includes('/')) {
                errors.push('請以 MM/YY 格式填寫有效期限');
            }

            // 驗證 CVV
            if (this.cvv.length !== 3) {
                errors.push('請填寫3位數的 CVV 安全碼');
            }

            return errors.length === 0 ? true : errors;
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
        window.addEventListener('resize', this.updateWindowWidth)
    },

    beforeUnmount() {
        window.removeEventListener('resize', this.updateWindowWidth)
    },
}
</script>

<style></style>