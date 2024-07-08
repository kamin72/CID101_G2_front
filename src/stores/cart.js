import { defineStore } from 'pinia'

export default defineStore('cartStore', {
  // 對應 data
  state: () => ({
    cart: [],
    products: [],
    detail: {} //如果要用null, 要加v-if="detail"
  }),

  // 對應 computed (物件形式)
  getters: {
    cartCount: (state) => state.cart.length
  },

  // 對應 methods (物件形式)
  actions: {
    checkCart() {
      const storageCart = localStorage.getItem('cart')
      if (this.cart.length > 0) {
        return this.cart
      } else if (storageCart) {
        const cartArray = JSON.parse(storageCart)
        this.cart = cartArray
        return cartArray
      } else {
        return []
      }
    },
    addCart(product) {
      if (!product) return
      // 從 localStorage 中獲取已存在的 cart 數據
      const storageCart = JSON.parse(localStorage.getItem('cart') || '[]')
      // 檢查傳入的 product 是否已存在於 storageCart 中
      const isExistIndex = storageCart.findIndex((item) => item.prod_id === product.prod_id)
      if (isExistIndex >= 0) {
        // 如果已存在,則增加其 count 計數值
        storageCart[isExistIndex].count += 1
      } else {
        // 如果不存在,則將 product 添加到 storageCart 中,並設置 count 為 1
        storageCart.push({ ...product, count: 1 })
      }

      // 將更新後的 storageCart 存回 localStorage
      localStorage.setItem('cart', JSON.stringify(storageCart))

      // 更新 this.cart 數組
      this.cart = storageCart
    },
    removeCart(product) {
      if (!product) return

      const isExistIndex = this.cart.findIndex((item) => item.prod_id === product.prod_id)
      if (isExistIndex >= 0 && this.cart[isExistIndex]['count'] > 1) {
        this.cart[isExistIndex]['count'] -= 1
      } else {
        // 移除陣列第幾個位置,一個
        this.cart.splice(isExistIndex, 1)
      }
      localStorage.setItem('cart', JSON.stringify(this.cart))
    },
    cleanCart() {
      this.cart = []
      localStorage.removeItem('cart')
    },
    fetchProductList() {
      fetch('http://localhost/CID101_G2_php/back/productManage/product_read.php')
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            alert(data.msg)
          } else if (data.products) {
            this.products = data.products
            localStorage.setItem('products', JSON.stringify(this.products))

          }
        })
    },
    getProductList() {
      let storage = localStorage.getItem('products')
      if (storage) {
        this.products = JSON.parse(storage)
      } else {
        this.products = []
      }
    },  
    fetchProductDetail(productId) {
      fetch('http://localhost/CID101_G2_php/back/productManage/product_read.php')
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.msg)
        } else if (data.products) {
          this.products = data.products
          this.detail = this.products.find((product) => product.prod_id === Number(productId))
          localStorage.setItem('detail', JSON.stringify(this.detail))

          }
        })
    },
    // getProductDetail() {
    //   let storage = localStorage.getItem('detail')
    //   if (storage) {
    //     this.detail = JSON.parse(storage)
    //   } else {
    //     this.detail = {}
    //   }
    // },
  }
})
