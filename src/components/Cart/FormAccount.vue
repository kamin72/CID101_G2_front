<template>
  <form class="deliveryInfo" action="">
    <div class="column">
      <h3 class="title">填寫個人資料</h3>
      <div class="syn">
        <input type="checkbox" @change="syncMember" v-model="localChecked" />
        <p>同步會員資料到訂購人資訊</p>
      </div>
    </div>
    <div class="name">
      <p class="title" style="font-weight: 700;">姓名</p>
      <input type="text" placeholder="請輸入姓名" id="cartName" :value="name"
        @input="$emit('update:name', $event.target.value)" required />
    </div>
    <div class="receiveAddress">
      <p class="title" style="font-weight: 700;">收件地址</p>
      <input type="text" placeholder="請輸入姓名" id="cartAddress" :value="address"
        @input="$emit('update:address', $event.target.value)" required />
    </div>
    <div class="phone">
      <p class="title" style="font-weight: 700;">連絡電話</p>
      <input type="number" placeholder="請輸入連絡電話" id="cartPhone" :value="phone"
        @input="$emit('update:phone', $event.target.value)" required />
    </div>
    <div class="email">
      <p class="title" style="font-weight: 700;">Email</p>
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
      localChecked: this.isChecked
    }
  },
  computed: {
    ...mapState(memberStore, ['memberInfo', 'memberAccount'])
  },
  methods: {
    ...mapActions(memberStore, ['getMemberData', 'fetchMemberData']),
    syncMember() {
      this.$emit('isChecked', this.localChecked)
    }
  }
}
</script>
