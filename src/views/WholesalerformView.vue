<template>
    <div class="container">
        <div class="wrap_signup">
            <section>
                <CartFlow :flow="item" v-for="item in flow" :key="item.id" />
            </section>
            <form>
                <div class="form_ltem_list">
                    <div class="form_item">
                        <label>會員帳號</label>
                    </div>
                    <div class="form_box">
                        <input type="text" id="account" placeholder="請輸入帳號">
                    </div>
                </div>
                <div class="form_ltem_list">
                    <div class="form_item">
                        <label>會員密碼</label>
                    </div>
                    <div class="form_box">
                        <input type="password" id="pass" name="password" placeholder="請輸入密碼" minlength="8" required />
                        <span class="material-symbols-outlined">visibility_off </span>
                    </div>
                </div>
                <div class="form_ltem_list">
                    <div class="form_item">
                        <label>再輸入一次密碼</label>
                    </div>
                    <div class="form_box">
                        <input type="text" id="account" placeholder="再輸入一次密碼">
                        <span class="material-symbols-outlined">visibility_off </span>
                    </div>
                </div>
                <div class="form_ltem_list">
                    <div class="form_item">
                        <label>姓名</label>
                    </div>
                    <div class="form_box">
                        <input type="text" id="account" placeholder="請輸入姓名">
                    </div>
                </div>
                <div class="form_ltem_list">
                    <div class="form_item">
                        <label>電話</label>
                    </div>
                    <div class="form_box">
                        <input type="tel" id="phone" name="phone" placeholder="請輸入電話"
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required />
                    </div>
                </div>
                <div class="form_ltem_list">
                    <div class="form_item">
                        <label>Email</label>
                    </div>
                    <div class="form_box">
                        <input type="email" id="email" placeholder="請輸入Email" pattern=".+@example\.com" />
                    </div>
                </div>
                <!-- 批發商資訊 -->
                <div class="form_ltem_list">
                    <div class="form_item">
                        <label>公司名稱</label>
                    </div>
                    <div class="form_box">
                        <input type="text" id="account" placeholder="請輸入公司名稱">
                    </div>
                </div>
                <div class="form_ltem_list">
                    <div class="form_item">
                        <label>公司統編</label>
                    </div>
                    <div class="form_box">
                        <input type="text" id="account" placeholder="請輸入公司統編">
                    </div>
                </div>
                <div class="form_ltem_list">
                    <div class="form_item">
                        <label>地址</label>
                    </div>
                    <div class="form_box">
                        <select class="address-select" id="address" name="address">
                            <option value="disabled selected">縣市</option>
                            <option value="台北市">台北市</option>
                            <option value="新北市">新北市</option>
                            <option value="桃園市">桃園市</option>
                            <option value="台中市">台中市</option>
                            <option value="台南市">台南市</option>
                            <option value="高雄市">高雄市</option>
                            <option value="基隆市">基隆市</option>
                            <option value="新竹市">新竹市</option>
                            <option value="嘉義市">嘉義市</option>
                            <option value="新竹縣">新竹縣</option>
                            <option value="苗栗縣">苗栗縣</option>
                            <option value="彰化縣">彰化縣</option>
                            <option value="南投縣">南投縣</option>
                            <option value="雲林縣">雲林縣</option>
                            <option value="嘉義縣">嘉義縣</option>
                            <option value="屏東縣">屏東縣</option>
                            <option value="宜蘭縣">宜蘭縣</option>
                            <option value="花蓮縣">花蓮縣</option>
                            <option value="台東縣">台東縣</option>
                        </select>
                        <select id="address" name="address" class="address-select">
                            <option value="鄉鎮" disabled selected>鄉鎮</option>
                        </select>
                        <select id="address" name="address" class="address-select">
                            <option value="路段" disabled selected>路段</option>
                        </select>
                        <input type="text" class="s-input">巷
                        <input type="text" class="s-input">弄
                        <input type="text" class="s-input">號之
                        <input type="text" class="s-input">樓之
                        <input type="text" class="s-input">室
                    </div>
                </div>
                <div class="form_ltem_list">
                    <div class="form_item">
                        <label>公司資料電子檔</label>
                    </div>
                    <div class="form_box">
                        <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
                    </div>
                </div>
            </form>
            <div class="form_privacy_policy">
                <input type="checkbox">
                <span>我同意隱私條款政策 [隱私條款政策]</span>
            </div>
            <RouterLink to="/wholesalerformok"> 
                <input type="submit" value="下一步" class="big-btn-primary" />
            </RouterLink>
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
.big-btn-primary {
    margin: 10px 0;
}

.material-symbols-outlined {
    font-size: 16px;
    padding-top: 10px;
}
</style>