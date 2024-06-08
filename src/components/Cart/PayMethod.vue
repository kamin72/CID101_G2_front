<template>
  <div class="box">
    <h4>付款方式</h4>
    <div class="methods">
      <div class="creditCard">
        <input type="radio" name="methods" @click="creditCard" />
        <span class="material-symbols-outlined"> credit_card </span>
        <p>信用卡支付</p>
      </div>
      <div class="store">
        <input type="radio" name="methods" @click="store" />
        <span class="material-symbols-outlined"> storefront </span>
        <p>7-11貨到付款</p>
      </div>
      <div class="yardSelf">
        <input type="radio" name="methods" @click="yardSelf" />
        <span class="material-symbols-outlined"> liquor </span>
        <p>園區自取</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['yardSelf', 'store', 'creditCard']
}
</script>
