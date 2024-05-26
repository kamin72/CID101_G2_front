<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/product">商品</RouterLink>
      </nav>
      <SectionA>a</SectionA>
      <SectionB>b</SectionB>
      <SectionC>c</SectionC>
    </div>
  </header>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import SectionA from './components/home/SectionA.vue'
import SectionB from './components/home/SectionB.vue'
import SectionC from './components/home/SectionC.vue'

export default {
  components: {
    RouterLink,
    RouterView,
    HelloWorld,
    SectionA,
    SectionB,
    SectionC
  }
}
</script>

<style scoped>
section {
  background-color: #ddd;
  height: 90vh;
  display: flex;
  font-size: 10rem;
}
</style>
