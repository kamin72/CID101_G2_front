
import { defineStore } from 'pinia'

export default defineStore('cartStore', {
  // 對應 data
  state: () => ({
    cart:[]
  }),

  // 對應 computed (物件形式)
  getters: {
    cartCount: (state) => state.cart.length
  },

  // 對應 methods (物件形式)
  actions: {
    prodData() {
     fetch("/product.json")
     .then(response => response.json())
     .then(data => {
        this.cart = data;
      })
    },
    checkCart(){
      const storageCart = localStorage.getItem('cart')
      if(this.cart.length > 0 ){
        return this.cart
      }else if(storageCart){
        const cartArray = JSON.parse(storageCart)
        this.cart = cartArray
        return cartArray
      }else{
        return []
      }
    },
    addCart (product) {
      if(!product) return

      const isExistIndex = this.cart.findIndex(item => item.id === product.id)
      if(isExistIndex >= 0){
        this.cart[isExistIndex]['count'] += 1
      }else{
        this.cart.push({
          ...product,
          count: 1
        })
      }
      localStorage.setItem('cart', JSON.stringify(this.cart))
    },
    removeCart (product) {
      if(!product) return

      const isExistIndex = this.cart.findIndex(item => item.id === product.id)
      if(isExistIndex >= 0 && this.cart[isExistIndex]['count'] > 1){
        this.cart[isExistIndex]['count'] -= 1
      }else{
        // 移除陣列第幾個位置,一個
        this.cart.splice(isExistIndex, 1);
      }
      localStorage.setItem('cart', JSON.stringify(this.cart))
    },
    cleanCart() {
      this.cart = []
      localStorage.removeItem('cart')
    }
  }
})