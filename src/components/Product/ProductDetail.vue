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
      <div class="container">
        <div class="product-detail">
          <div class="detail-img">
            <div class="detail-img-wrap">
              <img :src="detail.image" alt="" />
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
                  <button class="small-btn-invalid" @click="decrement">-</button>
                  <span class="num"> {{ count }}</span>
                  <button class="small-btn-invalid" @click="increment">+</button>
                </div>

                <button class="add-card">加入詢價單</button>
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
                        <img :src="like.image" alt="Product Image" style="object-fit: contain" />
                      </RouterLink>
                    </div>

                    <div class="info-wrap">
                      <!-- <RouterLink :to="'/ProductDetail/' + like.id"> -->
                      <div class="font-wrap">
                        <h4>{{ like.name }}</h4>
                        <p>{{ like.ename }}</p>
                        <p>{{ like.variety }}</p>
                      </div>
                      <!-- </RouterLink> -->
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
            <img src="@/assets/img/wine/Elegant-Red-Wine.png" />
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
            <button class="small-btn-invalid" @click="decrement">-</button>
            <span class="num-sm"> {{ count }}</span>
            <button class="small-btn-invalid" @click="increment">+</button>
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
                  <img :src="like.image" alt="Product Image" style="object-fit: contain" />
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
      products: [
        {
          id: 1,
          name: '典雅馥紅酒 2014',
          ename: 'Elegant Red Wine 2014',
          category: '紅酒',
          variety: '波爾多混釀',
          year: '2014年',
          price: 'NT$ 7,500',
          price2: 7500,
          image: image1,
          describe:
            '這款紅酒散發出迷人的紅櫻桃、覆盆子和玫瑰花香氣，伴隨著淡淡的香料和泥土氣息。入口細膩，口感絲滑，酸度明亮且平衡，展現出優雅的結構和層次感。餘味持久且清新，帶有一絲薄荷和甘草的回味。'
        },
        {
          id: 2,
          name: '典雅馥紅酒 2013',
          ename: 'Elegant Red Wine 2013',
          category: '紅酒',
          variety: '波爾多混釀',
          year: '2013年',
          price: 'NT$ 7,600',
          price2: 7600,
          image: image1,
          describe:
            '這款紅酒散發出迷人的紅櫻桃、覆盆子和玫瑰花香氣，伴隨著淡淡的香料和泥土氣息。入口細膩，口感絲滑，酸度明亮且平衡，展現出優雅的結構和層次感。餘味持久且清新，帶有一絲薄荷和甘草的回味。'
        },
        {
          id: 3,
          name: '典雅馥紅酒 2012',
          ename: 'Elegant Red Wine 2012',
          category: '紅酒',
          variety: '波爾多混釀',
          year: '2012年',
          price: 'NT$ 8,000',
          price2: 8000,
          image: image1,
          describe:
            '這款紅酒散發出迷人的紅櫻桃、覆盆子和玫瑰花香氣，伴隨著淡淡的香料和泥土氣息。入口細膩，口感絲滑，酸度明亮且平衡，展現出優雅的結構和層次感。餘味持久且清新，帶有一絲薄荷和甘草的回味。'
        },
        {
          id: 4,
          name: '典雅馥紅酒 2009',
          ename: 'Elegant Red Wine 2009',
          category: '紅酒',
          variety: '波爾多混釀',
          year: '2009年',
          price: 'NT$ 8,200',
          price2: 8200,
          image: image1,
          describe:
            '這款紅酒散發出迷人的紅櫻桃、覆盆子和玫瑰花香氣，伴隨著淡淡的香料和泥土氣息。入口細膩，口感絲滑，酸度明亮且平衡，展現出優雅的結構和層次感。餘味持久且清新，帶有一絲薄荷和甘草的回味。'
        },
        {
          id: 5,
          name: '珍珠白酒 2020',
          ename: 'Pearl White Wine 2020',
          category: '白酒',
          variety: '波爾多混釀',
          year: '2020年',
          price: 'NT$ 2,920',
          price2: 2920,
          image: image2,
          describe:
            '這款白酒具有柑橘類水果和白桃的香氣，伴隨著一絲礦物質和海鹽的味道。口感清爽，酸度活潑，餘味悠長。是搭配海鮮的絕佳選擇。'
        },
        {
          id: 6,
          name: '珍珠白酒 2019',
          ename: 'Pearl White Wine 2019',
          category: '白酒',
          variety: '波爾多混釀',
          year: '2019年',
          price: 'NT$ 3,600',
          price2: 3600,
          image: image2,
          describe:
            '這款白酒具有柑橘類水果和白桃的香氣，伴隨著一絲礦物質和海鹽的味道。口感清爽，酸度活潑，餘味悠長。是搭配海鮮的絕佳選擇。'
        },
        {
          id: 7,
          name: '水晶白酒 2018',
          ename: 'Ice White Wine 2018',
          category: '白酒',
          variety: '阿里戈蝶',
          year: '2018年',
          price: 'NT$ 1,000',
          price2: 1000,
          image: image3,
          describe:
            '這款白酒口感輕盈、清爽，帶有綠蘋果、梨和柑橘的香氣。酸度中等，餘味乾爽。是一款非常適合炎熱天氣飲用的白酒，可以搭配各類清淡料理。'
        },
        {
          id: 8,
          name: '水晶白酒 2017',
          ename: 'Ice White Wine 2017',
          category: '白酒',
          variety: '阿里戈蝶',
          year: '2017年',
          price: 'NT$ 1,100',
          price2: 1100,
          image: image3,
          describe:
            '這款白酒口感輕盈、清爽，帶有綠蘋果、梨和柑橘的香氣。酸度中等，餘味乾爽。是一款非常適合炎熱天氣飲用的白酒，可以搭配各類清淡料理。'
        }
      ]
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
    const productId = this.$route.params.id // 從路由參數中獲取產品 ID
    this.detail = this.products.find((product) => product.id === Number(productId)) // 根據 ID 找到對應的產品詳情
  },
  methods: {
    increment() {
      if (this.count < 10) {
        this.count++
      }
    },
    decrement() {
      if (this.count > 0) {
        this.count--
      }
    }
  }
}
</script>
