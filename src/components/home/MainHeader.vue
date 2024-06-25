<template>
  <header class="header">
    <nav class="container">
      <div class="header-hamburger" @click="toggleNav">
        <i class="fa-solid fa-bars"></i>
      </div>
      <div class="header-logo">
        <RouterLink to="/"><img src="/src/assets/img/logo/logo2-w.png" /></RouterLink>
      </div>
      <div class="header-nav" :class="{ 'header-nav-open': isNavOpen }">
        <ul class="header-link">
          <li>
            <RouterLink to="/product">我們的酒</RouterLink>
            <RouterLink to="/course">品酒課程</RouterLink>
            <RouterLink to="/game">品酒達人</RouterLink>
            <RouterLink to="/news">最新消息</RouterLink>
            <RouterLink to="/about">關於我們</RouterLink>
          </li>
        </ul>
        <div class="wrap-login-shoppingcart">
          <div class="header-login">
            <i class="fa-regular fa-user"></i>
            <RouterLink to="/login" v-if="!accountName">登入</RouterLink>
            <RouterLink to="/login" v-if="accountName">{{ accountName }}</RouterLink>
          </div>

          <div class="header-shoppingcart">
            <i class="fa-solid fa-bag-shopping"></i>
            <RouterLink to="/cart_comp">詢價清單({{ cartCount }})</RouterLink>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import cartStore from '@/stores/cart'
import memberStore from '@/stores/loginMember'

export default {
  data() {
    return {
      isNavOpen: false
    }
  },
  computed: {
    ...mapState(cartStore, ['cart']),
    ...mapState(memberStore, ['memberInfo', 'accountName']),
    cartCount() {
      return this.cart.length
    }
  },
  created() {
    this.$router.afterEach(() => {
      this.isNavOpen = false
    })
    this.getMemberData()
  },
  methods: {
    ...mapActions(cartStore, ['checkCart']),
    ...mapActions(memberStore, ['getMemberData']),
    toggleNav() {
      this.isNavOpen = !this.isNavOpen
    }
  },
  mounted() {
    this.checkCart()
  }
}
</script>
