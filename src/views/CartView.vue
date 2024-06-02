<template>
  <CartFlow_list />
  <div class="container">
    <div class="wrapper">
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
            <button @click="reduce(productIndex)" class="small-btn-invalid">-</button>
            <span class="num">{{ productItem.count }}</span>
            <button @click="add(productIndex)" class="small-btn-invalid">+</button>
          </div>
          <div class="total">NT. {{ total(productIndex) }}</div>
        </div>
        <div class="sum">
          <p>總價</p>
          <p>NT. {{ sum }}</p>
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
import CartFlow_list from '@/components/Cart/CartFlowList.vue'
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
    },
    add(index) {
      if (this.products[index].count == 10) return
      this.products[index].count++
    },
    reduce(index) {
      if (this.products[index].count == 0) return
      this.products[index].count--
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
