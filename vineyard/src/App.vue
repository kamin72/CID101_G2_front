<template>
  <Mainheader />
  <RouterView />
  <Cards />
  <Mainfooter />
</template>

<script>
import { RouterView } from 'vue-router'
import Mainheader from '@/components/Mainheader.vue'
import Mainfooter from '@/components/Mainfooter.vue'
import Cards from '@/components/Cards.vue'
export default {
  components: {
    RouterView,
    Mainheader,
    Mainfooter,
    Cards,
  }
}
</script>
