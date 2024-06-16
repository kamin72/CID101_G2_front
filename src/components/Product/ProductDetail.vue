<template>
  <div>
    <div class="container">
      <div class="row">
        <small class="col-12 scrumble">
          <span class="frontPage-bread"> <RouterLink to="/">首頁</RouterLink></span>
          <span class="material-symbols-outlined">arrow_forward_ios</span>
          <span class="product-bread"> <RouterLink to="/Product">我們的酒</RouterLink></span>
          <span class="material-symbols-outlined">arrow_forward_ios</span>{{ detail.name }}
        </small>
      </div>
    </div>

    <!-- 桌機版 -->
    <section class="section-product-detail">
      <div class="container" >
        <div class="product-detail">
          <div class="detail-img">
            <div class="detail-img-wrap">
              <!-- <img :src="detail.image" alt="" /> -->
              <img :src="parseImg(detail.image)" alt="Product Image" />
            </div>
          </div>

          <div class="product-info-wrap">
            <div class="detail-info">
              <div class="detail-item">
                <h4>{{ detail.name }}</h4>
                <p>{{ detail.ename }}</p>
              </div>

              <div class="detail-item">
                <p>類別 : {{ detail.category }}</p>
                <p>葡萄品種 : {{ detail.variety }}</p>
                <p>年份 : {{ detail.year }}</p>
              </div>

              <div class="detail-item">
                <p>
                  商品描述：<br />
                  {{ detail.describe }}
                </p>
              </div>

              <div class="detail-item">
                <h4>{{ detail.price }}</h4>
              </div>

              <div class="detail-button">
                <div class="amount">
                  <button class="cartbutton" @click="decrement">-</button>
                  <span class="num"> {{ count }}</span>
                  <button class="cartbutton" @click="increment">+</button>
                </div>

                <button class="small-btn-primary" @click="addToInquiry(product)">加入詢價單</button>
              </div>
            </div>

            <div class="line"></div>

            <div class="container">
              <div class="product-title">
                <h3>你可能喜歡的商品</h3>
              </div>
              <div class="product-cards row">
                <div class="col-6" v-for="like in likes" :key="like.id">
                  <div class="product-card">
                    <div class="product-img">
                      <RouterLink :to="'/ProductDetail/' + like.id">
                        <!-- <img :src="like.image" alt="Product Image" style="object-fit: contain" /> -->
                        <img :src="parseImg(like.image)" alt="Product Image" style="object-fit: contain" />
                      </RouterLink>
                    </div>

                    <div class="info-wrap">
                      <RouterLink :to="'/ProductDetail/' + like.id">
                      <div class="font-wrap">
                        <h4>{{ like.name }}</h4>
                        <p>{{ like.ename }}</p>
                        <p>{{ like.variety }}</p>
                      </div>
                      </RouterLink>
                      <h4>{{ like.price }}</h4>
                    </div>
                    <button class="add-card">加入詢價單</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 手機板 -->
    <section class="section-product-detail-sm">
      <div class="container">
        <div class="detail-img-sm">
          <div class="detail-img-wrap-sm">
            <img :src="parseImg(detail.image)" alt="Product Image"  />
          </div>
        </div>

        <div class="product-info-wrap-sm">
          <div class="detail-info-sm">
            <div class="detail-item-sm">
              <h4>{{ detail.name }}</h4>
              <p>{{ detail.ename }}</p>
            </div>

            <div class="detail-item-sm">
              <p>類別 : {{ detail.category }}</p>
              <p>葡萄品種 : {{ detail.variety }}</p>
              <p>年份 : {{ detail.year }}</p>
            </div>

            <div class="detail-item-sm">
              <p>
                商品描述：<br />
                {{ detail.describe }}
              </p>
            </div>

            <div class="detail-item-sm">
              <h4>{{ detail.price }}</h4>
            </div>
          </div>
        </div>

        <div class="detail-button-sm">
          <div class="amount-sm">
            <button class="cartbutton-sm" @click="decrement">-</button>
            <span class="num-sm"> {{ count }}</span>
            <button class="cartbutton-sm" @click="increment">+</button>
          </div>

          <button class="add-card-sm">加入詢價單</button>
        </div>
      </div>
    </section>

    <section class="section-liked-products-sm">
      <div class="container">
        <div class="product-title">
          <h3>你可能喜歡的商品</h3>
        </div>

        <div class="product-cards row">
          <div class="col-6" v-for="like in likes" :key="like.id">
            <div class="product-card">
              <div class="product-img">
                <RouterLink :to="'/ProductDetail/' + like.id">
                  <img :src="parseImg(like.image)" alt="Product Image" style="object-fit: contain" />
                </RouterLink>
              </div>

              <div class="info-wrap">
                <RouterLink :to="'/ProductDetail/' + like.id">
                <div class="font-wrap">
                  <h4>{{ like.name }}</h4>
                  <p>{{ like.ename }}</p>
                  <p>{{ like.variety }}</p>
                </div>
                </RouterLink>
                <h4>{{ like.price }}</h4>
              </div>
              <button class="add-card">加入詢價單</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import image1 from '@/assets/img/wine/Elegant-Red-Wine.png'
import image2 from '@/assets/img/wine/Pearl-White-Wine.png'
import image3 from '@/assets/img/wine/Ice-White-Wine.png'

export default {
  data() {
    return {
      count: 1,
      products:[],
      detail: []
    }
  },
  computed: {
    likes() {
      return this.products.filter((v) => v.id !== Number(this.$route.params.id)).slice(0, 4)
      // 篩裡面的id跟頁面的id不一樣的card,然後從裡面抽4個
    }
  },
  watch: {
    '$route.params.id'() {
      const productId = this.$route.params.id // 從路由參數中獲取產品 ID
      this.detail = this.products.find((product) => product.id === Number(productId)) // 根據 ID 找到對應的產品詳情
   }
  },
  created() {
    fetch("/product.json")
    .then(response => response.json())
    .then(data => {
    this.products = data
    const productId = this.$route.params.id // 從路由參數中獲取產品 ID
    this.detail = this.products.find((product) => product.id === Number(productId)) // 根據 ID 找到對應的產品詳情
    })
  },
  methods: {
    addToInquiry(product) {
      // 獲取當前的詢價單資訊,如果 localStorage 中沒有就初始化為空陣列
      let inquiry = JSON.parse(localStorage.getItem('inquiry')) || [];

      // 將商品資訊加入詢價單
      inquiry.push(product);

      // 將更新後的詢價單存回 localStorage
      localStorage.setItem('inquiry', JSON.stringify(inquiry));
    },
    increment() {
      if (this.count < 10) {
        this.count++
      }
    },
    decrement() {
      if (this.count > 0) {
        this.count--
      }
    },
    parseImg(file) {
        return new URL(`../../assets/img/wine/${file}`, import.meta.url).href
    },
  }
 }
</script>
