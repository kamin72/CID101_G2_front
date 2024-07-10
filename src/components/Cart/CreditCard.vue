<template>
  <div class="paidInfo">
    <div class="column">
      <h3 class="title">付款資訊</h3>
    </div>
    <form @submit.prevent="sendCardInfo">
      <div>
        <h4>商品名稱</h4>
        <p v-for="item in cart" :key="item.prod_id">{{ item.prod_name }} X {{ item.count }}</p>
        <input type="hidden" name="ItemName" v-model="productInfo" />
      </div>
      <div>
        <h4>應付金額</h4>
        <p>{{ cartPrice.actualPaid }}</p>
        <input type="hidden" name="TotalAmount" v-model="cartPrice.actualPaid" />
      </div>

      <!-- <div class="creditTerm">
      <small>
        本網站使用 SSL
        加密技術保護您的信用卡資訊，確保交易安全。請參閱我們的隱私權政策，了解我們如何收集、使用和保護您的個人資料。如果您有任何關於信用卡付款安全方面的疑問，請隨時聯繫我們的客服人員。
      </small>
    </div> -->
      <!-- <div class="cardNumber">
      <p>卡片號碼</p>
      <div class="cardNumber-input-wrap">
        <input type="number" placeholder="0000" v-model="cardNum1" />
        <span>-</span>
        <input type="number" placeholder="0000" v-model="cardNum2" />
        <span>-</span>
        <input type="number" placeholder="0000" v-model="cardNum3" />
        <span>-</span>
        <input type="number" placeholder="0000" v-model="cardNum4" />
      </div>
    </div>
    <div class="box">
      <div class="cardUser">
        <p>卡片持有人</p>
        <input type="number" placeholder="請輸入姓名" v-model="name" />
      </div>
      <div class="cardDate">
        <p>有效期限</p>
        <input type="text" placeholder="M/Y" v-model="expiryDate" />
      </div>
      <div class="cvv2">
        <p>CVV2</p>
        <input type="number" placeholder="請輸入安全碼" v-model="cvv2" />
      </div>
    </div> -->
      <button class="small-btn-primary" type="submit">前往付款</button>
    </form>
    <!-- 要傳到資料庫的訂單資訊 -->
    <form ref="form" @submit.prevent="submitOrder">
      <input type="hidden" name="name" :value="memberComp?.[0]['name']" />
      <input type="hidden" name="address" :value="memberComp?.[0]['address']" />
      <input type="hidden" name="phone" :value="memberComp?.[0]['phone']" />
      <input type="hidden" name="address" :value="memberComp?.[0]['email']" />
      <input type="hidden" name="sum" :value="cartPrice.sum" />
      <input type="hidden" name="discount" :value="cartPrice.discount" />
      <input type="hidden" name="actualPaid" :value="cartPrice.actualPaid" />
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import memberStore from '@/stores/loginMember'
import cartStore from '@/stores/cart'

export default {
  data() {
    return {
      MerchantTradeNo: null,
      TotalAmount: null,
      ItemName: '',
      productInfo: []
    }
  },
  methods: {
    ...mapActions(memberStore, ['fetchMemberCompData', 'getMemberCompData']),
    ...mapActions(cartStore, ['cleanCart']),
    sendCardInfo() {
      // 創建一個包含表單數據的對象
      const formData = {
        TotalAmount: this.cartPrice.actualPaid,
        ItemName: this.productInfo
      }

      // 創建一個隱藏的表單並提交
      const form = document.createElement('form')
      form.method = 'POST'
      form.action = `${import.meta.env.VITE_API_URL}/front/SDK_PHP-master/example/Payment/Aio/CreateCreditOrder.php`

      for (const key in formData) {
        if (formData[key] !== null && formData[key] !== '') {
          const input = document.createElement('input')
          input.type = 'hidden'
          input.name = key
          input.value = formData[key]
          form.appendChild(input)
        }
      }

      document.body.appendChild(form)
      form.submit()
    },
    getproductInfo() {
      this.productInfo = this.cart.map((item) => `${item.prod_name}X${item.count}`).join('#')
    },
    // submitOrder() {
    //   const formData = {
    //     name: this.memberComp?.[0].name,
    //     address: this.memberComp?.[0].address,
    //     phone: this.deliveryInfo_comp?.['phone'],
    //     email: this.deliveryInfo_comp?.['email'],
    //     sum: this.cartPrice?.sum,
    //     discount: this.cartPrice?.discount,
    //     actualPaid: this.cartPrice?.actualPaid
    //   }
    //   const form = new URLSearchParams(formData)
    //   const url = 'http://localhost/CID101_G2_php/front/cart/cartSubmit_account.php'

    //   fetch(url, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded'
    //     },
    //     body: form
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       if (data.error) {
    //         alert('訂單不成立')
    //         return
    //       } else {
    //         // console.log(data)
    //         alert('訂單建立成功')
    //       }
    //     })
    // }
    submitOrder() {
      const orderData = {
        name: this.memberComp?.[0]['name'],
        address: this.memberComp?.[0]['address'],
        phone: this.memberComp?.[0]['phone'],
        email: this.memberComp?.[0]['email'],
        sum: this.cartPrice.sum,
        discount: this.cartPrice.discount,
        actualPaid: this.cartPrice.actualPaid,
        cart: this.cart // 包含購物車信息
      }

      const url = `${import.meta.env.VITE_API_URL}/front/cart/cartSubmit_account.php`

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('網絡響應不正常')
          }
          return response.json()
        })
        .then((data) => {
          if (data.error) {
            throw new Error(data.error)
          }
          alert('訂單建立成功')
          this.cleanCart() // 只有在成功後才清空購物車
        })
        .catch((error) => {
          console.error('錯誤:', error)
          alert('訂單提交失敗：' + error.message)
        })
    }
  },
  computed: {
    ...mapState(memberStore, ['memberComp']),
    ...mapState(cartStore, ['cart']),

    cart() {
      return JSON.parse(localStorage.getItem('cart'))
    },
    cartPrice() {
      return JSON.parse(localStorage.getItem('cartPrice'))
    },
    deliveryInfo_comp() {
      return JSON.parse(localStorage.getItem('deliveryInfo_comp'))
    }
  },
  mounted() {
    this.getproductInfo()
    // console.log(this.productInfo)
  },
  created() {
    this.fetchMemberCompData()
    this.getMemberCompData()
    // console.log(this.memberComp)
  }
}
</script>
