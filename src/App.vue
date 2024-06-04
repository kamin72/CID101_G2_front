<template>
  <MainHeader />
  <RouterView />
  <MainFooter />
</template>

<script>
import { RouterView } from 'vue-router'
import MainHeader from '@/components/home/MainHeader.vue'
import MainFooter from '@/components/home/MainFooter.vue'
export default {
  components: {
    RouterView,
    MainHeader,
    MainFooter,
  }
}
</script>
<style>
body {
  background-color: #EDE7DE;  
}
</style>
