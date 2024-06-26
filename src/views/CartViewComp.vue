<template>
  <div class="container" v-if="$route.path === '/cart_comp'">
    <section v-show="!isMobile">
      <CartFlow :flow="item" v-for="item in flow" :key="item.id" />
    </section>
    <section v-show="isMobile" class="cartFlowRWD">
      <CartFlowRWD :flowRwd="itemRwd" v-for="itemRwd in flowRwd" :key="itemRwd.id" />
    </section>
    <div class="wrap_all">
      <div class="wrap_list">
        <div class="textItem">
          <div class="check">
            <input type="checkbox" name="checkbox" id="checkbox" v-model="allChecked" />
            <p>詢價清單</p>
          </div>
          <div class="item">單價</div>
          <div class="item">數量</div>
          <div class="item">總金額</div>
          <div class="allDelet_icon">
            <span class="material-symbols-outlined" @click="clearAllProduct"> delete </span>
          </div>
        </div>
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
        <div class="sum">
          <div class="text">總價</div>
          <div class="price">NT. {{ sum }}</div>
        </div>
        <div class="discount">
          <div class="text">折扣</div>
          <div class="price">- NT. {{ discount }}</div>
        </div>
        <div class="actualPaid">
          <div class="text">結帳金額</div>
          <div class="price">NT. {{ actualPaid }}</div>
        </div>
      </div>
      <aside class="coupon">
        <!-- <Coupon /> -->
        <div class="termsComp">
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
          <label
            ><input type="checkbox" class="reciveMeg" v-model="receiveMessages" />是否願意收到Silken
            SipsVineyard的最新消息</label
          >
        </div>
        <RouterLink to="/cart_comp/cartdelivery_comp" style="text-decoration: none">
          <button
            class="big-btn-primary cartSubmit"
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
import CartFlowRWD from '@/components//Cart/CartFlowRWD.vue'
import CartList from '@/components/Cart/CartList.vue'
// import Coupon from '@/components/Cart/Coupon.vue'
import { mapState, mapActions } from 'pinia'
import cartStore from '@/stores/cart'

export default {
  components: {
    CartFlow,
    CartList,
    // Coupon,
    CartFlowRWD
  },
  data() {
    return {
      flow: [
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
      windowWidth: window.innerWidth,
      isEighteen: false,
      agreeTerms: false,
      receiveMessages: false
    }
  },
  methods: {
    ...mapActions(cartStore, ['cleanCart', 'checkCart']),
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
    updateWindowWidth() {
      this.windowWidth = window.innerWidth
    },
    updateItemCheck() {
      // 檢查是否所有產品都被選中
      if (this.products.length > 0) {
        this.allChecked = this.products.every((product) => product.isChecked)
      }
    },
    toggleAllChecks() {
      this.products.forEach((product) => {
        product.isChecked = this.allChecked
      })
    },
    clearAllProduct() {
      if (this.allChecked == true) {
        this.cleanCart()
        this.allChecked = false
      }
    },
    onDeletProductItem(index) {
      this.products.splice(index, 1)
      // console.log(this.products)
      localStorage.setItem('cart', JSON.stringify(this.products))
    }
  },
  mounted() {
    window.addEventListener('resize', this.updateWindowWidth)
    this.checkCart()
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateWindowWidth)
  },
  computed: {
    ...mapState(cartStore, ['cart']),
    sum() {
      const price = this.products.reduce((total, items) => total + items.price2 * items.count, 0)
      return price
    },
    canSubmit() {
      return this.isEighteen && this.agreeTerms && this.receiveMessages
    },
    isMobile() {
      return this.windowWidth < 450
    },
    discount() {
      return this.sum * 0.8
    },
    actualPaid() {
      return this.sum + this.discount
    },
    products() {
      return this.cart
    }
  },
  provide() {
    return {
      total: this.total
    }
  }
}
</script>
