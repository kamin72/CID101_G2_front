<template>
  <div class="box">
    <h4>優惠券</h4>
    <div class="usage">
      <select placeholder="輸入優惠碼" class="import" v-model="selectedDiscount">
        <option :value="item.dis_amount" v-for="(item, index) in coupon" :key="index">
          {{ item.dis_name }}
        </option>
        <option>不使用優惠券</option>
      </select>
      <button class="enter small-btn-primary" @click="applyDiscount">使用</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coupon: [],
      selectedDiscount: null
    }
  },
  methods: {
    getMemberDiscount() {
      const memberInfo = JSON.parse(localStorage.getItem('memberInfo'))
      const memberNo = memberInfo[0]?.no
      // console.log(memberNo)

      fetch(`http://localhost/CID101_G2_php/front/cart/getMemberDiscount.php?memberNo=${memberNo}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert(data.msg)
          } else {
            this.coupon = data.couponData
            localStorage.setItem('couponData', JSON.stringify(this.coupon))
            // console.log(this.coupon)
          }
        })
    },
    updateValue(e) {
      this.$emit('updateValue', e.target.value)
    },
    applyDiscount() {
      if (this.selectedDiscount) {
        this.$emit('update:discount', this.selectedDiscount)
      }
    }
  },
  mounted() {
    this.getMemberDiscount()
  }
}
</script>
