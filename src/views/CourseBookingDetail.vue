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
                        <select>
                            <option value="0">請選擇折價券</option>
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
import { mapState, mapActions } from 'pinia';
import courseStore from '@/stores/course';
import memberStore from '@/stores/loginMember';

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
            memName: '',
            memEmail: '',
            memPhone: '',
            otherRequirements: '',
            isChecked: false,
            windowWidth: window.innerWidth,
        }
    },
    computed: {
        ...mapState(courseStore, ['specificCourse', 'otherRequirements', 'participantCount']),
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
            return this.participantCount * this.course.price
        },
        isSumZero() {
            return this.sum <= 0
        },
        disabledButton() {
            return !this.isChecked || this.isSumZero
        },
        isMobile() {
            return this.windowWidth < 450
        }
    },
    methods: {
        ...mapActions(courseStore, ['setOtherRequirements', 'setParticipantCount', 'getSpecificData', 'setCheckoutSum']), // 使用 mapActions 獲取 getSpecificData 方法
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
    },
    async mounted() {
        // 確保會員資料已加載
        memberStore().getMemberData();

        // 如果會員未登入，重定向到登入頁面
        if (!this.memberInfo) {
            this.$router.push({ name: 'login' });
            return;
        }

        try {
            const courseId = this.$route.params.id
            this.getSpecificData(courseId)
            // 确保数据加载完成后更新结算金额
        } catch (error) {
            console.error("Failed to fetch specific course data:", error)
        };
        window.addEventListener('resize', this.updateWindowWidth);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.updateWindowWidth)
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
        sum: {
            handler(newSum) {
                this.setCheckoutSum(newSum);
            },
            immediate: true
        },
        otherRequirements: {
            handler(newValue) {
                this.setOtherRequirements(newValue);
            }
        },
        participantCount: {
            handler(newValue) {
                this.setParticipantCount(newValue);
            }
        }
    }
}
</script>
