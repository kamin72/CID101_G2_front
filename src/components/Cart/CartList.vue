<template>
  <tr class="list">
    <td class="image">
      <input
        type="checkbox"
        name="checkbox"
        id="checkbox"
        :checked="isChecked"
        @change="updateCheck"
      />
      <img :src="item.image" />
      <p class="description">{{ item.desc }}</p>
    </td>
    <td class="price">NT. {{ item.price }}</td>
    <td class="amount">
      <button @click="$emit('reduce')" class="small-btn-invalid">-</button>
      <span class="num">{{ item.count }}</span>
      <button @click="$emit('add')" class="small-btn-invalid">+</button>
    </td>
    <td class="total">NT. {{ sum(index) }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    item: Object,
    index: Number,
    isChecked: Boolean
  },
  inject: ['total'],
  data() {
    return {}
  },
  methods: {
    sum(n) {
      return this.total(n)
    },
    updateCheck(event) {
      this.$emit('update:isChecked', event.target.checked)
    }
  }
}
</script>
