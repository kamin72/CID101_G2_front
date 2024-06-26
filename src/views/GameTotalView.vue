<template>
  <div class="letter-icon" @click="toggleOpen">
    <svg :class="{ hide: isOpen }" width="200" height="200" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="48" y="8" rx="4" fill="#D1D5DB"/>
      <path class="flap" :class="{ open: isOpen }" d="M4 8L32 32L60 8" stroke="#1F2937" stroke-width="4" fill="#1F2937"/>
      <path d="M4 8H60V48H4V8Z" stroke="#1F2937" stroke-width="4"/>
    </svg>
    <div class="coupon" :class="{ show: isOpen }">領取優惠券</div>
  </div>
</template>

<script>
export default {
  name: 'LetterIcon',
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen;
    },
    centerCoupon() {
      if (this.isOpen) {
        const coupon = document.querySelector('.coupon');
        const rect = coupon.getBoundingClientRect();
        const x = window.innerWidth / 2 - rect.width / 2;
        const y = window.innerHeight / 2 - rect.height / 2;
        coupon.style.transform = `translate(${x}px, ${y}px)`;
      }
    },
  },
  watch: {
    isOpen() {
      this.centerCoupon();
    },
  },
};
</script>

<style scoped>
.letter-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  cursor: pointer;
}

svg {
  max-width: 100%;
  height: auto;
  transition: opacity 1s ease;
}

svg.hide {
  opacity: 0;
}

.flap {
  transform-origin: top;
  transition: transform 0.5s ease;
}

.flap.open {
  transform: rotateX(180deg);
}

.coupon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.5);
  background-color: #7f1023;
  padding: 10px 20px;
  border: 1px solid #1f2937;
  border-radius: 2px;
  font-size: 16px;
  font-weight: bold;
  opacity: 0;
  z-index: -1;
  transition: opacity 0.5s ease, transform 1s ease;
}

.coupon.show {
  opacity: 1;
  z-index: 1;
  animation: popup 1s ease forwards;
}

@keyframes popup {
  0% {
    transform: translate(-50%, -50%) scale(0.5);
  }
  50% {
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    transform: translate(-50%, -50%) scale(1.2);
  }
}
</style>
