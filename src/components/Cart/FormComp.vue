<template>
  <form class="deliveryInfo" ref="form" @submit.prevent="submitOrder">
    <div class="column">
      <h3 class="title">配送資訊</h3>
      <p class="title">(公司資訊如需更動請聯絡我們)</p>
    </div>
    <div class="name">
      <p class="title" style="font-weight: 700;">姓名</p>
      <p class="title">{{ memberComp?.[0]['name'] }}</p>
      <input type="hidden" name="name" :value="memberComp?.[0]['name']" />
    </div>
    <div class="compName">
      <p class="title" style="font-weight: 700;">公司名稱</p>
      <p class="title">{{ memberComp?.[0]['company_name'] }}</p>
    </div>
    <div class="receiveAddress">
      <p class="title" style="font-weight: 700;">收件地址</p>
      <p class="title">{{ memberComp?.[0]['address'] }}</p>
      <input type="hidden" name="address" :value="memberComp?.[0]['address']" />
    </div>
    <div class="phone">
      <p class="title" style="font-weight: 700;">連絡電話</p>
      <input type="text" placeholder="請輸入連絡電話" id="cartPhone_comp" :value="phone"
        @input="$emit('update:phone', $event.target.value)" required />
    </div>
    <div class="email">
      <p class="title" style="font-weight: 700;">Email</p>
      <input type="text" placeholder="請輸入email" id="cartEmail_comp" :value="email"
        @input="$emit('update:email', $event.target.value)" required />
    </div>
    <input type="hidden" name="sum" :value="cartInfo.sum" />
    <input type="hidden" name="discount" :value="cartInfo.discount" />
    <input type="hidden" name="actualPaid" :value="cartInfo.actualPaid" />
  </form>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import memberStore from '@/stores/loginMember'

export default {
  props: {
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  emit: ['update:phone', 'update:email'],
  data() {
    return {
      cartInfo: {}
    }
  },
  computed: {
    ...mapState(memberStore, ['memberInfo', 'memberComp'])
  },
  methods: {
    ...mapActions(memberStore, ['getMemberData', 'fetchMemberCompData', 'getMemberCompData']),
    submitOrder() {
      const formData = {
        name: this.memberComp?.[0].name,
        address: this.memberComp?.[0].address,
        phone: this.phone,
        email: this.email,
        sum: this.cartInfo?.sum,
        discount: this.cartInfo?.discount,
        actualPaid: this.cartInfo?.actualPaid
      }
      const form = new URLSearchParams(formData)
      const url = 'http://localhost/CID101_G2_php/front/cart/cartSubmit_account.php'

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: form
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert('訂單不成立')
            return
          } else {
            // console.log(data)
            alert('訂單建立成功')
          }
        })
      this.cleanCart()
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
  created() {
    this.fetchMemberCompData()
    this.getMemberCompData()
    // console.log(this.memberComp)
  },
  mounted() {
    this.getPriceData()
  },
}
</script>
