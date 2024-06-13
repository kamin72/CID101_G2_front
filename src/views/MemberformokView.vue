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
                    id: 2,
                    icon: 'check',
                    opacity: '0.3',
                    text: '註冊完成',
                    bold: '0'
                }
            ]
        }
    },
    mounted() {
    window.scrollTo(0, 0)
    }
}
</script>
<style>
.wrap_signup_finsh {
    text-align: center;
}

h3 {
    margin: 20px 0;
}
</style>