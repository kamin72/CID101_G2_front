<template>
  <MainHeader />
  <RouterView />
  <!-- <CardsExample /> -->
  <MainFooter />
</template>

<script>
import { RouterView } from 'vue-router'
import MainHeader from '@/components/home/MainHeader.vue'
import MainFooter from '@/components/home/MainFooter.vue'
// import CardsExample from '@/components/CardsExample.vue';
export default {
  data() {
    return {
      checkAccountName: ''
    }
  },
  components: {
    RouterView,
    MainHeader,
    MainFooter
    // CardsExample
  },
  mounted() {
    let formData = new FormData();
    formData.append('MerchantID', '3002607');

    fetch("https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5",
      {
        body: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "post"
      });
  },
}
</script>
<style>
body {
  background-color: #ede7de;
}
</style>
