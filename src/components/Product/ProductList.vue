<template>

  <div class="container">
    <div class="row">
      <small class="col-12 scrumble">首頁<span class="material-symbols-outlined">arrow_forward_ios</span>我們的酒
      </small>
    </div>
  </div>

  <div class="product-title-filter">

    <div class="col-12 our-product">
      <div class="title-wrap">
        <div class="line"></div>
        <h2>Our Product</h2>
        <div class="line"></div>
     </div>
    </div>

    <div class="filters">
      <div class="filter" v-for="(dropdown, index) in dropdowns" :key="index">
        <button class="filter-button"
        @click="toggleDropdown(index)">
          <span class="button-text"> {{ dropdown.label }}</span>
          <i class="fa-solid fa-angle-down"></i>
        </button>
       
      <div class="menu-filter">
        <ul v-show="dropdown.isOpen">
          <li v-for="option in dropdown.options" :key="option">
            <input type="checkbox" id="category" name="category" />
            <label for="category"> {{ option }}</label>
          </li>
          <li><button class="menu-filter-button">確定</button></li>
        </ul>
      </div>
      </div>
    </div>
  </div>

  <!-- <RouterLink to="/product-detail">
  </RouterLink> -->

  <div class="container">
    <div class="product-cards row">
      <div class="col-3" v-for="product in products" :key="product.id">
        <div class="product-card">
        
          <div class="img-wrap">
            <RouterLink to="/product-detail">
            <img :src="product.image" alt="Product Image" style="width: 277.5px; height: 200px; object-fit: contain;" />
            </RouterLink>
            <!-- <img src= '@/assets/img/wine/bannerwine.png' alt="Product Image" /> -->
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

</template>

<script>
import image1 from '@/assets/img/wine/Elegant-Red-Wine.png'
import image2 from '@/assets/img/wine/Pearl-White-Wine.png'
import image3 from '@/assets/img/wine/Ice-White-Wine.png'
import image4 from '@/assets/img/wine/Star-Rosé-Wine.png'
import image5 from '@/assets/img/wine/Dew-Rosé-Wine.png'
import image6 from '@/assets/img/wine/Sky-Sparkling-Wine.png'
import image7 from '@/assets/img/wine/Star-Fortified-Wine.png'

export default {
  data() {
    return {
      dropdowns: [
        {
          label: '葡萄酒類別',
          isOpen: false,
          options: ['紅酒', '白酒', '粉紅酒','氣泡酒','加烈酒']
        },
        {
          label: '葡萄品種',
          isOpen: false,
          options: ['波爾多混釀', '阿里戈蝶', '黑皮諾', '夏多內', '帕洛米諾']
        },
        {
          label: '年份',
          isOpen: false,
          options: ['2020年', '2019年', '2018年','2017年', '2016年', '2015年','2014年', '2013年', '2012年','2011年', '2010年', '2009年']
        },
        {
          label: '價格排序',
          isOpen: false,
          options: ['價格由高到低', '價格由低到高']
        }
      ],
      products: [
        {
          id: 1,
          name: '典雅馥紅酒 2014',
          ename: 'Elegant Red Wine 2014',
          variety: '波爾多混釀',
          price: 'NT$ 7,500',
          image: image1
        },
        {
          id: 2,
          name: '典雅馥紅酒 2013',
          ename: 'Elegant Red Wine 2013',
          variety: '波爾多混釀',
          price: 'NT$ 7,600',
          image: image1
        },
        {
          id: 3,
          name: '典雅馥紅酒 2012',
          ename: 'Elegant Red Wine 2012',
          variety: '波爾多混釀',
          price: 'NT$ 8,000',
          image: image1
        },
        {
          id: 4,
          name: '典雅馥紅酒 2009',
          ename: 'Elegant Red Wine 2009',
          variety: '波爾多混釀',
          price: 'NT$ 8,200',
          image: image1
        },
        {
          id: 5,
          name: '珍珠白酒 2020',
          ename: 'Pearl White Wine 2020',
          variety: '波爾多混釀',
          price: 'NT$ 2,920',
          image: image2
        },
        {
          id: 6,
          name: '珍珠白酒 2019',
          ename: 'Pearl White Wine 2019',
          variety: '波爾多混釀',
          price: 'NT$ 3,600',
          image: image2
        },
        {
          id: 7,
          name: '水晶白酒 2018',
          ename: 'Ice White Wine 2018',
          variety: '阿里戈蝶',
          price: 'NT$ 1,000',
          image: image3
        },
        {
          id: 8,
          name: '水晶白酒 2017',
          ename: 'Ice White Wine 2017',
          variety: '阿里戈蝶',
          price: 'NT$ 1,100',
          image: image3
        },
        {
          id: 9,
          name: '星光粉紅酒 2011',
          ename: 'Star Rosé Wine 2011',
          variety: '黑皮諾',
          price: 'NT$ 2,750',
          image: image4
        },
        {
          id: 10,
          name: '星光粉紅酒 2010',
          ename: 'Star Rosé Wine 2010',
          variety: '黑皮諾',
          price: 'NT$ 3,000',
          image: image4
        },
        {
          id: 11,
          name: '粉露粉紅酒 2016',
          ename: 'Dew Rosé Wine 2016',
          variety: '黑皮諾',
          price: 'NT$ 5,050',
          image: image5
        },
        {
          id: 12,
          name: '粉露粉紅酒 2012',
          ename: 'Dew Rosé Wine 2012',
          variety: '黑皮諾',
          price: 'NT$ 5,250',
          image: image5
        },
        {
          id: 13,
          name: '藍天氣泡酒 2016 ',
          ename: 'Sky Sparkling Wine 2016',
          variety: '夏多內',
          price: 'NT$ 1,720',
          image: image6
        },
        {
          id: 14,
          name: '藍天氣泡酒 2015',
          ename: 'Sky Sparkling Wine 2015',
          variety: '夏多內',
          price: 'NT$ 2,000',
          image: image6
        },
        {
          id: 15,
          name: '星辰加烈酒 2016',
          ename: 'Star Fortified Wine 2016',
          variety: '帕洛米諾',
          price: 'NT$ 830',
          image: image7
        },
        {
          id: 16,
          name: '星辰加烈酒 2014',
          ename: 'Star Fortified Wine 2014',
          variety: '帕洛米諾',
          price: 'NT$ 900',
          image: image7
        }
      ]

    };
  },
  methods: {
    toggleDropdown(index) {
      this.dropdowns[index].isOpen = !this.dropdowns[index].isOpen;
    }
  }
};
</script>
