<template>
  <MainHeader />
  <RouterView />
  <!-- <Cards /> -->
  <MainFooter />
</template>

<script>
import { RouterView } from 'vue-router'
import MainHeader from '@/components/home/MainHeader.vue'
import MainFooter from '@/components/home/MainFooter.vue'
// import Cards from '@/components/Cards.vue'
export default {
  components: {
    RouterView,
    MainHeader,
    MainFooter
  }
}
</script>
