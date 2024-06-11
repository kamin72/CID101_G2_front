<template>
    <div class="container">
        <div class="wrap_signup">
            <section class="form_flow">
                <CartFlow :flow="item" v-for="item in flow" :key="item.id" />
            </section>
            <form>
                <!-- 會員帳號 -->
                <div class="form_ltem_list">
                    <div class="form_item">
                        <label for="account">會員帳號</label>
                    </div>
                    <div class="form_box">
                        <input type="text" id="account"  autocomplete="account" placeholder="請輸入帳號">
                    </div>
                </div>
                <!-- 會員密碼 -->
                <div class="form_ltem_list">
                    <div class="form_item">
                        <label for="password">會員密碼</label>
                    </div>
                    <div class="form_box">
                        <input type="password" id="password"  autocomplete="password" placeholder="請輸入密碼">
                        <span class="material-symbols-outlined">visibility_off </span>
                    </div>
                </div>
                <!-- 再輸入一次密碼 -->
                <div class="form_ltem_list">
                    <div class="form_item">
                        <label for="password">再輸入一次密碼</label>
                    </div>
                    <div class="form_box">
                        <input type="text" id="password_check" placeholder="再輸入一次密碼">
                        <span class="material-symbols-outlined">visibility_off </span>
                    </div>
                </div>
                <!-- 姓名 -->
                <div class="form_ltem_list">
                    <div class="form_item">
                        <label>姓名</label>
                    </div>
                    <div class="form_box">
                        <input type="text" id="name" placeholder="請輸入姓名">
                    </div>
                </div>
                <!-- 電話 -->
                <div class="form_ltem_list">
                    <div class="form_item">
                        <label>電話</label>
                    </div>
                    <div class="form_box">
                        <input type="text" id="phone" placeholder="請輸入電話">
                    </div>
                </div>
                <!-- Email -->
                <div class="form_ltem_list">
                    <div class="form_item">
                        <label>Email</label>
                    </div>
                    <div class="form_box">
                        <input type="email" id="email" placeholder="請輸入Email">
                    </div>
                </div>
                <div class="form_privacy_policy">
                    <input type="checkbox">
                    <span>我同意隱私條款政策 [隱私條款政策]</span>
                </div>
                <RouterLink to="/memberformok" style="text-decoration: none;"> 
                    <input type="submit" value="下一步" class="big-btn-primary" style="display: block;
                    margin: 10px auto;"/>
                </RouterLink>
            </form>
        </div>
    </div>
</template>

<script>
import CartFlow from '@/components/Cart/CartFlow.vue'

export default {
    components: {
        CartFlow,
    },
    data() {
        return {
            flow: [
                {
                    id: 1,
                    icon: 'receipt_long',
                    opacity: '1',
                    text: '填寫基本資料',
                    bold: '400'
                },
                {
                    id: 4,
                    icon: 'check',
                    opacity: '0.3',
                    text: '註冊完成',
                    bold: '0'
                }
            ]
        }
    }
}
</script>

<style></style>