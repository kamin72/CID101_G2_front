<template>
  <Mainheader />
  <RouterView />
  <Mainfooter />
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import Mainheader from './components/Mainheader.vue'
import Mainfooter from './components/Mainfooter.vue'

export default {
  components: {
    RouterLink,
    RouterView,
    Mainheader,
    Mainfooter
  }
}
</script>
