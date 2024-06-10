<template>
  <header class="header">
    <nav class="container">
      <div class="header_hamburger">
        <i class="fa-solid fa-bars"></i>
      </div>

      <div class="header_logo">
        <RouterLink to="/"><img src="/src/assets/img/logo/logo2-w.png" /></RouterLink>
      </div>

      <ul class="header_link">
        <li>
          <RouterLink to="/product">我們的酒</RouterLink>
          <RouterLink to="/course_detail">品酒課程</RouterLink>
          <RouterLink to="/game">品酒達人</RouterLink>
          <RouterLink to="/new">最新消息</RouterLink>
          <RouterLink to="/about">關於我們</RouterLink>
        </li>
      </ul>

      <div class="wrap_login_shoppingcart">
        <div class="header_login">
          <i class="fa-regular fa-user"></i>
          <RouterLink to="/login">登入</RouterLink>
        </div>

        <div class="header_shoppingcart">
          <i class="fa-solid fa-bag-shopping"></i>
          <RouterLink to="/cart_account">詢價清單(0)</RouterLink>
        </div>
      </div>
    </nav>
  </header>
</template>
