<!-- <template>
  <div class="envelope-container">
    <transition name="envelope">
      <div v-if="isOpen" class="envelope-content">
        <p>Your Coupon</p>
      </div>
    </transition>
    <div class="envelope" @click="toggleEnvelope">
      <div class="envelope-flap" :class="{ 'open': isOpen }"></div>
      <div class="envelope-body"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    toggleEnvelope() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>

<style scoped>
.envelope-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.envelope {
  position: relative;
  width: 300px;
  height: 200px;
  background-color: #f5f5f5;
  cursor: pointer;
  border: 2px solid #000;
  transform-style: preserve-3d;
  perspective: 1000px;
}

.envelope-flap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background-color: #f5f5f5;
  border-bottom: 2px solid #000;
  transform-origin: top;
  transition: transform 0.5s ease;
  clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
}

.envelope-flap.open {
  transform: rotateX(-180deg);
}

.envelope-body {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 50%;
  background-color: #f5f5f5;
}

.envelope-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 2px solid #000;
  text-align: center;
}

.envelope-enter-active,
.envelope-leave-active {
  transition: opacity 0.5s;
}

.envelope-enter,
.envelope-leave-to {
  opacity: 0;
}
</style> -->
