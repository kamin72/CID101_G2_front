<template>
  <div class="container" v-if="$route.path === '/cart_account'">
    <section class="account">
      <CartFlow :flow="item" v-for="item in flow" :key="item.id" />
    </section>

    <div class="wrap_all">
      <table class="wrap_list">
        <tr class="textItem">
          <th class="check">
            <input type="checkbox" name="checkbox" id="checkbox" v-model="allChecked" />
            <p class="item">詢價清單</p>
          </th>
          <th class="item">單價</th>
          <th class="item">數量</th>
          <th class="item">總金額</th>
          <th class="allDelet_icon"><span class="material-symbols-outlined"> delete </span></th>
        </tr>
        <CartList
          v-for="(productItem, productIndex) in products"
          :key="productItem.id"
          :item="productItem"
          :index="productIndex"
          :isChecked="allChecked"
          @update:isChecked="updateItemCheck(productIndex, $event)"
          @add="add(productIndex)"
          @reduce="reduce(productIndex)"
          @deleteProductItem="onDeletProductItem"
        />
        <tr class="sum">
          <td>總價</td>
          <td></td>
          <td></td>
          <td>NT. {{ sum }}</td>
        </tr>
        <tr class="discount">
          <td>折扣</td>
          <td></td>
          <td></td>
          <td>- NT. ???</td>
        </tr>
        <tr class="actualPaid">
          <td>結帳金額</td>
          <td></td>
          <td></td>
          <td>NT. {{ actualPaid }}</td>
        </tr>
      </table>
      <aside class="coupon">
        <Coupon />
        <div class="terms">
          <p>
            本網站並非線上交易型網站，所列商品及其相關資訊均僅供介紹參考之用，公司客服人員會儘速與您連絡。
            所有交易細節請均以我們服務人員與您確認訂單當時的內容與說明為準，如有造成不便及困擾之處，敬請見諒。
          </p>
          <label><input type="checkbox" class="eighteen" v-model="isEighteen" />我已年滿18歲</label>
          <label
            ><input
              type="checkbox"
              class="agree"
              v-model="agreeTerms"
            />我同意所有交易條款[查看條款]</label
          >
          <label>
            <input type="checkbox" class="reciveMeg" v-model="receiveMessages" />
            是否願意收到Silken SipsVineyard的最新消息</label
          >
        </div>
        <RouterLink to="/cart_account/cartdelivery_account" style="text-decoration: none">
          <button
            class="big-btn-primary cartSubmit"
            :disabled="!canSubmit"
            :class="!canSubmit ? 'big-btn-invalid' : 'big-btn-primary'"
          >
            送出詢價單
          </button>
        </RouterLink>
      </aside>
    </div>
  </div>
  <RouterView />
</template>
<script>
import CartFlow from '@/components//Cart/CartFlow.vue'
import CartList from '@/components/Cart/CartList.vue'
import Coupon from '@/components/Cart/Coupon.vue'
import { mapState, mapActions } from 'pinia'
import cartStore from '@/stores/cart'

export default {
  components: {
    CartFlow,
    CartList,
    Coupon
  },
  data() {
    return {
      products: [],
      flow: [
        {
          id: 1,
          icon: 'receipt_long',
          opacity: '1',
          text: '詢價清單',
          bold: '400',
          color: '#AEA495'
        },
        {
          id: 2,
          icon: 'edit_document',
          opacity: '0.3',
          text: '填寫個人資料',
          bold: '0'
        },
        {
          id: 3,
          icon: 'paid',
          opacity: '0.3',
          text: '完成詢價',
          bold: '0'
        }
      ],
      flowRwd: [
        {
          id: 1,
          icon: 'receipt_long',
          opacity: '1',
          text: '詢價清單',
          bold: '400',
          color: '#AEA495',
          borderColor: '#D5D5D5'
        },
        {
          id: 2,
          icon: 'local_shipping',
          opacity: '0.3',
          text: '填寫配送資訊',
          bold: '0'
        }
      ],
      allChecked: false,
      isEighteen: false,
      agreeTerms: false,
      receiveMessages: false
    }
  },
  methods: {
    ...mapActions(cartStore, ['cleanCart']),
    total(index) {
      let price = this.products[index].price2 * this.products[index].count
      return price
    },
    add(index) {
      if (this.products[index].count == 10) return
      this.products[index].count++
    },
    reduce(index) {
      if (this.products[index].count == 0) return
      this.products[index].count--
    },
    updateItemCheck() {
      // 檢查是否所有產品都被選中
      this.allChecked = this.products.every((product) => product.isChecked)
    },
    toggleAllChecks() {
      this.products.forEach((product) => {
        product.isChecked = this.allChecked
      })
    },
    getProduct() {
      let storage = JSON.parse(localStorage.getItem('cart'))
      if (storage?.length > 0 && storage?.length != null) {
        this.products = storage
      } else {
        this.products = []
      }
    },
    clearAllProduct() {
      if (this.allChecked == true) {
        this.cleanCart()
        this.products = []
        this.allChecked = false
      }
    },
    onDeletProductItem(index) {
      this.products.splice(index, 1)
      // console.log(this.products)
      localStorage.setItem('cart', JSON.stringify(this.products))
    }
  },
  computed: {
    ...mapState(cartStore, ['cart']),
    sum() {
      const price = this.products.reduce((total, items) => total + items.price2 * items.count, 0)
      return price
    },
    canSubmit() {
      return this.isEighteen && this.agreeTerms
    },
    isMobile() {
      return this.windowWidth < 450
    },
    // discount() {
    //   return this.sum * 0.8
    // },
    actualPaid() {
      return this.sum + this.discount
    }
  },
  provide() {
    return {
      total: this.total
    }
  },
  mounted() {
    this.getProduct()
  }
}
</script>
