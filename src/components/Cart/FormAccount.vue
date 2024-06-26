<template>
  <form class="deliveryInfo" action="">
    <div class="column">
      <h3 class="title">填寫個人資料</h3>
      <div class="syn">
        <input type="checkbox" />
        <p>同步會員資料到訂購人資訊</p>
      </div>
    </div>
    <div class="name">
      <p class="title">姓名</p>
      <input type="text" placeholder="請輸入姓名" id="cartName" :value="name"
        @input="$emit('update:name', $event.target.value)" required />
    </div>
    <div class="receiveAddress">
      <p class="title">收件地址</p>
      <input type="text" placeholder="請輸入姓名" id="cartAddress" :value="address"
        @input="$emit('update:address', $event.target.value)" required />
    </div>
    <div class="phone">
      <p class="title">連絡電話</p>
      <input type="number" placeholder="請輸入連絡電話" id="cartPhone" :value="phone"
        @input="$emit('update:phone', $event.target.value)" required />
    </div>
    <div class="email">
      <p class="title">Email</p>
      <input type="text" placeholder="請輸入email" id="cartEmail" :value="email"
        @input="$emit('update:email', $event.target.value)" required />
    </div>
  </form>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import memberStore from '@/stores/loginMember'

export default {
  props: {
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
    return {}
  },
  computed: {
    ...mapState(memberStore, ['memberInfo', 'memberAccount']),
  },
  methods: {
    ...mapActions(memberStore, ['getMemberData', 'fetchMemberData']),
  },
  created() {
    this.getMemberData()
    this.fetchMemberData()
    console.log(this.memberInfo)
  },
}
</script>
