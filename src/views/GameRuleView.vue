<template>
  <section class="game">
    <RouterLink to="/">
      <img src="../assets/img/game/leftGame.png" alt="Exit Game" class="exit-game" />
    </RouterLink>
    <div class="game-container">
      <div class="game-txt">
        <h3>Game Rules</h3>
        <p>共有10題關於葡萄酒的知識問題</p>
        <p>快來測驗看看您是否了解葡萄酒</p>
        <p>遊戲結束後會獲得優惠券</p>
        <p>(一天只能獲得一次)</p>
      </div>
      <button class="button">
        <router-link to="/GameTest" class="button-link">START</router-link>
      </button>
    </div>
  </section>
</template>
