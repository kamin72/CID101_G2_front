<template>

  <div class="container">
    <section>
      <CartFlow :flow="item" v-for="item in flow" :key="item.id" />
    </section>
    <div class="wrap_all">
      <div class="wrap_list">
        <div class="textItem">
          <div class="check">
            <input type="checkbox" name="checkbox" id="checkbox" />
            <p class="item">詢價清單</p>
          </div>
          <p class="item">單價</p>
          <p class="item">數量</p>
          <p class="item">總金額</p>
        </div>
        <CartList :item="productItem" :index="productIndex" v-for="(productItem, productIndex) in products"
          :key="productItem.id" @add="add(productIndex)" @reduce="reduce(productIndex)" />
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
      </div>
      <Coupon />
    </div>
  </div>

</template>

<script>
import CartFlow from '@/components//Cart/CartFlow.vue'
import CartList from '@/components/Cart/CartList.vue'
import Coupon from '@/components/Cart/Coupon.vue'

export default {
  components: {
    CartFlow,
    CartList,
    Coupon
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
      ],
      flow: [
        {
          id: 1,
          icon: 'receipt_long',
          opacity: '1',
          text: '詢價清單',
          bold: '400'
        },
        {
          id: 2,
          icon: 'local_shipping',
          opacity: '0.3',
          text: '填寫配送資訊',
          bold: '0'
        },
        {
          id: 3,
          icon: 'paid',
          opacity: '0.3',
          text: '選擇付款方式',
          bold: '0'
        },
        {
          id: 4,
          icon: 'check',
          opacity: '0.3',
          text: '完成詢價',
          bold: '0'
        }
      ],
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
      const price = this.products.reduce((total, items) => total + items.price * items.count, 0)
      return price
    }
  },
  provide() {
    return {
      total: this.total
    }
  }
}
</script>
