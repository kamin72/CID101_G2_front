<template>
    <div class="details-container">
        <div class="row">
            <small class="col-12 scrumble">
                <span class="frontPage-bread">
                    <RouterLink to="/">首頁</RouterLink>
                </span>
                <span class="material-symbols-outlined">arrow_forward_ios</span>
                <span class="frontPage-bread">
                    <RouterLink to="/membercenter">會員中心</RouterLink>
                </span>
                <span class="material-symbols-outlined">arrow_forward_ios</span>
                <span class="frontPage-bread">
                    <RouterLink to="/memberorderhistory">訂單紀錄</RouterLink>
                </span>
                <span class="material-symbols-outlined">arrow_forward_ios</span>
                查看詳情
            </small>
        </div>
        <!-- 會員中心導覽列 -->
        <div class="center_menu">
            <RouterLink to="/membercenter" style="text-decoration: none;">
                <button :class="buttonClass" style="display: inline; margin: 0 2px;">會員資料</button>
            </RouterLink>
            <RouterLink to="/memberorderhistory" style="text-decoration: none;">
                <button :class="secondaryButtonClass" style="display: inline; margin: 0 2px;">訂單紀錄</button>
            </RouterLink>
            <RouterLink to="/bookinghistory" style="text-decoration: none;">
                <button :class="buttonClass" style="display: inline; margin: 0 2px;">預約紀錄</button>
            </RouterLink>
            <RouterLink to="/discounthistory" style="text-decoration: none;">
                <button :class="buttonClass" style="display: inline; margin: 0 2px;">優惠券紀錄</button>
            </RouterLink>

        </div>
        <!-- 訂單紀錄查閱 -->
        <div class="wrap_details" v-if="carts_detail">
            <h4>訂單紀錄詳情</h4>
            <div class="details_list">
                <p>訂單編號</p>
                <!-- <p>2024xxxxxxxx</p> -->
                <p> {{ carts_detail.cart_id }}</p>
            </div>
            <div class="details_list">
                <p>訂單日期</p>
                <!-- <p>2024-02-29</p> -->
                <p> {{ carts_detail.build_date }} </p>
            </div>
            <div class="details_list">
                <p>姓名</p>
                <!-- <p>王陽明</p> -->
                <p>{{ carts_detail.accountName }}</p>
            </div>
            <div class="details_list">
                <p>電話</p>
                <!-- <p>0912345678</p> -->
                <p>{{ carts_detail.phone }}</p>
            </div>
            <div class="details_list">
                <p>Email</p>
                <!-- <p>abc123@email.com</p> -->
                <p>{{ carts_detail.email }}</p>
            </div>
            <div class="details_list">
                <p>總金額</p>
                <!-- <p>NT.2,500</p> -->
                <p>{{ carts_detail.cart_paidamount }}</p>

            </div>
            <div class="details_list" style="border: none">
                <p>訂單狀態</p>
                <!-- <p>已完成</p> -->
                <p>{{ carts_detail.cart_status }}</p>
            </div>
            <div class="product_details" style="background-color: #F8F5F2; border: none;">
                <p>商品名稱</p>
                <p>單價</p>
                <p>數量</p>
                <p>合計</p>
            </div>
            <div class="product_details">
                <!-- <p>俄勒岡之光紅酒 1997 </p>
                <p>NT. 2,500</p>
                <p>1</p>
                <p>NT. 2,500</p> -->
                <p> {{ carts_detail.prod_name }} </p>
                <p> {{ carts_detail.prod_price }} </p>
                <p> {{ carts_detail.amount }} </p>
                <p> {{ carts_detail.cart_paidamount }} </p>
            </div>
            <div class="product_price">
                <p>總價 </p>
                <!-- <p>NT.2,500</p> -->
                <p>{{ carts_detail.cart_paidamount }} </p>
            </div>
            <div class="product_price" style="border-bottom: 1px solid #000000;">
                <p>折扣 </p>
                <!-- <p>NT.0</p> -->
                <p>{{ carts_detail.cart_discount }} </p>
            </div>
            <div class="product_price">
                <p>總金額 </p>
                <!-- <p>NT.2,500</p> -->
                <p>{{ carts_detail.cart_payableamount }} </p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import memberStore from '@/stores/loginMember'

export default {
    data() {
        return {
            carts_detail: {},
            carts: [],
            windowWidth: window.innerWidth,
        };
    },
    computed: {
        ...mapState(memberStore, ['memberInfo', 'accountName', 'isNormalAccount']),
        buttonClass() {
            return this.windowWidth < 996 ? 'small-btn-primary' : 'big-btn-primary';
        },
        secondaryButtonClass() {
            return this.windowWidth < 996 ? 'small-btn-secondary' : 'big-btn-secondary';
        }
    },
    watch: {
        '$route.params.id': {
            handler(cartId) {
                this.fetchcarts(cartId);
            },
            immediate: true,
        }
    },
    // watch: {
    //     carts() {
    //         const cartId = this.$route.params.id // 從路由參數中獲取產品 ID
    //         // console.log(this.carts)
    //         this.carts_detail = this.carts.find((cart) => cart.cart_id === Number(cartId)) || {}  // 根據 ID 找到對應的產品詳情
    //     },
    //     '$route.params.id': {
    //         handler() {
    //             const cartId = this.$route.params.id // 從路由參數中獲取產品 ID
    //             console.log(this.carts)
    //             this.carts_detail = this.carts.find((cart) => cart.cart_id === Number(cartId)) || {} // 根據 ID 找到對應的產品詳情
    //             this.fetchcarts(cartId);
    //         },
    //         immediate: true
    //     },
    // },
    methods: {
        async fetchcarts() {
            const cartId = this.$route.params.id;
            // const response = await fetch(
            //     'http://localhost/CID101_G2_php/front/memberorderhistory/getCart.php',    

            const response = await fetch(`${import.meta.env.VITE_API_URL}/front/memberorderhistory/getCartDetail.php?cartId=${cartId}`
            )
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            const data = await response.json()
            // alert(data['carts'].length);
            if (!data.error) {
                this.carts = data['carts']
                console.log(this.carts)
            } else {
                alert('無相關資料')
            }
        },
        mounted() {
            const cartId = this.$route.params.id;
            this.fetchcarts();
            window.addEventListener('resize', this.updateWindowWidth);
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.updateWindowWidth);
        }
    }
}
</script>

<style></style>
