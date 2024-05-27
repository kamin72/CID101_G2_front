<template>
  <Mainheader />
  <RouterView />
  <Mainfooter />
</template>

<script>
import { RouterView } from 'vue-router'
import Mainheader from '@/components/Mainheader.vue'
import Mainfooter from '@/components/Mainfooter.vue'

export default {
  components: {
    RouterView,
    Mainheader,
    Mainfooter
  }
}
</script>
