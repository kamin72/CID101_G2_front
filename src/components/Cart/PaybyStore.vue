<template>
  <div class="paidInfo">
    <div class="column">
      <h3 class="title">付款資訊</h3>
    </div>
    <div class="selectStore">
      <h4>選擇7-11取貨門市</h4>

      <button
        class="map big-btn-primary"
        @click="click1"
        :class="isClicked ? 'clicked' : 'unclicked'"
      >
        依地圖選擇門市
      </button>
      <button
        class="ussdStore big-btn-primary"
        @click="click2"
        :class="isClicked ? 'unclicked' : 'clicked'"
      >
        ★ 選擇常用門市
      </button>
    </div>
    <div class="storeAddress">
      <h4>門市名稱 | 新鎮興門市</h4>
      <h4>地址 | 桃園市平鎮區中興路平鎮段349號351號353號</h4>
      <p>
        &bull;
        門市取件時需配合門市相關規範，部分門市已陸續調整為「自助取件」，可重新依地圖選擇確認。
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isClicked: Boolean
    }
  },
  methods: {
    click1() {
      this.isClicked = true
    },
    click2() {
      this.isClicked = false
    }
  }
}
</script>

<style scoped>
.clicked {
  background-color: #aea495;
}
.unclicked {
  background-color: #322d26;
}
</style>
