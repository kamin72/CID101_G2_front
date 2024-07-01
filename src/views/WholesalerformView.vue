<template>
    <div class="signup_container">
        <div class="wrap_signup">
            <section class="form_flow">
                <CartFlow :flow="item" v-for="item in flow" :key="item.id" />
            </section>
            <!-- 批發商會員註冊表單 -->
            <form @submit.prevent="WholesaleForm">
                <!-- 會員帳號 -->
                <div class="form_item_list">
                    <div class="form_item">
                        <label>會員帳號</label>
                    </div>
                    <div class="form_box">
                        <input type="text" v-model="formData.account" id="wholesaler-account" @blur="validateAccount"
                            autocomplete="account" placeholder="請輸入帳號">
                        <span v-if="errorMessages.account" class="form-prompt">{{
                            errorMessages.account
                        }}</span>
                    </div>
                </div>
                <!-- 會員密碼 -->
                <div class="form_item_list">
                    <div class="form_item">
                        <label>會員密碼</label>
                    </div>
                    <div class="form_box">
                        <input v-model="formData.password" :type='pwdFlag ? "password" : "text"'
                            id="wholesaler-password" autocomplete="password" @blur="validatePassword"
                            placeholder="請輸入密碼" />
                        <span v-show="pwdFlag" @click="togglePassword" class="material-symbols-outlined"
                            style="font-size: 18px;position: absolute;">visibility_off </span>
                        <span v-show="!pwdFlag" @click="togglePassword" class="material-symbols-outlined"
                            style="font-size: 18px;position: absolute;">visibility</span>
                        <span v-if="errorMessages.password" class="form-prompt">{{
                            errorMessages.password
                            }}</span>

                    </div>
                </div>
                <!-- 再輸入一次密碼 -->
                <div class="form_item_list">
                    <div class="form_item">
                        <label>再輸入一次密碼</label>
                    </div>
                    <div class="form_box" style="position: relative;">
                        <input v-model="formData.confirmPassword" :type='pwdFlags ? "password" : "text"'
                            id="confirm-password" autocomplete="current-password" @blur="validateConfirmPassword"
                            placeholder="再輸入一次密碼">
                        <span v-show="pwdFlags" @click="togglePasswords" class="material-symbols-outlined"
                            style="font-size: 18px;position: absolute;">visibility_off </span>
                        <span v-show="!pwdFlags" @click="togglePasswords" class="material-symbols-outlined"
                            style="font-size: 18px;position: absolute;">visibility</span>
                        <span v-if="errorMessages.passwordCheck" class="form-prompt">{{
                            errorMessages.passwordCheck
                        }}</span>
                    </div>
                </div>
                <!-- 姓名 -->
                <div class="form_item_list">
                    <div class="form_item">
                        <label>姓名</label>
                    </div>
                    <div class="form_box">
                        <input v-model="formData.name" type="text" id="name" @blur="validateName" placeholder="請輸入姓名">
                        <span v-if="errorMessages.name" class="form-prompt">{{ errorMessages.name }}</span>
                    </div>
                </div>
                <!-- 電話 -->
                <div class="form_item_list">
                    <div class="form_item">
                        <label>電話</label>
                    </div>
                    <div class="form_box">
                        <input v-model="formData.phone" type="tel" id="phone" placeholder="請輸入電話" @blur="validatePhone">
                        <span v-if="errorMessages.phone" class="form-prompt">{{ errorMessages.phone }}</span>
                    </div>
                </div>
                <!-- Email -->
                <div class="form_item_list">
                    <div class="form_item">
                        <label>Email</label>
                    </div>
                    <div class="form_box">
                        <input v-model="formData.email" type="email" id="email" placeholder="請輸入Email"
                            @blur="validateEmail" pattern=".+@example\.com" />
                        <span v-if="errorMessages.email" class="form-prompt">{{ errorMessages.email }}</span>
                    </div>
                </div>
                <!-- 批發商資訊 -->
                <div class="form_item_list">
                    <div class="form_item">
                        <label>公司名稱</label>
                    </div>
                    <div class="form_box">
                        <input v-model="formData.companyName" type="text" id="company_name" @blur="validateName"
                            placeholder="請輸入公司名稱">
                        <span v-if="errorMessages.companyname" class="form-prompt">{{ errorMessages.companyname }}</span>
                    </div>
                </div>
                <div class="form_item_list">
                    <div class="form_item">
                        <label>公司統編</label>
                    </div>
                    <div class="form_box">
                        <input v-model="formData.taxId" type="text" id="taxId" @blur="validateTaxId"
                            placeholder="請輸入公司統編">
                            <span v-if="errorMessages.companytaxId" class="form-prompt">{{ errorMessages.taxId }}</span>
                    </div>
                </div>
                <div class="form_item_list">
                    <div class="form_item">
                        <label>地址</label>
                    </div>
                    <div class="form_box">
                        <input v-model="formData.address" type="text" id="address" class="address" placeholder="請輸入地址">
                    </div>
                </div>
                <div class="form_item_list" style="border: none;">
                    <div class="form_item">
                        <label>公司資料電子檔</label>
                    </div>
                    <div class="form_box">
                        <input type="file" id="file_path" accept="image/png, image/jpeg" />
                        <!-- 後台需新增file_path相對應的欄位 用來存取檔案路徑 -->
                    </div>
                </div>
                <div class="form_privacy_policy">
                    <input type="checkbox" v-model="isChecked" id="privacy_policy">
                    <span style="margin: 0 5px;">我同意隱私條款政策 [隱私條款政策]</span>
                </div>
                <input type="submit" :disabled="!isChecked" value="下一步" class="big-btn-primary"
                    style="display: block;margin: 10px auto;" />
            </form>
        </div>
    </div>
</template>

<script>
import CartFlow from '@/components/Cart/CartFlow.vue'

export default {
    components: {
        CartFlow
    },
    data() {
        return {
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
            ],
            pwdFlag: true,
            pwdFlags: true,
            pwdFlag: true,
            pwdFlags: true,
            formData: {
                account: '',
                password: '',
                confirmPassword: '',
                name: '',
                phone: '',
                email: '',
                companyName: '',
                taxId: '',
                address: '',
                filePath: '',
                file: null
            },
            isValidAccount: true,
            isValidPassword: true,
            isValidPhone: true,
            isValidEmail: true,
            isValidTaxId: true,
            isChecked: false,
            errorMessages: {
                account: '',
                password: '',
                passwordCheck: '',
                name: '',
                phone: '',
                email: '',
            },
        }
    },
    methods: {
        // 切換密碼可見性
        togglePassword() {
            this.pwdFlag = !this.pwdFlag
        },
        togglePasswords() {
            this.pwdFlags = !this.pwdFlags
        },
        // 帳號正規判定
        validateAccount() {
            const accountPattern = /^[a-zA-Z0-9]+$/
            this.isValidAccount = accountPattern.test(this.formData.account)
            if (!this.isValidAccount) {
                this.errorMessages.account = this.isValidAccount ? '' : '帳號必須是字母或數字組成'
                this.account = ''
            } else {
                this.errorMessages.account = '';
                this.isValidAccount = true
            }
        },
        // 密碼正規判定
        validatePassword() {
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
            this.isValidPassword = passwordPattern.test(this.formData.password)
            if (!this.isValidPassword) {
                this.errorMessages.password = this.isValidPassword
                    ? ''
                    : '密碼必須至少8個字符，包含至少一個大寫字母、一個小寫字母和一個數字'
            } else {
                this.errorMessages.password = '';
                this.isValidPassword = true
            }
        },
        // 再輸入一次密碼判定
        validateConfirmPassword() {
            if (this.formData.password !== this.formData.confirmPassword) {
                this.errorMessages.passwordCheck = this.isValidPasswordCheck ? '' : '輸入的密碼不一致'
            } else {
                this.errorMessages.passwordCheck = ''
                this.isValidPasswordCheck = true
            }
        },
        // 姓名正規判定
        validateName() {
            this.isValidName = this.name.trim() !== ''
            this.errorMessages.name = this.isValidName ? '' : '姓名不可為空'
        },
        // 電話正規判定
        validatePhone() {
            const phonePattern = /^\d{10}$/
            this.isValidPhone = phonePattern.test(this.formData.phone)
            if (!this.isValidPhone) {
                this.errorMessages.phone = this.isValidPhone ? '' : '電話號碼必須是10位數字'
            } else {
                this.isValidPhone = true
            }
        },
        // Email正規判定
        validateEmail() {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            this.isValidEmail = emailPattern.test(this.formData.email)
            if (!this.isValidEmail) {
                this.errorMessages.email = this.isValidEmail ? '' : '請輸入有效的電子郵件地址'
            } else {
                this.errorMessages.email = ''
                this.isValidEmail = true
            }
        },
        // 公司統編正規判定
        validateTaxId() {
            const taxIdPattern = /^\d{8}$/
            this.isValidTaxId = taxIdPattern.test(this.formData.taxId)
            if (!this.isValidTaxId) {
                this.errorMessages.taxId = this.isValidtaxId ? '' : '請輸入有效的統編，必須是8位數字'
            } else {
                this.errorMessages.taxId = '';
                this.isValidTaxId = true
            }
        },
        // 公司地址正規判定
        // methods: {
        //     validateAddress() {
        //         const addressPattern = /^[a-zA-Z0-9\s\-\.,#]+$/;
        //         this.isValidAddress = addressPattern.test(this.formData.address);
        //         if (!this.isValidAddress) {
        //             alert('請輸入有效的地址');
        //         }
        //     }
        // },
        // 文件檔案正規判定
        validateFile(event) {
            const file = event.target.files[0];
            if (!file || !['image/png', 'image/jpeg'].includes(file.type)) {
                alert('請上傳有效的圖片文件 (PNG或JPEG)');
            } else {
                this.formData.file = file;
            }
        },
        // 提交的資料
        WholesaleForm() {
            this.validateAccount();
            this.validatePassword();
            this.validateConfirmPassword();
            this.validatePhone();
            this.validateEmail();
            this.validateTaxId();

            if (
                this.isValidAccount &&
                this.isValidPassword &&
                this.formData.password === this.formData.confirmPassword &&
                this.isValidPhone &&
                this.isValidEmail &&
                this.isValidTaxId
            ) {
                // 提交表單
                alert('表單提交成功');
                window.location.href = '/memberformok'
            } else {
                alert('請修正表單中的錯誤');
            }
        }
    }
}
</script>

<style></style>
