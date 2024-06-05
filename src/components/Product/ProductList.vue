<template>
<div class="product-page">
  <h1 class="title">Our Product</h1>
   <div class="collection-filter">
     <div class="container-filter">
        <div class="bt-filter" @click="toggleShopShow">
            <a href="#">
                葡萄酒類別
            </a>

            <div class="menu-filter" v-show="shopShow">
               <ul class="menu-content-filter">
                  <li>
                    <input type="checkbox" id="category" name="category"/>
                    <label for="category">紅酒</label>
                 </li>
                  <li>
                    <input type="checkbox" id="category" name="category"/>
                    <label for="category">白酒</label>
                </li>
                  <li>
                    <input type="checkbox" id="category" name="category"/>
                    <label for="category">粉紅酒</label>
                 </li>
                  <li>
                    <input type="checkbox" id="category" name="category"/>
                    <label for="category">氣泡酒</label>
                 </li>
                  <li>
                    <input type="checkbox" id="category" name="category"/>
                    <label for="category">加烈酒</label>
                </li>
               </ul>
               <button class="button-filter">確定</button>
            </div>
        </div>

        <div class="bt-filter">
            <a href="#">
                葡萄品種
            </a>
        </div>
        <div class="bt-filter">
           <a href="#">
             年份
           </a>
        </div>
        <div class="bt-filter">
           <a href="#">
            價格排序
           </a>
        </div>
     </div>
   </div>
</div>

  <div class="product-cards">
        <div class="product-card" v-for="product in products" :key="product.id">
        <div class="img-wrap">
           <!-- <img src="https://picsum.photos/300/200/?random=10" /> -->
           <img :src="product.image" alt="Product Image" />
        </div>
        <div class="info-wrap">
          <div class="font-wrap">
            <!-- <h4>典雅馥紅酒 2014</h4> -->
            <h4>{{ product.name }}</h4>
            <!-- <p>Elegant Red Wine 2014</p> -->
            <p> {{ product.ename }}</p>
            <!-- <p>波爾多混釀</p> -->
            <p>{{ product.variety }}</p>
          </div>
          <!-- <h4>NT$ 7,500</h4> -->
          <h4>{{ product.price }}</h4>
        </div>
        <div class="add-card">
          <p>加入詢價單</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    // name: 'ProductPage',
    data() {
      return {
        shopShow: false,
        products: [
          { id: 1, name: '典雅馥紅酒 2014', ename: 'Elegant Red Wine 2014', variety: '波爾多混釀', price: 'NT$ 7,500', image: 'https://picsum.photos/300/200/?random=1' },
          { id: 2, name: '典雅馥紅酒 2013', ename: 'Elegant Red Wine 2013', variety: '波爾多混釀', price: 'NT$ 7,600', image: 'https://picsum.photos/300/200/?random=2' },
          { id: 3, name: '典雅馥紅酒 2012', ename: 'Elegant Red Wine 2012', variety: '波爾多混釀', price: 'NT$ 8,000', image: 'https://picsum.photos/300/200/?random=3' },
          { id: 4, name: '典雅馥紅酒 2009', ename: 'Elegant Red Wine 2009', variety: '波爾多混釀', price: 'NT$ 8,200', image: 'https://picsum.photos/300/200/?random=4' },
          { id: 5, name: '珍珠白酒 2020', ename: 'Pearl White Wine 2020', variety: '波爾多混釀', price: 'NT$ 2,920', image: 'https://picsum.photos/300/200/?random=1' },
          { id: 6, name: '珍珠白酒 2019', ename: 'Pearl White Wine 2019', variety: '波爾多混釀', price: 'NT$ 3,600', image: 'https://picsum.photos/300/200/?random=2' },
          { id: 7, name: '水晶白酒 2018', ename: 'Ice White Wine 2018', variety: '阿里戈蝶', price: 'NT$ 1,000', image: 'https://picsum.photos/300/200/?random=3' },
          { id: 8, name: '水晶白酒 2017', ename: 'Ice White Wine 2017', variety: '阿里戈蝶', price: 'NT$ 1,100', image: 'https://picsum.photos/300/200/?random=4' },
          { id: 9, name: '星光粉紅酒 2011', ename: 'Star Rosé Wine 2011', variety: '黑皮諾', price: 'NT$ 2,750', image: 'https://picsum.photos/300/200/?random=1' },
          { id: 10, name: '星光粉紅酒 2010', ename: 'Star Rosé Wine 2010', variety: '黑皮諾', price: 'NT$ 3,000', image: 'https://picsum.photos/300/200/?random=2' },
          { id: 11, name: '粉露粉紅酒 2016', ename: 'Dew Rosé Wine 2016', variety: '黑皮諾', price: 'NT$ 5,050', image: 'https://picsum.photos/300/200/?random=3' },
          { id: 12, name: '粉露粉紅酒 2012', ename: 'Dew Rosé Wine 2012', variety: '黑皮諾', price: 'NT$ 5,250', image: 'https://picsum.photos/300/200/?random=4' },
          { id: 13, name: '藍天氣泡酒 2016 ', ename: 'Sky Sparkling Wine 2016', variety: '夏多內', price: 'NT$ 1,720', image: 'https://picsum.photos/300/200/?random=1' },
          { id: 14, name: '藍天氣泡酒 2015', ename: 'Sky Sparkling Wine 2015', variety: '夏多內', price: 'NT$ 2,000', image: 'https://picsum.photos/300/200/?random=2' },
          { id: 15, name: '星辰加烈酒 2016', ename: 'Star Fortified Wine 2016', variety: '帕洛米諾', price: 'NT$ 830', image: 'https://picsum.photos/300/200/?random=3' },
          { id: 16, name: '星辰加烈酒 2014', ename: 'Star Fortified Wine 2014', variety: '帕洛米諾', price: 'NT$ 900', image: 'https://picsum.photos/300/200/?random=4' }
         
        ]
      };
    },
    methods:{
        toggleShopShow () {
        this.shopShow = !this.shopShow
    }
  }
};
  </script>
  
  <style lang="scss">
  .product-page {
    padding: 20px;
  }
  
  .title {
    text-align: center;
    margin-bottom: 50px;
    font-size: 2rem;
    color: #333;
  }


  .collection-filter{
    display: flex;
    justify-content: center;
     margin-bottom: 80px;
  }

  .container-filter{
    display: flex;
  }

  .bt-filter{
    width: 150px; 
    position: relative;
    padding: 5px 40px 5px 25px;
  }

.bt-filter a {
    text-decoration: none;
    color: black;
}

.bt-filter a:before {
    right: 16px;
    position: absolute;
    content: "";
    width: 5px;
    height: 5px;
    border-right: 1px solid #333;
    border-bottom: 1px solid #333;
    transform: rotate(45deg);
}

.menu-filter{
    width: 100%;
    background-color: #DFD4C3;
    padding: 5px;
}

.menu-content-filter{
    width: 100%;

}

.menu-content-filter li{
    margin-right: 10px;
    margin-bottom: 10px;
}

.menu-content-filter input{
    margin-bottom: 8px;
    margin-right: 5px;
}


.button-filter{
    background-color: #322D26;
    color: white;
    padding: 5px 8px;
}


.product-cards {
     display: grid;
     grid-template-columns: repeat(4, 1fr);
     gap: 20px;
}
  
.product-card {
      margin-bottom: 50px;
}
  
  



  </style>