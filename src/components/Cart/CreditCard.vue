<template>
  <div class="paidInfo">
    <div class="column">
      <h3 class="title">付款資訊</h3>
    </div>
    <div class="creditTerm">
      <small>
        本網站使用 SSL
        加密技術保護您的信用卡資訊，確保交易安全。請參閱我們的隱私權政策，了解我們如何收集、使用和保護您的個人資料。如果您有任何關於信用卡付款安全方面的疑問，請隨時聯繫我們的客服人員。
      </small>
    </div>
    <div class="cardNumber">
      <p>卡片號碼</p>
      <div class="cardNumber-input-wrap">
        <input type="number" placeholder="0000" v-model="cardNum1" />
        <span>-</span>
        <input type="number" placeholder="0000" v-model="cardNum2" />
        <span>-</span>
        <input type="number" placeholder="0000" v-model="cardNum3" />
        <span>-</span>
        <input type="number" placeholder="0000" v-model="cardNum4" />
      </div>
    </div>
    <div class="box">
      <div class="cardUser">
        <p>卡片持有人</p>
        <input type="number" placeholder="請輸入姓名" v-model="name" />
      </div>
      <div class="cardDate">
        <p>有效期限</p>
        <input type="text" placeholder="M/Y" v-model="expiryDate" />
      </div>
      <div class="cvv2">
        <p>CVV2</p>
        <input type="number" placeholder="請輸入安全碼" v-model="cvv2" />
      </div>
    </div>
    <button class="small-btn-primary" @click="sendCardInfo">送出</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardNum1: null,
      cardNum2: null,
      cardNum3: null,
      cardNum4: null,
      name: '',
      expiryDate: null,
      cvv2: null
    }
  },
  methods: {
    sendCardInfo() {
      try {
        let cardInfo = {
          cardNum1: this.cardNum1,
          cardNum2: this.cardNum2,
          cardNum3: this.cardNum3,
          cardNum4: this.cardNum4,
          name: this.name,
          expiryDate: this.expiryDate,
          cvv2: this.cvv2
        }
        const formData = new URLSearchParams(cardInfo)
        fetch(
          'http://localhost/CID101_G2_php/front/SDK_PHP-master/example/Payment/Aio/CreateCreditOrder.php',
          {
            method: 'post',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
          }
        )
          .then((res) => res.json())
          .then((result) => {
            alert('付款成功')
            console.log(result)
          })
      } catch (error) {
        console.error('pay error', error)
      }
    }
  }
}
</script>
