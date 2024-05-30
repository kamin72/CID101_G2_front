<template>
  <div class="container">
    <section class="flow">
      <div class="circle" v-for="circle in flow" :key="circle.id">
        <span class="material-symbols-outlined" :style="{ opacity: circle.opacity }">
          {{ circle.icon }}
        </span>
      </div>
      <div class="dot"></div>
    </section>

    <div class="wrap">
      <p
        class="text"
        v-for="p in wrap"
        :key="p.id"
        :style="{ opacity: p.opacity, fontWeight: p.bold }"
      >
        {{ p.text }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flow: [
        {
          id: 1,
          icon: 'receipt_long',
          opacity: '1'
        },
        {
          id: 2,
          icon: 'local_shipping',
          opacity: '0.3'
        },
        {
          id: 3,
          icon: 'paid',
          opacity: '0.3'
        },
        {
          id: 4,
          icon: 'check',
          opacity: '0.3'
        }
      ],
      wrap: [
        {
          id: 1,
          text: '詢價清單',
          opacity: '1',
          bold: '400'
        },
        {
          id: 2,
          text: '填寫配送資訊',
          opacity: '0.3',
          bold: '0'
        },
        {
          id: 3,
          text: '選擇付款方式',
          opacity: '0.3',
          bold: '0'
        },
        {
          id: 4,
          text: '完成詢價',
          opacity: '0.3',
          bold: '0'
        }
      ]
    }
  }
}
</script>
