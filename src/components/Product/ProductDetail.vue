<template>
    <div class="container">
    <div class="row">
      <small class="col-12 scrumble">首頁<span class="material-symbols-outlined">arrow_forward_ios</span>我們的酒<span class="material-symbols-outlined">arrow_forward_ios</span>典雅馥紅酒 2014
      </small>
    </div>
  </div>

  <div class="container">
    <div class="product-detail">
        <div class="product-item">
          <div class="img-wrap">
            <img :src="product.image" alt="Product Image" style="width: 277.5px; height: 200px; object-fit: contain;" />
          </div>
          <div class="info-wrap">
            <div class="font-wrap">
              <h4>{{ detail.name }}</h4>
              <p>{{ detail.ename }}</p>
              <p>{{ detail.category }}</p>
              <p>{{ detail.variety }}</p>
              <p>{{ detail.year }}</p>
            <div>
            <div class="font-wrap">      
              <p>{{ detail.description }}</p>
             </div>
            </div>
            <h4>{{ product.price }}</h4>

           </div>
          <button class="add-card">加入詢價單</button>
          </div>
      
        </div>
    </div>
  </div>

  
</template>


<script>
export default {
 data(){
    return{
      details:[
       {
         id: 1,
         name: '典雅馥紅酒 2014',
         ename: 'Elegant Red Wine 2014',
         category: '紅酒',
         variety: '波爾多混釀',
         year: '2014年',
         description: '這款紅酒散發出迷人的紅櫻桃、覆盆子和玫瑰花香氣，伴隨著淡淡的香料和泥土氣息。入口細膩，口感絲滑，酸度明亮且平衡，展現出優雅的結構和層次感。餘味持久且清新，帶有一絲薄荷和甘草的回味。',
         price: 'NT$ 7,500',
         image: image1
       },
       {
         id: 2,
         name: '典雅馥紅酒 2013',
         ename: 'Elegant Red Wine 2013',
         category: '紅酒',
         variety: '波爾多混釀',
         year: '2013年',
         description: '這款紅酒散發出迷人的紅櫻桃、覆盆子和玫瑰花香氣，伴隨著淡淡的香料和泥土氣息。入口細膩，口感絲滑，酸度明亮且平衡，展現出優雅的結構和層次感。餘味持久且清新，帶有一絲薄荷和甘草的回味。',
         price: 'NT$ 7,600',
         image: image1
       },
       {
         id: 3,
         name: '典雅馥紅酒 2012',
         ename: 'Elegant Red Wine 2012',
         category: '紅酒',
         variety: '波爾多混釀',
         year: '2012年',
         description: '這款紅酒散發出迷人的紅櫻桃、覆盆子和玫瑰花香氣，伴隨著淡淡的香料和泥土氣息。入口細膩，口感絲滑，酸度明亮且平衡，展現出優雅的結構和層次感。餘味持久且清新，帶有一絲薄荷和甘草的回味。',
         price: 'NT$ 8,000',
         image: image1
       }
      ]
    };
 },
 methods: {
    
 },
};
</script>