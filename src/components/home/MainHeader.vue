<template>
  <header class="header">
    <nav class="container">
      <div class="header-hamburger" @click="toggleNav" ref='nav'>
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
            <i class="fa-solid fa-user"></i>
            <RouterLink to="/login" v-if="!accountName">登入</RouterLink>
            <RouterLink to="/login" v-if="accountName">{{ accountName }}</RouterLink>
          </div>

          <div class="header-shoppingcart">
            <i class="fa-solid fa-bag-shopping"></i>
            <RouterLink to="/cart_comp" v-if="!normalAccount">詢價清單({{ cartCount }})</RouterLink>
            <RouterLink to="/cart_account" v-if="normalAccount">詢價清單({{ cartCount }})</RouterLink>
          </div>

          <div class="wrap-logout-shoppingcart" v-if="accountName">
            <i class="fa-solid fa-right-from-bracket"></i>
            <span @click="logout">登出</span>
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
      isNavOpen: false,
      normalAccount: true
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
    },
    handleOutsideClick(event) {
      // 檢查點擊是否發生在導覽列之外
      const nav = this.$refs.nav // 假設你的導覽列有 ref="nav"
      if (this.isNavOpen && nav && !nav.contains(event.target)) {
        this.isNavOpen = false
      }
    },
    isNormalAccount() {
      let storage = localStorage.getItem('memberInfo')
      if (storage) {
        storage = JSON.parse(storage)
        let account = storage[0]['identity']
        if (account == 1) {
          this.normalAccount = true
        }
      }
    },
    logout() {
      localStorage.removeItem('memberInfo')
      this.$router.push('/')
      this.getMemberData()
    }
  },
  mounted() {
    this.checkCart()
    this.isNormalAccount()
    window.addEventListener('click', this.handleOutsideClick)
  },
  beforeUnmount() {
    window.removeEventListener('click', this.handleOutsideClick)
  },
}
</script>
