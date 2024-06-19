<template>
    <section>
        <div class="container">
            <div class="row">
                <section class="booking_flow">
                    <CartFlow :flow="item" v-for="item in flow" :key="item.id" />
                </section>
            </div>
        </div>
    </section>
    <section class="course-booking-section">
        <div class="course-booking-container">
            <form class="col-9 col-md-10 col-sm-12 course-booking-form">
                <!-- 活動名稱 -->
                <div class="form_ltem_list">
                    <div class="form_item">
                        <label for="account">
                            <h4>活動名稱</h4>
                        </label>
                    </div>
                    <div class="form_box">
                        <p>品酒體驗-初級課程1</p>
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
                        <p>NT. 3,200</p>
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
                        <div class="ppl-amount-btn-wrap">
                            <button @click="$emit('reduce')" class="ppl-amount-btn">-</button>
                            <span class="num">{{ item.count }}</span>
                            <button @click="$emit('add')" class="ppl-amount-btn">+</button>
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
                        <p>{{ sum }}</p>
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
                        <textarea id="email" placeholder="請輸入其他需求" maxlength="300" rows="10"></textarea>
                    </div>
                </div>
            </form>

            <div class="form_privacy_policy">
                <input type="checkbox">
                <span>我同意隱私條款政策 [隱私條款政策]</span>
            </div>

            <RouterLink to="/memberformok" style="text-decoration: none;">
                <input type="submit" value="下一步" class="big-btn-primary" style="display: block;
                margin: 10px auto;" />
            </RouterLink>
        </div>
    </section>
</template>

<script>
import CartFlow from '@/components/Cart/CartFlow.vue'

export default {
    components: {
        CartFlow,
    },
    data() {
        return {
            pwdFlag: true,
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
            ]
        }
    },
    methods: {
    }
}
</script>

<style></style>