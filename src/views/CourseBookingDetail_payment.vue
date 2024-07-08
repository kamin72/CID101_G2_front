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
            <!-- 要傳到資料庫的訂單資訊 -->
            <form ref="form" @submit.prevent="submitOrder">
                <input type="hidden" name="name" :value="this.memName" />
                <input type="hidden" name="phone" :value="this.memPhone" />
                <input type="hidden" name="email" :value="this.memEmail" />
                <input type="hidden" name="courseName" :value="this.course.course_name" />
                <input type="hidden" name="coursePrice" :value="this.course.course_price" />
                <input type="hidden" name="bookAmount" :value="this.participantCount" />
                <input type="hidden" name="disAmount" :value="this.discount" />
                <input type="hidden" name="bookPaidAmount" :value="this.sum" />
                <input type="hidden" name="bookOtherRequirements" :value="this.otherRequirements" />
            </form>
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
            discount: "",
            windowWidth: window.innerWidth,
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

        // 綠界付款用
        sendCardInfo() {
            // 創建一個包含表單數據的對象
            const formData = {
                TotalAmount: this.checkoutSum,
            }

            console.log(formData)

            alert(formData)

            // 創建一個隱藏的表單並提交
            const form = document.createElement('form')
            form.method = 'POST'
            form.action =
                'http://localhost/CID101_G2_php/front/SDK_PHP-master/example/Payment/Aio/CreateCreditOrder.php'

            for (const key in formData) {
                if (formData[key] !== null && formData[key] !== '') {
                    const input = document.createElement('input')
                    input.type = 'hidden'
                    input.name = key
                    input.value = formData[key]
                    form.appendChild(input)
                }
            }

            document.body.appendChild(form)
            form.submit()
        },
        submitOrder() {
            const orderData = {
                name: this.memName,
                phone: this.memPhone,
                email: this.memEmail,
                courseName: this.course.course_name,
                coursePrice: this.course.course_price,
                bookAmount: this.participantCount,
                disAmount: this.discount,
                bookPaidAmount: this.sum,
                bookOtherRequirements: this.otherRequirements,
            }

            console.log(orderData)

            alert(orderData)

            const url = 'http://localhost/CID101_G2_php/front/courseSubmit_account.php'

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('網絡響應不正常')
                    }
                    return response.json()
                })
                .then((data) => {
                    if (data.error) {
                        throw new Error(data.error)
                    }
                    alert('訂單建立成功')
                })
                .catch((error) => {
                    console.error('錯誤:', error)
                    alert('訂單提交失敗：' + error.message)
                })
        }
    },

    mounted() {
        memberStore().getMemberData();
        window.addEventListener('resize', this.updateWindowWidth)
        this.discount = localStorage.getItem('selectedDiscount')
        this.loadCheckoutSum()
    },

    beforeUnmount() {
        window.removeEventListener('resize', this.updateWindowWidth)
    },
}
</script>

<style></style>