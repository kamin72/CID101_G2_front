<template>
    <div class="container">
        <section class="form_flow">
            <CartFlow :flow="item" v-for="item in flow" :key="item.id" />
        </section>
        <div class="wrapFinish">
            <div class="finish">
                <div class="finishIcon">
                    <span class="material-symbols-outlined"> task_alt </span>
                    <h2>完成註冊</h2>
                </div>
                <h3>帳號審核需2-3個工作天，<br>
                    審核結果將會寄送至電子信箱，請留意信箱</h3>
                <h3>5 幾秒後跳轉至首頁......</h3>
            </div>
            <RouterLink to="/"> <button class="big-btn-primary">回首頁</button> </RouterLink>
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
<style>
.wrap_signup_finsh {
    text-align: center;
}
.finsh {
    display: flex;
    align-items: center;
    justify-content: center;
}

h3 {
    margin: 20px 0;
}
</style>