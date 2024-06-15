<template>
  <div class="flow">
    <div class="circle" :style="{ backgroundColor: flowRwd.color }">
      <span class="material-symbols-outlined" :style="{ opacity: flowRwd.opacity }">
        {{ flowRwd.icon }}
      </span>
      <div class="wrap_text">
        <p class="text" :style="{ opacity: flowRwd.opacity, fontWeight: flowRwd.bold }">
          {{ flowRwd.text }}
        </p>
      </div>
    </div>
  </div>
  <div class="box">
    <div class="dot" :style="{ borderColor: flowRwd.borderColor }"></div>
  </div>
</template>

<script>
export default {
  props: ['flowRwd'],
  data() {
    return {}
  }
}
</script>
