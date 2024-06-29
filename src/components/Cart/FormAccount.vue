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

    <!-- <button @click.prevent="submitOrder">送出</button> -->
  </form>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import memberStore from '@/stores/loginMember'

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
    ...mapState(memberStore, ['memberInfo', 'memberAccount'])
  },
  methods: {
    ...mapActions(memberStore, ['getMemberData', 'fetchMemberData']),
    syncMember() {
      this.$emit('isChecked', this.localChecked)
    },
    submitOrder() {
      const formData = {
        name: this.name,
        address: this.address,
        phone: this.phone,
        email: this.email,
        sum: this.cartInfo?.sum,
        discount: this.cartInfo?.discount,
        actualPaid: this.cartInfo?.actualPaid
      }
      const form = new URLSearchParams(formData)
      const url = 'http://localhost/CID101_G2_php/front/cartSubmit_account.php'

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
          } else {
            // console.log(data)
            alert('訂單建立成功')
          }
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
