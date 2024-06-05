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
        <CartList
          :item="productItem"
          :index="productIndex"
          v-for="(productItem, productIndex) in products"
          :key="productItem.id"
          @add="add(productIndex)"
          @reduce="reduce(productIndex)"
        />
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
      <aside class="coupon">
        <Coupon />
        <div class="terms">
          <p>
            本網站並非線上交易型網站，所列商品及其相關資訊均僅供介紹參考之用，公司客服人員會儘速與您連絡。
            所有交易細節請均以我們服務人員與您確認訂單當時的內容與說明為準，如有造成不便及困擾之處，敬請見諒。
          </p>
          <label><input type="checkbox" class="eighteen" />我已年滿18歲</label>
          <label><input type="checkbox" class="agree" />我同意所有交易條款[查看條款]</label>
          <label>
            <input type="checkbox" class="reciveMeg" /> 是否願意收到Silken
            SipsVineyard的最新消息</label
          >
        </div>
        <RouterLink to="/cartDelivery_comp">
          <button class="big-btn-primary cartSubmit">送出詢價單</button>
        </RouterLink>
      </aside>
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
