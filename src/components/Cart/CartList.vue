<template>
  <div class="list">
    <div class="img-title">
      <div class="image-wrap">
        <input
          type="checkbox"
          name="checkbox"
          id="checkbox"
          :checked="isChecked"
          @change="updateCheck"
          v-model="deletItemCheck"
        />
        <img :src="parseServerImg(item?.prod_img)" />
      </div>
      <div class="text-wrap">
        <h4 class="description">{{ item?.prod_name }}</h4>
        <p class="description">{{ item?.prod_ename }}</p>
        <p class="description">{{ item?.prod_describe }}</p>
      </div>
    </div>
    <div class="price">{{ item?.prod_price }}</div>
    <div class="amount">
      <button @click="$emit('reduce')" class="cartButton">-</button>
      <span class="num">{{ item?.count }}</span>
      <button @click="$emit('add')" class="cartButton">+</button>
    </div>
    <div class="total">NT. {{ sum(index) }}</div>
    <div class="delet_icon">
      <span
        class="material-symbols-outlined"
        @click="deletItem(index)"
        :class="{ disabled: !isChecked }"
      >
        delete
      </span>
    </div>
  </div>
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
    return {
      deletItemCheck: false
    }
  },
  methods: {
    sum(n) {
      return this.total(n)
    },
    updateCheck(event) {
      this.$emit('update:isChecked', event.target.checked)
    },
    parseServerImg(file) {
      return `${import.meta.env.VITE_FILE_URL}/${file}`
    },
    deletItem(index) {
      if (this.deletItemCheck == true) {
        this.$emit('deleteProductItem', index)
      } else {
        // 可以添加一個提示，告訴用戶需要先勾選才能刪除
        alert('請先勾選商品才能刪除')
      }
    }
  }
}
</script>
