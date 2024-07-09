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
                        <input type="text" v-model="account" id="account" @blur="validateAccount"
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
                        <input v-model="password" :type='pwdFlag ? "password" : "text"'
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
                        <input v-model="confirmPassword" :type='pwdFlag ? "password" : "text"'
                            id="confirm-password" autocomplete="current-password" @blur="validateConfirmPassword"
                            placeholder="再輸入一次密碼">
                        <span v-show="pwdFlags" @click="togglePasswords" class="material-symbols-outlined"
                            style="font-size: 18px;position: absolute;">visibility_off </span>
                        <span v-show="!pwdFlags" @click="togglePasswords" class="material-symbols-outlined"
                            style="font-size: 18px;position: absolute;">visibility</span>
                        <span v-if="errorMessages.passwordCheck" class="form-prompt">{{ errorMessages.passwordCheck
                            }}</span>
                    </div>
                </div>
                <!-- 姓名 -->
                <div class="form_item_list">
                    <div class="form_item">
                        <label>姓名</label>
                    </div>
                    <div class="form_box">
                        <input v-model="name" type="text" id="name" @blur="validateName" placeholder="請輸入姓名" />
                        <span v-if="errorMessages.name" class="form-prompt">{{ errorMessages.name }}</span>
                    </div>
                </div>
                <!-- 電話 -->
                <div class="form_item_list">
                    <div class="form_item">
                        <label>電話</label>
                    </div>
                    <div class="form_box">
                        <input v-model="phone" type="tel" id="phone" placeholder="請輸入電話" @blur="validatePhone">
                        <span v-if="errorMessages.phone" class="form-prompt">{{ errorMessages.phone }}</span>
                    </div>
                </div>
                <!-- Email -->
                <div class="form_item_list">
                    <div class="form_item">
                        <label>Email</label>
                    </div>
                    <div class="form_box">
                        <input v-model="email" type="email" id="email" placeholder="請輸入Email"
                            @blur="validateEmail" />
                        <span v-if="errorMessages.email" class="form-prompt">{{ errorMessages.email }}</span>
                    </div>
                </div>
                <!-- 批發商資訊 -->
                <div class="form_item_list">
                    <div class="form_item">
                        <label>公司名稱</label>
                    </div>
                    <div class="form_box">
                        <input v-model="companyName" type="text" id="company_name" @blur="validateCompanyName"
                            placeholder="請輸入公司名稱" />
                        <span v-if="errorMessages.companyName" class="form-prompt">{{ errorMessages.companyName
                            }}</span>
                    </div>
                </div>
                <div class="form_item_list">
                    <div class="form_item">
                        <label>公司統編</label>
                    </div>
                    <div class="form_box">
                        <input v-model="taxId" type="text" id="taxId" @blur="validateTaxId"
                            placeholder="請輸入公司統編" />
                        <span v-if="errorMessages.taxId" class="form-prompt">{{ errorMessages.taxId }}</span>
                    </div>
                </div>
                <div class="form_item_list">
                    <div class="form_item">
                        <label>地址</label>
                    </div>
                    <div class="form_box">
                        <input v-model="address" type="text" id="address" class="address"
                            @blur="validateAddress" placeholder="請輸入地址" />
                        <span v-if="errorMessages.address" class="form-prompt">{{ errorMessages.address }}</span>
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
            file: null,
            status:0,
            identity:2,

            isValidAccount: true,
            isValidPassword: true,
            isValidPhone: true,
            isValidEmail: true,
            isValidTaxId: true,
            isChecked: false,
            isValidName:true,
            isValidCompanyName:true,
            isValidAddress:true,
            
            isRegisted: false,
            isSuccessRegist: false,

            errorMessages: {
                account: '',
                password: '',
                passwordCheck: '',
                name: '',
                phone: '',
                email: '',
                companyName: '',
                taxId: '',
                address: '',
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
            this.isValidAccount = accountPattern.test(this.account)
            if (!this.isValidAccount) {
                this.errorMessages.account = this.isValidAccount ? '' : '帳號必須是字母或數字組成'
                this.account = ''
            } else {
                this.errorMessages.account = '';
            }
        },
        // 密碼正規判定
        validatePassword() {
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
            this.isValidPassword = passwordPattern.test(this.password)
            if (!this.isValidPassword) {
                this.errorMessages.password = this.isValidPassword
                    ? ''
                    : '密碼必須至少8個字符，包含至少一個大寫字母、一個小寫字母和一個數字'
            } else {
                this.errorMessages.password = '';
            }
        },
        // 再輸入一次密碼判定
        validateConfirmPassword() {
            this.isValidConfirmPassword = this.password === this.confirmPassword;
            if (!this.isValidConfirmPassword) {
                this.errorMessages.passwordCheck = '輸入的密碼不一致';
            } else {
                this.errorMessages.passwordCheck = '';
            }
        },
        // 姓名正規判定
        validateName() {
            const namePattern = /^(?!.*\d)(?=\S.*\S$)/;
            this.isValidName = namePattern.test(this.name);
            if (!this.isValidName) {
                this.errorMessages.name = '姓名不能為空或數字';
            } else {
                this.errorMessages.name = '';
            }
        },
        // 電話正規判定
        validatePhone() {
            const phonePattern = /^\d{10}$/
            this.isValidPhone = phonePattern.test(this.phone)
            if (!this.isValidPhone) {
                this.errorMessages.phone = this.isValidPhone ? '' : '電話號碼必須是10位數字'
            } else {
                this.errorMessages.phone = ''
            }
        },
        // Email正規判定
        validateEmail() {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            this.isValidEmail = emailPattern.test(this.email)
            if (!this.isValidEmail) {
                this.errorMessages.email = this.isValidEmail ? '' : '請輸入有效的電子郵件地址'
            } else {
                this.errorMessages.email = ''
            }
        },
        // 公司名稱正規判定
        validateCompanyName() {
            
            const companyNamePattern = /\S/;
            this.isValidCompanyName = companyNamePattern.test(this.companyName);
            if (!this.isValidCompanyName) {
                this.errorMessages.companyName = '地址不能為空';
            } else {
                this.errorMessages.companyName = '';
            }
        },
        // 公司統編正規判定
        validateTaxId() {
            const taxIdPattern = /^\d{8}$/;
            this.isValidTaxId = taxIdPattern.test(this.taxId)
            if (!this.isValidTaxId) {
                this.errorMessages.taxId = '公司統編需為8位數字';
            } else {
                this.errorMessages.taxId = '';
            }
        },
        // 公司地址正規判定
        validateAddress() {
            const addressPattern = /\S/;
            this.isValidAddress = addressPattern.test(this.address);
            if (!this.isValidAddress) {
                this.errorMessages.address = '地址不能為空';
            } else {
                this.errorMessages.address = '';
            }
        },
        // 文件檔案正規判定
        validateFile(event) {
            const file = event.target.files[0];
            if (!file || !['image/png', 'image/jpeg'].includes(file.type)) {
                alert('請上傳有效的圖片文件 (PNG或JPEG)');
            } else {
                this.file = file;
            }
        },
        // 提交的資料
        async WholesaleForm() {
            console.log('提交的表單資料:', {
                account: this.account,
                password: this.password,
                confirmPassword: this.confirmPassword,
                name: this.name,
                phone: this.phone,
                email: this.email,
                taxId: this.taxId,
                companyName: this.companyName,
                address: this.address,
                file: this.file,
            });
            // 表單驗證和提交的邏輯
            this.validateAccount();
            this.validatePassword();
            this.validateConfirmPassword();
            this.validateName();
            this.validatePhone();
            this.validateEmail();
            this.validateCompanyName();
            this.validateTaxId();
            this.validateAddress();

            if (
                this.isValidAccount &&
                this.isValidPassword &&
                this.isValidConfirmPassword &&
                this.isValidName &&
                this.isValidPhone &&
                this.isValidEmail &&
                this.isValidCompanyName &&
                this.isValidTaxId &&
                this.isValidAddress
            ) {
                // 發送 post 請求
                await this.getMember()
                if (this.isRegisted) {
                    alert('此帳號已註冊')
                } else {
                    await this.setWholesalerMember()
                    if (this.isSuccessRegist) {
                        alert('註冊成功')
                        window.location.href = '/wholesalerformok'
                    }
                }
            }
        },
        // 讀取批發商會員有沒有重複的帳號
        async getMember() {
            try {
                // fetch('http://localhost/CID101_G2_php/front/member/memberSignup.php'
                const formData = new URLSearchParams()
                formData.append('action', 'getMember')
                formData.append('account', this.account)
                const response = await fetch('http://localhost/CID101_G2_php/front/member/memberSignup.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData.toString()
                })
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }

                const data = await response.json()
                if (data['member'].length > 0) {
                this.isRegisted = true
                } else {
                this.isRegisted = false
                }
            } catch (error) {
                this.error = error
                console.error('There was a problem with the fetch operation:', error)
            } finally {
                this.loading = false
            }
        },
        // 建立批發商會員
        async setWholesalerMember() {
            try {
                const formData = new URLSearchParams()
                formData.append('action', 'setWholesalerMember')
                formData.append('account', this.account)
                formData.append('password', this.password)
                formData.append('name', this.name)
                formData.append('phone', this.phone)
                formData.append('email', this.email)
                formData.append('status', this.status); // 0:待審核 1: 正常 2: 停用
                formData.append('identity', this.identity); // 2 表示批發商
                formData.append('taxId', this.taxId); 
                formData.append('companyName', this.companyName); 
                formData.append('address', this.address); 
                // formData.append('file', this.file); 

                const response = await fetch('http://localhost/CID101_G2_php/front/member/memberSignup.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData.toString()
                })
                if (!response.ok) {
                throw new Error('Network response was not ok')
                }
                const data = await response.json()
                if (data['created'] === true) {
                this.isSuccessRegist = true
                }
            } catch (error) {
                this.error = 'There was a problem with the fetch operation: ' + error.message;
                console.error(this.error);
                // this.error = error
                // console.error('There was a problem with the fetch operation:', error)
            } finally {
                this.loading = false
            }
        }
    }
}
</script>

<style></style>
