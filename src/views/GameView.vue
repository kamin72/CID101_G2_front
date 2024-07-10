<template>
  <section class="game">
    <RouterLink to="/">
      <img src="../assets/img/game/leftGame.png" alt="Exit Game" class="exit-game" />
    </RouterLink>
    <div class="game-container">
      <div class="game-txt">
        <h3>Wine Quiz</h3>
        <p>品酒達人</p>
      </div>
      <button class="button">
        <RouterLink to="/GameRule" class="button-link">GO!</RouterLink>
      </button>
    </div>
  </section>
</template>
