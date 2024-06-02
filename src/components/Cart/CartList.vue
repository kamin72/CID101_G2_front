<template>

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
