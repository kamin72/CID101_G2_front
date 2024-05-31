<template>
  <CartFlow_list />
  <div class="container">
    <section class="list">
      <div class="textItem">
        <div class="check">
          <input type="checkbox" name="checkbox" id="checkbox" />
          <p class="item">詢價清單</p>
        </div>
        <p class="item">單價</p>
        <p class="item">數量</p>
        <p class="item">總金額</p>
      </div>
      <div class="listItem" v-for="(productItem, productIndex) in products" :key="productItem.id">
        <div class="image">
          <input type="checkbox" name="checkbox" id="checkbox" />
          <img :src="productItem.image" />
          <div class="description">
            {{ productItem.desc }}
          </div>
        </div>
        <div class="price">NT. {{ productItem.price }}</div>
        <div class="amount">
          <button class="small-btn-invalid">-</button>
          <span class="num">{{ productItem.count }}</span>
          <button class="small-btn-invalid">+</button>
        </div>
        <div class="total">NT. {{ total(productIndex) }}</div>
      </div>
      <div class="sum">
        <p>總價</p>
        <p>NT. 1200</p>
      </div>
      <div class="discount">
        <p>折扣</p>
        <p>-NT. 120</p>
      </div>
      <div class="actualPaid">
        <p>結帳金額</p>
        <p>NT. 1080</p>
      </div>
    </section>
  </div>
</template>

<script>
import CartFlow_list from '@/components/CartFlow_list.vue'
export default {
  components: {
    CartFlow_list
  },
  data() {
    return {
      products: [
        {
          id: 1,
          image: 'https://picsum.photos/150/200/?random=10',
          desc: 'efhjhfjhfjhdfdf',
          price: 300,
          count: 1
        },
        {
          id: 2,
          image: 'https://picsum.photos/150/200/?random=11',
          desc: 'efhjhfjhfjhdfdf',
          price: 400,
          count: 1
        },
        {
          id: 3,
          image: 'https://picsum.photos/150/200/?random=12',
          desc: 'efhjhfjhfjhdfdf',
          price: 500,
          count: 1
        },
        {
          id: 4,
          image: 'https://picsum.photos/150/200/?random=15',
          desc: 'efhjhfjhfjhdfdf',
          price: 600,
          count: 1
        }
      ]
    }
  },
  methods: {
    total(index) {
      let price = this.products[index].price * this.products[index].count
      return price
    }
  },
  computed: {
    sum() {
      const price = this.products.reduce((total, item) => total + item.price * item.count, 0)
      return price
    }
  }
}
</script>
