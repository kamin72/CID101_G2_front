<template>
    <div class="container">
        <div class="wrap_signup">
            <section class="flow">
                <div class="circle" v-for="circle in flow" :key="circle.id">
                    <span class="material-symbols-outlined" :style="{ opacity: circle.opacity }">
                        {{ circle.icon }}
                    </span>
                </div>
                <div class="dot"></div>
            </section>
            <div class="wrap">
                <p class="text" v-for="p in wrap" :key="p.id" :style="{ opacity: p.opacity, fontWeight: p.bold }">
                    {{ p.text }}
                </p>
            </div>
            <from>
                <!-- 會員帳號 -->
                <div class="form_ltem_list">
                    <div class="form_item">
                        <label for="account">會員帳號</label>
                    </div>
                    <div class="form_box">
                        <input type="text" id="account" placeholder="請輸入帳號">
                    </div>
                </div>
                <!-- 會員密碼 -->
                <div class="form_ltem_list">
                    <div class="form_item">
                        <label for="password">會員密碼</label>
                    </div>
                    <div class="form_box">
                        <input type="password" id="password" placeholder="請輸入密碼">
                        <span class="material-symbols-outlined">visibility_off </span>
                    </div>
                </div>
                <!-- 再輸入一次密碼 -->
                <div class="form_ltem_list">
                    <div class="form_item">
                        <label for="password">再輸入一次密碼</label>
                    </div>
                    <div class="form_box">
                        <input type="text" id="password" placeholder="再輸入一次密碼">
                        <span class="material-symbols-outlined">visibility_off </span>
                    </div>
                </div>
                <!-- 姓名 -->
                <div class="form_ltem_list">
                    <div class="form_item">
                        <label>姓名</label>
                    </div>
                    <div class="form_box">
                        <input type="text" id="account" placeholder="請輸入姓名">
                    </div>
                </div>
                <!-- 電話 -->
                <div class="form_ltem_list">
                    <div class="form_item">
                        <label>電話</label>
                    </div>
                    <div class="form_box">
                        <input type="text" id="account" placeholder="請輸入電話">
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
            </from>
            <div class="form_privacy_policy">
                <input type="checkbox">
                <span>我同意隱私條款政策 [隱私條款政策]</span>
            </div>
            <input type="submit" value="下一步" class="big-btn-primary" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            flow: [
                {
                    id: 1,
                    icon: 'receipt_long',
                    opacity: '1'
                },
                {
                    id: 4,
                    icon: 'check',
                    opacity: '0.3'
                }
            ],
            wrap: [
                {
                    id: 1,
                    text: '填寫基本資料',
                    opacity: '1',
                    bold: '400'
                },
                {
                    id: 2,
                    text: '註冊完成',
                    opacity: '0.3',
                    bold: '0'
                },
            ]
        }
    }
}
</script>

<style>
.material-symbols-outlined {
    font-size: 16px;
    padding-top: 10px;
}
</style>