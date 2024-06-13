<template>

    <div class="container">
    <div class="row">
      <small class="col-12 scrumble">首頁<span class="material-symbols-outlined">arrow_forward_ios</span>我們的酒<span class="material-symbols-outlined">arrow_forward_ios</span>典雅馥紅酒 2014
      </small>
    </div>
  </div>

<!-- 桌機版 -->
<section class="section-product-detail">
  <div class="container">
     <div class="product-detail">

      <div class="detail-img">
         <div class="detail-img-wrap">
          <img src="@/assets/img/wine/Elegant-Red-Wine.png" />
         </div>
       </div>

       <div class="product-info-wrap">
         <div class="detail-info">
          <div class="detail-item">
            <h4>典雅馥紅酒 2014</h4>
            <!-- <h4>{{ detail.name }}</h4> -->
            <p>Elegant Red Wine 2014</p>
          </div>

          <div class="detail-item">
            <!-- <p>{{ detail.ename }}</p> -->
            <p>類別 :  紅酒</p>
            <!-- <p>{{ detail.category }}</p> -->
            <p>葡萄品種 : 波爾多混釀</p>
            <!-- <p>{{ detail.variety }}</p> -->
            <p>年份 : 2014年</p>
            <!-- <p>{{ detail.year }}</p> -->
          </div>

          <div class="detail-item">      
          <p>商品描述：<br>
                這款紅酒散發出迷人的紅櫻桃、覆盆子和玫瑰花香氣，伴隨著淡淡的香料和泥土氣息。入口細膩，口感絲滑，酸度明亮且平衡，展現出優雅的結構和層次感。餘味持久且清新，帶有一絲薄荷和甘草的回味。</p>
              <!-- <p>{{ detail.description }}</p> -->
          </div>

          <div class="detail-item">  
              <h4>NT$ 7,500</h4>
              <!-- <h4>{{ detail.price }}</h4> -->
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
            <div class="col-6" v-for="product in products" :key="product.id">
             <div class="product-card">
              <div class="product-img">
              <RouterLink to="/product-detail">
                <img :src="product.image" alt="Product Image" style="object-fit: contain;" />
              </RouterLink>
            </div>
    
            <div class="info-wrap">
              <RouterLink to="/product-detail">
              <div class="font-wrap">
                <!-- <h4>典雅馥紅酒 2014</h4> -->
                <h4>{{ product.name }}</h4>
                <!-- <p>Elegant Red Wine 2014</p> -->
                <p>{{ product.ename }}</p>
                <!-- <p>波爾多混釀</p> -->
                <p>{{ product.variety }}</p>
              </div>
              </RouterLink>
               <!-- <h4>NT$ 7,500</h4> -->
              <h4>{{ product.price }}</h4>
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
            <h4>典雅馥紅酒 2014</h4>
            <!-- <h4>{{ detail.name }}</h4> -->
            <p>Elegant Red Wine 2014</p>
          </div>

          <div class="detail-item-sm">
            <!-- <p>{{ detail.ename }}</p> -->
            <p>類別 :  紅酒</p>
            <!-- <p>{{ detail.category }}</p> -->
            <p>葡萄品種 : 波爾多混釀</p>
            <!-- <p>{{ detail.variety }}</p> -->
            <p>年份 : 2014年</p>
            <!-- <p>{{ detail.year }}</p> -->
          </div>

          <div class="detail-item-sm">      
          <p>商品描述：<br>
                這款紅酒散發出迷人的紅櫻桃、覆盆子和玫瑰花香氣，伴隨著淡淡的香料和泥土氣息。入口細膩，口感絲滑，酸度明亮且平衡，展現出優雅的結構和層次感。餘味持久且清新，帶有一絲薄荷和甘草的回味。</p>
              <!-- <p>{{ detail.description }}</p> -->
          </div>

          <div class="detail-item-sm">  
              <h4>NT$ 7,500</h4>
              <!-- <h4>{{ detail.price }}</h4> -->
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
      <div class="col-6" v-for="product in products" :key="product.id">
        <div class="product-card">
          <div class="product-img">
              <RouterLink to="/product-detail">
                <img :src="product.image" alt="Product Image" style="object-fit: contain;" />
              </RouterLink>
          </div>
    
            <div class="info-wrap">
              <RouterLink to="/product-detail">
              <div class="font-wrap">
                <!-- <h4>典雅馥紅酒 2014</h4> -->
                <h4>{{ product.name }}</h4>
                <!-- <p>Elegant Red Wine 2014</p> -->
                <p>{{ product.ename }}</p>
                <!-- <p>波爾多混釀</p> -->
                <p>{{ product.variety }}</p>
              </div>
              </RouterLink>
               <!-- <h4>NT$ 7,500</h4> -->
              <h4>{{ product.price }}</h4>
            </div>
            <button class="add-card">加入詢價單</button>
        </div>

      </div>
    </div>

</div>
</section>

<!-- <div class="background-img">
  <img src= '@/assets/img/wine/Background-image.png' alt="Product Image" /> 
</div> -->


</template>


<script>
// import bgimg from '@/assets/img/wine/Background-image.png'
import image1 from '@/assets/img/wine/Elegant-Red-Wine.png'
import image2 from '@/assets/img/wine/Pearl-White-Wine.png'

export default {
 data(){
     return{
      count: 1,
    //   details:[
    //    {
    //      id: 1,
    //      name: '典雅馥紅酒 2014',
    //      ename: 'Elegant Red Wine 2014',
    //      category: '紅酒',
    //      variety: '波爾多混釀',
    //      year: '2014年',
    //      description: '這款紅酒散發出迷人的紅櫻桃、覆盆子和玫瑰花香氣，伴隨著淡淡的香料和泥土氣息。入口細膩，口感絲滑，酸度明亮且平衡，展現出優雅的結構和層次感。餘味持久且清新，帶有一絲薄荷和甘草的回味。',
    //      price: 'NT$ 7,500',
    //      image: image1
    //    },
    //    {
    //      id: 2,
    //      name: '典雅馥紅酒 2013',
    //      ename: 'Elegant Red Wine 2013',
    //      category: '紅酒',
    //      variety: '波爾多混釀',
    //      year: '2013年',
    //      description: '這款紅酒散發出迷人的紅櫻桃、覆盆子和玫瑰花香氣，伴隨著淡淡的香料和泥土氣息。入口細膩，口感絲滑，酸度明亮且平衡，展現出優雅的結構和層次感。餘味持久且清新，帶有一絲薄荷和甘草的回味。',
    //      price: 'NT$ 7,600',
    //      image: image1
    //    },
    //    {
    //      id: 3,
    //      name: '典雅馥紅酒 2012',
    //      ename: 'Elegant Red Wine 2012',
    //      category: '紅酒',
    //      variety: '波爾多混釀',
    //      year: '2012年',
    //      description: '這款紅酒散發出迷人的紅櫻桃、覆盆子和玫瑰花香氣，伴隨著淡淡的香料和泥土氣息。入口細膩，口感絲滑，酸度明亮且平衡，展現出優雅的結構和層次感。餘味持久且清新，帶有一絲薄荷和甘草的回味。',
    //      price: 'NT$ 8,000',
    //      image: image1
    //    }
    //   ]
    

    products: [
        {
          id: 1,
          name: '典雅馥紅酒 2013',
          ename: 'Elegant Red Wine 2013',
          variety: '波爾多混釀',
          price: 'NT$ 7,600',
          image: image1
        },
        {
          id: 2,
          name: '典雅馥紅酒 2012',
          ename: 'Elegant Red Wine 2012',
          variety: '波爾多混釀',
          price: 'NT$ 8,000',
          image: image1
        },
        {
          id: 3,
          name: '典雅馥紅酒 2009',
          ename: 'Elegant Red Wine 2009',
          variety: '波爾多混釀',
          price: 'NT$ 8,200',
          image: image1
        },
        {
          id: 4,
          name: '珍珠白酒 2020',
          ename: 'Pearl White Wine 2020',
          variety: '波爾多混釀',
          price: 'NT$ 2,920',
          image: image2
        }
      ]
    };
 },
 methods: {
  increment() {
      if (this.count < 10) {
        this.count++;
      }
    },
    decrement() {
      if (this.count > 0) {
        this.count--;
      }
    },
 },
};
</script>