<template>
  <div class="flow">
    <div class="circle" :style="{ backgroundColor: flow.color }">
      <span class="material-symbols-outlined" :style="{ opacity: flow.opacity }">
        {{ flow.icon }}
      </span>
      <div class="wrap_text">
        <p class="text" :style="{ opacity: flow.opacity, fontWeight: flow.bold }">
          {{ flow.text }}
        </p>
      </div>
    </div>
  </div>
  <div class="box">
    <div class="dot" :style="{ borderColor: flow.borderColor }"></div>
  </div>
</template>

<script>
export default {
  props: ['flow', 'flowRwd'],
  data() {
    return {}
  }
}
</script>
