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
  }
}
</script>
<style>
body {
  background-color: #ede7de;
}
</style>
