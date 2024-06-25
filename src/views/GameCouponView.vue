<template>
    <div class="coupon-page">
      <h1>恭喜你！</h1>
      <p>你的總分數是: {{ score }} 分</p>
      <button @click="claimCoupon">领取优惠券</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        score: 0
      };
    },
    created() {
      this.score = this.$route.query.score || 0;
    },
    methods: {
      claimCoupon() {
        // 处理领取优惠券的逻辑
        alert('优惠券领取成功！');
      }
    }
  };
  </script>
  