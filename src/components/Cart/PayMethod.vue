<template>
  <div class="box">
    <h4>付款方式</h4>
    <div class="methods">
      <div class="creditCard" :class="{ clicked: selectedMethod == 0 }">
        <input type="radio" name="methods" @click="selectMethod(0)" :checked="paymethod_checked == '0'" />
        <span class="material-symbols-outlined"> credit_card </span>
        <p>信用卡支付</p>
      </div>
      <div class="store" :class="{ clicked: selectedMethod == 1 }">
        <input type="radio" name="methods" @click="selectMethod(1)" :checked="paymethod_checked == '1'" />
        <span class="material-symbols-outlined"> storefront </span>
        <p>7-11貨到付款</p>
      </div>
      <div class="yardSelf" :class="{ clicked: selectedMethod == 2 }">
        <input type="radio" name="methods" @click="selectMethod(2)" :checked="paymethod_checked == '2'" />
        <span class="material-symbols-outlined"> liquor </span>
        <p>園區自取</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedMethod: null,
      paymethod_checked: null
    }
  },
  // props: {
  //   checked: {
  //     type: String
  //   }
  // },
  methods: {
    selectMethod(index) {
      this.selectedMethod = index;
      this.checked = index
      this.$emit('change-method', index)

      localStorage.setItem('selectedMethod', index)
      localStorage.setItem('paymethod_checked', index)

    }
  },
  mounted() {
    // 初始化選中狀態
    // this.selectedMethod = parseInt(this.checked);
    this.selectedMethod = localStorage.getItem('selectedMethod')
    this.paymethod_checked = localStorage.getItem('paymethod_checked')
  },

}
</script>
