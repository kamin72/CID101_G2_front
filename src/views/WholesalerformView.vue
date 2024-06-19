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
                        <label>會員帳號</label>
                    </div>
                    <div class="form_box">
                        <input type="text" id="account" autocomplete="account" placeholder="請輸入帳號">
                    </div>
                </div>
                <!-- 會員密碼 -->
                <div class="form_ltem_list">
                    <div class="form_item">
                        <label>會員密碼</label>
                    </div>
                    <div class="form_box" style="position: relative;">
                        <input :type='pwdFlag ? "password" : "text"' id="password" autocomplete="password"
                            placeholder="請輸入密碼" minlength="8" required />
                        <span v-show="pwdFlag" @click="togglePassword" class="material-symbols-outlined"
                            style="font-size: 18px;position: absolute;">visibility_off </span>
                        <span v-show="!pwdFlag" @click="togglePassword" class="material-symbols-outlined"
                            style="font-size: 18px;position: absolute;">visibility</span>
                    </div>
                </div>
                <div class="form_ltem_list">
                    <div class="form_item">
                        <label>再輸入一次密碼</label>
                    </div>
                    <div class="form_box" style="position: relative;">
                        <input :type='pwdFlags ? "password" : "text"' id="password_check" autocomplete="password_check" placeholder="再輸入一次密碼">
                        <span v-show="pwdFlags" @click="togglePasswords" class="material-symbols-outlined"
                            style="font-size: 18px;position: absolute;">visibility_off </span>
                        <span v-show="!pwdFlags" @click="togglePasswords" class="material-symbols-outlined"
                            style="font-size: 18px;position: absolute;">visibility</span>
                    </div>
                </div>
                <div class="form_ltem_list">
                    <div class="form_item">
                        <label>姓名</label>
                    </div>
                    <div class="form_box">
                        <input type="text" id="name" placeholder="請輸入姓名">
                    </div>
                </div>
                <div class="form_ltem_list">
                    <div class="form_item">
                        <label>電話</label>
                    </div>
                    <div class="form_box">
                        <input type="tel" id="phone" placeholder="請輸入電話" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            required />
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
                        <input type="text" id="company_name" placeholder="請輸入公司名稱">
                    </div>
                </div>
                <div class="form_ltem_list">
                    <div class="form_item">
                        <label>公司統編</label>
                    </div>
                    <div class="form_box">
                        <input type="text" id="tax_id" placeholder="請輸入公司統編">
                    </div>
                </div>
                <div class="form_ltem_list">
                    <div class="form_item">
                        <label>地址</label>
                    </div>
                    <div class="form_box">
                        <input type="text" id="address" class="address" placeholder="請輸入地址">

                        <!-- 
                        考慮到是否有外國地址 以及資料表欄位只有address 由單一input比較好做
                        <select class="address-select" id="address">
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
                        <input type="text" class="s-input">室 -->
                    </div>
                </div>
                <div class="form_ltem_list" style="border: none;">
                    <div class="form_item">
                        <label>公司資料電子檔</label>
                    </div>
                    <div class="form_box">
                        <input type="file" id="file_path" accept="image/png, image/jpeg" />
                        <!-- 後台需新增file_path相對應的欄位 用來存取檔案路徑 -->
                    </div>
                </div>
                <div class="form_privacy_policy">
                    <input type="checkbox" id="privacy_policy">
                    <span>我同意隱私條款政策 [隱私條款政策]</span>
                </div>
                <RouterLink to="/wholesalerformok" style="text-decoration: none;">
                    <input type="submit" value="下一步" class="big-btn-primary" style="display: block;
                    margin: 10px auto;" />
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
            pwdFlag: true,
            pwdFlags: true,
            flow: [
                {
                    id: 1,
                    icon: 'receipt_long',
                    opacity: '1',
                    text: '填寫基本資料',
                    bold: '400',
                    color: '#AEA495'
                },
                {
                    id: 4,
                    icon: 'check',
                    opacity: '0.3',
                    text: '註冊完成',
                    bold: '0',
                    color: '#AEA495'
                }
            ]
        }
    },
    methods: {
        togglePassword() {
            this.pwdFlag = !this.pwdFlag;
        },
        togglePasswords() {
            this.pwdFlags = !this.pwdFlags;
        }
    }
}
</script>


<style></style>