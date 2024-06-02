<template>
  <div class="container">
    <div class="wrapper">
      <section class="list">
        <div class="listItem">
          <div class="image">
            <input type="checkbox" name="checkbox" id="checkbox" />
            <img :src="item.image" />
            <p class="description">
              {{ item.desc }}
            </p>
          </div>
          <p class="price">NT. {{ item.price }}</p>
          <div class="amount">
            <button @click="$emit('reduce')" class="small-btn-invalid">-</button>
            <span class="num">{{ item.count }}</span>
            <button @click="$emit('add')" class="small-btn-invalid">+</button>
          </div>
          <p class="total">{{ sum(index) }}</p>
        </div>
      </section>

      <aside class="coupon">
        <h4>優惠券</h4>
        <div class="usage">
          <input type="text" placeholder="輸入優惠碼" class="import" />
          <button class="enter small-btn-primary">使用</button>
        </div>
        <div class="tickets">
          <div class="content">
            <span class="material-symbols-outlined"> local_activity </span>
            <p>首購九折優惠</p>
          </div>
          <span class="material-symbols-outlined"> close </span>
        </div>
      </aside>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item', 'index'],
  inject: ['total'],
  data() {
    return {

    }
  },
  methods: {
    sum(n) {
      return this.total(n)
    }
  },
  computed: {

  }
}
</script>
