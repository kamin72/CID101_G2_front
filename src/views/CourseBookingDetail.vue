<template>
    <section v-if="!isMobile" class="booking_flow">
        <CartFlow :flow="item" v-for="item in flow" :key="item.id" />
    </section>
    <section v-else class="cartFlowRWD">
        <CartFlowRWD :flowRwd="itemRwd" v-for="itemRwd in flowRwd" :key="itemRwd.id" />
    </section>
    <section class="course-booking-section" v-if="course">
        <div class=" course-booking-container">
            <form class="col-9 col-md-10 col-sm-12 course-booking-form">
                <!-- 活動名稱 -->
                <div class="form_ltem_list">
                    <div class="form_item">
                        <div>
                            <h4>活動名稱</h4>
                        </div>
                    </div>
                    <div class="form_box">
                        <p>{{ course.course_name }}</p>
                    </div>
                </div>

                <!-- 課程價格 -->
                <div class="form_ltem_list">
                    <div class="form_item">
                        <div>
                            <h4>課程價格</h4>
                        </div>
                    </div>
                    <div class="form_box">
                        <p>NT. {{ course.course_price }}</p>
                    </div>
                </div>

                <!-- 折價券 -->
                <div class="form_ltem_list">
                    <div class="form_item">
                        <div>
                            <h4>折價券</h4>
                        </div>
                    </div>
                    <div class="form_box">
                        <select v-model="selectedDiscount">
                            <option value="">請選擇折價券</option>
                            <option v-for="discount in discounts" :key="discount.dis_got_serial"
                                :value="discount.dis_amount">
                                {{ discount.dis_name }}
                            </option>
                        </select>
                    </div>
                </div>

                <!-- 人數 -->
                <div class="form_ltem_list">
                    <div class="form_item">
                        <div>
                            <h4>人數</h4>
                        </div>
                    </div>
                    <div class="form_box">
                        <div class="amount">
                            <button @click.prevent="reduce" class="material-symbols-outlined">remove</button>
                            <span class="num">
                                <p>{{ participantCount }}</p>
                            </span>
                            <button @click.prevent="add" class="material-symbols-outlined">add</button>
                        </div>
                    </div>
                </div>

                <!-- 結帳金額 -->
                <div class="form_ltem_list">
                    <div class="form_item">
                        <h4>結帳金額</h4>
                    </div>
                    <div class="form_box">
                        <p :style="{ color: isSumZero ? 'red' : 'inherit' }">NT. {{ sum }}</p>
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
                        <textarea id="email" placeholder="請輸入其他需求" maxlength="300" rows="10"
                            v-model="otherRequirements">
                        </textarea>
                    </div>
                </div>
            </form>

            <div class="form_privacy_policy">
                <input type="checkbox" id="privacyPolicyCheckbox" v-model="isChecked">
                <div for="privacyPolicyCheckbox">
                    <p>我同意隱私條款政策 [隱私條款政策]</p>
                </div>
            </div>

            <RouterLink :to="'/courseBookingDetail_confirm/' + course.course_id" style="text-decoration: none;">
                <button :disabled="disabledButton"
                    :class="{ 'big-btn-invalid': disabledButton, 'big-btn-primary': false, 'reserveCourse': true }"
                    class="big-btn-primary  reserveCourse">
                    <span class="material-symbols-outlined">edit_calendar</span>預約課程
                </button>
            </RouterLink>
        </div>
    </section>
</template>

<script>
import CartFlow from '@/components/Cart/CartFlow.vue'
import CartFlowRWD from '@/components//Cart/CartFlowRWD.vue'
import { mapState, mapActions } from 'pinia'
import courseStore from '@/stores/course'
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
                    color: '#AEA495'
                },
                {
                    id: 2,
                    icon: 'checklist',
                    opacity: '0.3',
                    text: '確認預約資料',
                    bold: '300'
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
                    color: '#AEA495'
                },
                {
                    id: 2,
                    icon: 'checklist',
                    opacity: '0.3',
                    text: '確認預約資料',
                    bold: '300'
                }
            ],
            count: 1,
            isChecked: false,
            windowWidth: window.innerWidth,
            discounts: [], // 添加這個來存儲折扣券
            selectedDiscount: '', // 添加這個來存儲選擇的折扣券
            textContent: '',
        }
    },
    computed: {
        ...mapState(courseStore, ['specificCourse', 'participantCount', 'otherRequirements']),
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
        course() {
            return this.specificCourse || []; // 定義 course 計算屬性返回 specificCourse
        },
        sum() {
            if (this.selectedDiscount) {
                return this.participantCount * this.course.course_price - this.selectedDiscount
            } else {
                return this.participantCount * this.course.course_price
            }
        },
        isSumZero() {
            return this.sum <= 0
        },
        disabledButton() {
            return !this.isChecked || this.isSumZero
        },
        isMobile() {
            return this.windowWidth < 450
        },
    },
    methods: {
        ...mapActions(courseStore, ['setParticipantCount', 'getSpecificData', 'setCheckoutSum']),
        add() {
            if (this.participantCount < 10) {
                this.setParticipantCount(this.participantCount + 1);
            }
        },
        reduce() {
            if (this.participantCount > 1) {
                this.setParticipantCount(this.participantCount - 1);
            }
        },
        updateWindowWidth() {
            this.windowWidth = window.innerWidth
        },
        async fetchDiscounts() {
            try {
                const memberId = this.memberInfo?.[0]?.no;
                if (!memberId) {
                    console.error("會員 ID 不存在");
                    return;
                }
                const response = await fetch(`http://localhost/CID101_G2_php/front/getMemberCoupon.php?memberId=${memberId}`);
                const data = await response.json();
                if (data.error) {
                    throw new Error(data.message);
                }
                this.discounts = data.discounts;
                // console.log(this.discounts);

            } catch (error) {
                console.error("獲取折價券失敗:", error);
                // 可以在這裡添加用戶提示
            }
        },
    },
    async mounted() {
        memberStore().getMemberData();
        this.setCheckoutSum(this.sum);

        if (!this.memberInfo) {
            this.$router.push({ name: 'login' });
            return;
        };

        try {
            const courseId = this.$route.params.id;
            await Promise.all([
                this.getSpecificData(courseId),
                this.fetchDiscounts()
            ]);
        } catch (error) {
            console.error("Failed to fetch data:", error);
            // 考慮向用戶顯示錯誤消息
        };

        const savedDiscount = localStorage.getItem('selectedDiscount');
        if (savedDiscount) {
            this.selectedDiscount = JSON.parse(savedDiscount);
        }

        window.addEventListener('resize', this.updateWindowWidth);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.updateWindowWidth);
        // 可選：清理 localStorage
        localStorage.removeItem('otherRequirements');
    },
    watch: {
        '$route.params.id': {
            handler(newId) {
                this.getSpecificData(newId)
            },
            immediate: true
        },
        isSumZero: {
            handler(newValue) {
                if (newValue) {
                    alert("結帳金額不能夠為0");
                }
            }
        },
        participantCount: {
            handler(newValue) {
                this.setParticipantCount(newValue);
            }
        },
        selectedDiscount(newValue) {
            localStorage.setItem('selectedDiscount', newValue);
        },
    },

}
</script>
