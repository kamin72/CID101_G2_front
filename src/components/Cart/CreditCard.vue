<template>
  <div class="paidInfo">
    <div class="column">
      <h3 class="title">付款資訊</h3>
    </div>
    <form @submit.prevent="sendCardInfo">
      <label for="">
        訂單編號
        <input type="text" name="MerchantTradeNo">
      </label>
      <label for="">
        總金額
        <input type="text" name="TotalAmount">
      </label>
      <label for="">
        交易描述
        <input type="text" name="TradeDesc">
      </label>
      <label for="">
        商品名稱
        <input type="text" name="ItemName">
      </label>

      <!-- <div class="creditTerm">
      <small>
        本網站使用 SSL
        加密技術保護您的信用卡資訊，確保交易安全。請參閱我們的隱私權政策，了解我們如何收集、使用和保護您的個人資料。如果您有任何關於信用卡付款安全方面的疑問，請隨時聯繫我們的客服人員。
      </small>
    </div> -->
      <!-- <div class="cardNumber">
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
    </div> -->
      <button class="small-btn-primary" type="submit">前往付款</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      MerchantTradeNo: null,
      TotalAmount: null,
      TradeDesc: null,
      ItemName: null
    }
  },
  methods: {
    sendCardInfo() {
      // 創建一個包含表單數據的對象
      const formData = {
        MerchantTradeNo: this.MerchantTradeNo,
        TotalAmount: this.TotalAmount,
        TradeDesc: this.TradeDesc,
        ItemName: this.ItemName
      };

      // 創建一個隱藏的表單並提交
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'http://localhost/CID101_G2_php/front/SDK_PHP-master/example/Payment/Aio/CreateCreditOrder.php';

      for (const key in formData) {
        if (formData[key] !== null && formData[key] !== '') {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = formData[key];
          form.appendChild(input);
        }
      }

      document.body.appendChild(form);
      form.submit();
    }
    // try {
    //   let orderInfo = {
    //     MerchantTradeNo: this.MerchantTradeNo,
    //     TotalAmount: this.TotalAmount,
    //     TradeDesc: this.TradeDesc,
    //     ItemName: this.ItemName,
    //   }
    //   // const formData = new URLSearchParams(orderInfo)

    //   const form = document.createElement("form");
    //   for (const key in orderInfo) {
    //     const element = document.createElement("input");
    //     element.value = orderInfo[key];
    //     element.name = key;
    //     form.appendChild(element);
    //   }

    //   form.method = "POST";
    //   form.action = "http://localhost/CID101_G2_php/front/SDK_PHP-master/example/Payment/Aio/CreateCreditOrder.php";
    //   document.body.appendChild(form)
    //   form.submit()


    // var xhr = new XMLHttpRequest()
    // console.log(xhr)
    // xhr.open('POST', 'http://localhost/CID101_G2_php/front/SDK_PHP-master/example/Payment/Aio/CreateCreditOrder.php', true);
    // xhr.send(formData);

    // } catch(error) {
    //   console.error('pay error', error)
    // }
  }


}
</script>
