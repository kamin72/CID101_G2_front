<template>
  <div class="box">
    <h4>付款方式</h4>
    <div class="methods">
      <div class="creditCard">
        <input type="radio" name="methods" @click="selectMethod(0)" :checked="checked == '0'" />
        <span class="material-symbols-outlined"> credit_card </span>
        <p>信用卡支付</p>
      </div>
      <div class="store">
        <input type="radio" name="methods" @click="selectMethod(1)" :checked="checked == '1'" />
        <span class="material-symbols-outlined"> storefront </span>
        <p>7-11貨到付款</p>
      </div>
      <div class="yardSelf">
        <input type="radio" name="methods" @click="selectMethod(2)" :checked="checked == '2'" />
        <span class="material-symbols-outlined"> liquor </span>
        <p>園區自取</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    checked: {
      type: String
    }
  },
  methods: {
    selectMethod(index) {
      this.$emit('change-method', index)
    }
  },
  mounted() {
    // this.$emit('change-method', this.checked)
  }
}
</script>
