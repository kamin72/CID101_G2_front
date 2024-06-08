<template>
  <div class="deliveryInfo">
    <div class="column">
      <h3 class="title">填寫個人資料</h3>
      <div class="syn">
        <input type="checkbox" />
        <p>同步會員資料到訂購人資訊</p>
      </div>
    </div>
    <div class="name">
      <p class="title">姓名</p>
      <input type="text" placeholder="請輸入姓名" id="cartName" />
    </div>
    <div class="receiveAddress">
      <p class="title">收件地址</p>
      <input type="text" placeholder="請輸入姓名" id="cartAddress" />
    </div>
    <div class="phone">
      <p class="title">連絡電話</p>
      <input type="number" placeholder="請輸入連絡電話" id="cartPhone" />
    </div>
    <div class="email">
      <p class="title">Email</p>
      <input type="text" placeholder="請輸入email" id="cartEmail" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>
