<template>
    <section class="booking_flow">
        <CartFlow :flow="item" v-for="item in flow" :key="item.id" />
    </section>
    <section class="course-booking-section">
        <div class=" course-booking-container">
            <form class="col-9 col-md-10 col-sm-12 course-booking-form">
                <!-- 活動名稱 -->
                <div class="form_ltem_list">
                    <div class="form_item">
                        <label for="account">
                            <h4>活動名稱</h4>
                        </label>
                    </div>
                    <div class="form_box">
                        <p>{{ course.name }}</p>
                    </div>
                </div>

                <!-- 課程價格 -->
                <div class="form_ltem_list">
                    <div class="form_item">
                        <label for="password">
                            <h4>課程價格</h4>
                        </label>
                    </div>
                    <div class="form_box">
                        <p>NT. {{ course.price }}</p>
                    </div>
                </div>

                <!-- 折價券 -->
                <div class="form_ltem_list">
                    <div class="form_item">
                        <label for="password">
                            <h4>折價券</h4>
                        </label>
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
                        <label>
                            <h4>人數</h4>
                        </label>
                    </div>
                    <div class="form_box">
                        <div class="amount">
                            <button @click.prevent="reduce" class="material-symbols-outlined">remove</button>
                            <span class="num">
                                <p>{{ count }}</p>
                            </span>
                            <button @click.prevent="add" class="material-symbols-outlined">add</button>
                        </div>
                    </div>
                </div>

                <!-- 結帳金額 -->
                <div class="form_ltem_list">
                    <div class="form_item">
                        <label>
                            <h4>結帳金額</h4>
                        </label>
                    </div>
                    <div class="form_box">
                        <p>NT. {{ sum }}</p>
                    </div>
                </div>

                <!-- 姓名 -->
                <div class="form_ltem_list">
                    <div class="form_item">
                        <label>
                            <h4>姓名</h4>
                        </label>
                    </div>
                    <div class="form_box">
                        <p>{{ memName }}</p>
                    </div>
                </div>

                <!-- email -->
                <div class="form_ltem_list">
                    <div class="form_item">
                        <label>
                            <h4>email</h4>
                        </label>
                    </div>
                    <div class="form_box">
                        <p>{{ memEmail }}</p>
                    </div>
                </div>

                <!-- 電話號碼 -->
                <div class="form_ltem_list">
                    <div class="form_item">
                        <label>
                            <h4>電話號碼</h4>
                        </label>
                    </div>
                    <div class="form_box">
                        <p>{{ memPhone }}</p>
                    </div>
                </div>

                <!-- 其他需求 -->
                <div class="form_ltem_list" style="border: none;">
                    <div class="form_item">
                        <label>
                            <h4>其他需求</h4>
                        </label>
                    </div>
                    <div class="form_box">
                        <textarea id="email" placeholder="請輸入其他需求" maxlength="300" rows="10"
                            v-model="otherRequirements"></textarea>
                    </div>
                </div>
            </form>

            <div class="form_privacy_policy">
                <input type="checkbox" id="privacyPolicyCheckbox" v-model="isChecked">
                <label for="privacyPolicyCheckbox">
                    <p>我同意隱私條款政策 [隱私條款政策]</p>
                </label>
            </div>

            <RouterLink :to="`/courseBookingDetail_pay/${course.id}`" style="text-decoration: none;">
                <button :disabled="!isChecked"
                    :class="{ 'cursor-not-allowed': !isChecked, 'big-btn-primary': true, 'reserveCourse': true }"
                    class="big-btn-primary reserveCourse">
                    <span class="material-symbols-outlined">edit_calendar</span>預約課程
                </button>
            </RouterLink>
        </div>
    </section>
</template>

<script>
import CartFlow from '@/components/Cart/CartFlow.vue'
import { mapState, mapActions } from 'pinia';
import courseStore from '@/stores/course';

export default {
    props: {
        id: {
            type: [Number, String],
            required: true
        }
    },
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
            count: 0,
            sum: 0,
            memName: '',
            memEmail: '',
            memPhone: '',
            otherRequirements: '',
            isChecked: false,
        }
    },

    computed: {
        ...mapState(courseStore, ['specificCourse', 'allCourse']), // 使用 mapState 獲取 specificCourse
        course() {
            return this.specificCourse; // 定義 course 計算屬性返回 specificCourse
        },
    },

    methods: {
        ...mapActions(courseStore, ['getSpecificData', 'getData']),// 使用 mapActions 獲取 getSpecificData 方法
        add() {
            if (this.count == 10) return
            this.count++
            this.updateSum()
        },
        reduce() {
            if (this.count == 0) return
            this.count--
            this.updateSum()
        },
        updateSum() {
            this.sum = this.count * this.course.price
        }
    },

    mounted() {
        const courseId = this.$route.params.id; // 從路由參數獲取課程 ID
        this.getSpecificData(courseId); // 調用 getSpecificData 方法獲取特定課程資料
        this.getData()

        // 初始化會員資料
        this.memName = 'John Doe'
        this.memEmail = 'john.doe@example.com'
        this.memPhone = '0912345678'

        // 初始化結帳金額
        this.updateSum()
    },
    created() {
        // console.log(this.specificCourse)
    },
    watch: {
        '$route.params.id'() {
            const courseId = this.$route.params.id
            this.specificCourse = this.allCourse.find((course) => course.id == courseId)
        }
    },
}
</script>
