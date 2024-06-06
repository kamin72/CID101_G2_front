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
        <input type="number" placeholder="0000" />
        <span>-</span>
        <input type="number" placeholder="0000" />
        <span>-</span>
        <input type="number" placeholder="0000" />
        <span>-</span>
        <input type="number" placeholder="0000" />
      </div>
    </div>
    <div class="box">
      <div class="cardUser">
        <p>卡片持有人</p>
        <input type="number" placeholder="請輸入姓名" />
      </div>
      <div class="cardDate">
        <p>有效期限</p>
        <input type="text" placeholder="M/Y" />
      </div>
      <div class="cvv2">
        <p>CVV2</p>
        <input type="number" placeholder="請輸入安全碼" />
      </div>
    </div>
  </div>
</template>
