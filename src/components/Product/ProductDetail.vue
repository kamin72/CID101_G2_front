<template>
  <div>
    <div class="container">
      <div class="row">
        <small class="col-12 scrumble">
          <span class="frontPage-bread"> <RouterLink to="/">首頁</RouterLink></span>
          <span class="material-symbols-outlined">arrow_forward_ios</span>
          <span class="product-bread"> <RouterLink to="/Product">我們的酒</RouterLink></span>
          <span class="material-symbols-outlined">arrow_forward_ios</span>{{ detail?.prod_name }}
        </small>
      </div>
    </div>

    <!-- 桌機版 -->
    <section class="section-product-detail">
      <div class="container" >
        <div class="product-detail">
          <div class="detail-img">
            <div class="detail-img-wrap" :style="{backgroundImage: `url(${parseServerImg(detail?.bg_img)})`}">
              <!-- <img :src="detail.image" alt="" /> -->
              <img :src="parseServerImg(detail?.prod_img)" alt="Product Image" />
            </div>
          </div>

          <div class="product-info-wrap">
            <div class="detail-info">
              <div class="detail-item">
                <h4>{{ detail?.prod_name }}</h4>
                <p>{{ detail?.prod_ename }}</p>
              </div>

              <div class="detail-item">
                <p>類別 : {{ detail?.prod_category }}</p>
                <p>葡萄品種 : {{ detail?.prod_variety }}</p>
                <p>年份 : {{ detail?.prod_year }}</p>
              </div>

              <div class="detail-item">
                <p>
                  商品描述：<br />
                  {{ detail?.prod_describe }}
                </p>
              </div>

              <div class="detail-item">
                <h4>NT$ {{ detail?.prod_price }}</h4>
              </div>

              <div class="detail-button">
                <div class="amount">
                  <button class="cartbutton" @click="decrement">-</button>
                  <span class="num"> {{ count }}</span>
                  <button class="cartbutton" @click="increment">+</button>
                </div>

                <button class="small-btn-primary" @click="addCart(detail)">加入詢價單</button>
              </div>
            </div>

            <div class="line"></div>

            <div class="container">
              <div class="product-title">
                <h3>你可能喜歡的商品</h3>
              </div>
              <div class="product-cards row">
                <div class="col-6" v-for="like in likes" :key="like.prod_id">
                  <div class="product-card">
                    <div class="product-img">
                      <RouterLink :to="'/ProductDetail/' + like?.prod_id">
                        <!-- <img :src="like.image" alt="Product Image" style="object-fit: contain" /> -->
                        <img :src="parseServerImg(like?.prod_img)" alt="Product Image" style="object-fit: contain" />
                      </RouterLink>
                    </div>

                    <div class="info-wrap">
                      <RouterLink :to="'/ProductDetail/' + like?.prod_id">
                      <div class="font-wrap">
                        <h4>{{ like?.prod_name }}</h4>
                        <p>{{ like?.prod_ename }}</p>
                        <p>{{ like?.prod_variety }}</p>
                      </div>
                      </RouterLink>
                      <h4>NT$ {{ like?.prod_price }}</h4>
                    </div>
                    <button class="add-card" @click="addCart(like)">加入詢價單</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 手機版 -->
    <section class="section-product-detail-sm">
      <div class="container">
        <div class="detail-img-sm">
          <div class="detail-img-wrap-sm" :style="{backgroundImage: `url(${parseServerImg(detail?.bg_img)})`}">
            <img :src="parseServerImg(detail?.prod_img)" alt="Product Image"  />
          </div>
        </div>

        <div class="product-info-wrap-sm">
          <div class="detail-info-sm">
            <div class="detail-item-sm">
              <h4>{{ detail?.prod_name }}</h4>
              <p>{{ detail?.prod_ename }}</p>
            </div>

            <div class="detail-item-sm">
              <p>類別 : {{ detail?.prod_category }}</p>
              <p>葡萄品種 : {{ detail?.prod_variety }}</p>
              <p>年份 : {{ detail?.prod_year }}</p>
            </div>

            <div class="detail-item-sm">
              <p>
                商品描述：<br />
                {{ detail?.prod_describe }}
              </p>
            </div>

            <div class="detail-item-sm">
              <h4>NT$ {{ detail?.prod_price }}</h4>
            </div>
          </div>
        </div>

        <div class="detail-button-sm">
          <div class="amount-sm">
            <button class="cartbutton-sm" @click="decrement">-</button>
            <span class="num-sm"> {{ count }}</span>
            <button class="cartbutton-sm" @click="increment">+</button>
          </div>

          <button class="add-card-sm" @click="addCart(detail)">加入詢價單</button>
        </div>
      </div>
    </section>

    <section class="section-liked-products-sm">
      <div class="container">
        <div class="product-title">
          <h3>你可能喜歡的商品</h3>
        </div>

        <div class="product-cards row">
          <div class="col-6" v-for="like in likes" :key="like.prod_id">
            <div class="product-card">
              <div class="product-img">
                <RouterLink :to="'/ProductDetail/' + like?.prod_id">
                  <img :src="parseServerImg(like?.prod_img)" alt="Product Image" style="object-fit: contain" />
                </RouterLink>
              </div>

              <div class="info-wrap">
                <RouterLink :to="'/ProductDetail/' + like?.prod_id">
                <div class="font-wrap">
                  <h4>{{ like?.prod_name }}</h4>
                  <p>{{ like?.prod_ename }}</p>
                  <p>{{ like?.prod_variety }}</p>
                </div>
                </RouterLink>
                <h4>NT$ {{ like?.prod_price }}</h4>
              </div>
              <button class="add-card" @click="addCart(like)">加入詢價單</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// import image1 from '@/assets/img/wine/Elegant-Red-Wine.png'
// import image2 from '@/assets/img/wine/Pearl-White-Wine.png'
// import image3 from '@/assets/img/wine/Ice-White-Wine.png'
import { mapState, mapActions } from 'pinia'
import cartStore from '@/stores/cart'

export default {
  data() {
    return {
      count: 1,
      // products:[],
      // detail: {} //如果要用null, 要加v-if="detail"
    }
  },
  computed: {
    ...mapState(cartStore, ['cart','cartCount','products', 'detail']),
    likes() {
      return this.products.filter((v) => v.prod_id !== Number(this.$route.params.id)).slice(0, 4)
      // 篩裡面的id跟頁面的id不一樣的card,然後從裡面抽4個
    }
  },
  watch: {
    '$route.params.id'() {
      const productId = this.$route.params.id // 從路由參數中獲取產品 ID
      this.detail = this.products.find((product) => product.prod_id === Number(productId)) // 根據 ID 找到對應的產品詳情
      this.fetchProductDetail(productId);
    }
  },
  created() {
    const productId = this.$route.params.id
    this.fetchProductDetail(productId);
    // this.getProductDetail()
    // 部屬用-解析伺服器json位置
    // fetch(`${import.meta.env.VITE_API_URL}/product.json`)
    // .then(response => response.json())
    // .then(data => {
    // this.products = data
    // const productId = this.$route.params.id // 從路由參數中獲取產品 ID
    // this.detail = this.products.find((product) => product.prod_id === Number(productId)) // 根據 ID 找到對應的產品詳情
    // })
  },
  methods: {
    ...mapActions(cartStore, ['checkCart','addCart','fetchProductDetail','getProductDetail']),
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
    parseServerImg(file) {
      return `${import.meta.env.VITE_FILE_URL}/${file}`
    },
  }
}
</script>
