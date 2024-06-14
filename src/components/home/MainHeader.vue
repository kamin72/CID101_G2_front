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
            <RouterLink to="/new">最新消息</RouterLink>
            <RouterLink to="/about">關於我們</RouterLink>
          </li>
        </ul>
        <div class="wrap-login-shoppingcart">
          <div class="header-login">
            <i class="fa-regular fa-user"></i>
            <RouterLink to="/login">登入</RouterLink>
          </div>

          <div class="header-shoppingcart">
            <i class="fa-solid fa-bag-shopping"></i>
            <RouterLink to="/cart_account">詢價清單(0)</RouterLink>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const isNavOpen = ref(false)
    const router = useRouter()

    const toggleNav = () => {
      isNavOpen.value = !isNavOpen.value
    }

    onMounted(() => {
      router.afterEach(() => {
        isNavOpen.value = false
      })
    })

    return {
      isNavOpen,
      toggleNav
    }
  }
}
</script>
