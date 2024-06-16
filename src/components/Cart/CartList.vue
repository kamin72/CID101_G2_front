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
      <img :src="parseImg(item.image)" />
      <div>
        <h4 class="description">{{ item.name }}</h4>
        <p class="description">{{ item.ename }}</p>
        <p class="description">{{ item.variety }}</p>
      </div>
    </td>
    <td class="price">{{ item.price }}</td>
    <td class="amount">
      <button @click="$emit('reduce')" class="cartButton">-</button>
      <span class="num">{{ item.count }}</span>
      <button @click="$emit('add')" class="cartButton">+</button>
    </td>
    <td class="total">NT. {{ sum(index) }}</td>
    <td class="delet_icon"><span class="material-symbols-outlined"> delete </span></td>
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
    },
    parseImg(file) {
      return new URL(`../../assets/img/wine/${file}`, import.meta.url).href
    }
  }
}
</script>
