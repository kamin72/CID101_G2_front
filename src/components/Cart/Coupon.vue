<template>
  <aside class="coupon">
    <h4>優惠券</h4>
    <div class="usage">
      <input type="text" placeholder="輸入優惠碼" class="import" />
      <button class="enter small-btn-primary">使用</button>
    </div>
    <div class="tickets">
      <div class="content">
        <span class="material-symbols-outlined"> local_activity </span>
        <p>首購九折優惠</p>
      </div>
      <span class="material-symbols-outlined"> close </span>
    </div>
    <div class="terms">
      <p>
        本網站並非線上交易型網站，所列商品及其相關資訊均僅供介紹參考之用，公司客服人員會儘速與您連絡。
        所有交易細節請均以我們服務人員與您確認訂單當時的內容與說明為準，如有造成不便及困擾之處，敬請見諒。
      </p>
      <label><input type="checkbox" class="eighteen" />我已年滿18歲</label>
      <label><input type="checkbox" class="agree" />我同意所有交易條款[查看條款]</label>
      <label>
        <input type="checkbox" class="reciveMeg" /> 是否願意收到Silken SipsVineyard的最新消息</label
      >
    </div>
    <button class="big-btn-primary">送出詢價單</button>
  </aside>
</template>
