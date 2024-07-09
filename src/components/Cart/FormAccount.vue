<template>
  <form class="deliveryInfo" ref="form" @submit.prevent="submitOrder">
    <div class="column">
      <h3 class="title">填寫個人資料</h3>
      <div class="syn">
        <input type="checkbox" @change="syncMember" v-model="localChecked" />
        <p>同步會員資料到訂購人資訊</p>
      </div>
    </div>
    <div class="name">
      <p class="title" style="font-weight: 700">姓名</p>
      <input
        type="text"
        placeholder="請輸入姓名"
        id="name"
        :value="name"
        @input="$emit('update:name', $event.target.value)"
        required
        name="name"
      />
    </div>
    <div class="receiveAddress">
      <p class="title" style="font-weight: 700">收件地址</p>
      <input
        type="text"
        placeholder="請輸入收件地址"
        id="cartAddress"
        :value="address"
        @input="$emit('update:address', $event.target.value)"
        required
        name="address"
      />
    </div>
    <div class="phone">
      <p class="title" style="font-weight: 700">連絡電話</p>
      <input
        type="number"
        placeholder="請輸入連絡電話"
        id="cartPhone"
        :value="phone"
        @input="$emit('update:phone', $event.target.value)"
        required
        name="phone"
      />
    </div>
    <div class="email">
      <p class="title" style="font-weight: 700">Email</p>
      <input
        type="text"
        placeholder="請輸入email"
        id="cartEmail"
        :value="email"
        @input="$emit('update:email', $event.target.value)"
        required
        name="email"
      />
    </div>
    <input type="hidden" name="sum" :value="cartInfo.sum" />
    <input type="hidden" name="discount" :value="cartInfo.discount" />
    <input type="hidden" name="actualPaid" :value="cartInfo.actualPaid" />
  </form>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import memberStore from '@/stores/loginMember'
import cartStore from '@/stores/cart'

export default {
  props: {
    isChecked: Boolean,
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  emit: ['update:phone', 'update:email', 'update:address', 'update:name'],
  data() {
    return {
      localChecked: this.isChecked,
      cartInfo: {}
    }
  },
  computed: {
    ...mapState(memberStore, ['memberInfo', 'memberAccount']),
    ...mapState(cartStore, ['cart'])
  },
  methods: {
    ...mapActions(memberStore, ['getMemberData', 'fetchMemberData']),
    ...mapActions(cartStore, ['cleanCart']),
    syncMember() {
      this.$emit('isChecked', this.localChecked)
    },
    // submitOrder() {
    //   const formData = {
    //     name: this.name,
    //     address: this.address,
    //     phone: this.phone,
    //     email: this.email,
    //     sum: this.cartInfo?.sum,
    //     discount: this.cartInfo?.discount,
    //     actualPaid: this.cartInfo?.actualPaid
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

    //   fetch(url, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json' // 設定請求標頭，指定內容為JSON格式, 可省略
    //     },
    //     body: JSON.stringify(this.cart)
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       if (!data.error) {
    //         alert('商品成功存入資料庫')
    //       } else {
    //         alert('商品存入失敗')
    //       }
    //     })

    //   this.cleanCart()
    // },
    submitOrder() {
      const orderData = {
        name: this.name,
        address: this.address,
        phone: this.phone,
        email: this.email,
        sum: this.cartInfo?.sum,
        discount: this.cartInfo?.discount,
        actualPaid: this.cartInfo?.actualPaid,
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
    },
    getPriceData() {
      let storage = localStorage.getItem('cartPrice')
      if (storage) {
        this.cartInfo = JSON.parse(storage)
        // console.log(this.cartInfo)
      } else {
        return {}
      }
    }
  },
  mounted() {
    this.getPriceData()
  }
}
</script>
