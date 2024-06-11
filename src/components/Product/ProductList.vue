<template>
  <div class="container">
    <div class="row">
      <!-- 頁面導航顯示 -->
      <small class="col-12 scrumble">首頁<span class="material-symbols-outlined">arrow_forward_ios</span>我們的酒</small>
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

    <!-- 篩選器區域 -->
   <div class="filter-block">
    <div class="filters">
      <!-- 迭代每個篩選器資料 -->
      <div class="filter" v-for="(dropdown, index) in dropdowns" :key="index">
          <button class="filter-button" @click="toggleDropdown(index)">
           <span class="button-text"> {{ dropdown.label }}</span>
           <span v-if="dropdown.isMenuVisible"><i class="fa-solid fa-angle-up"></i></span>
           <span v-else><i class="fa-solid fa-angle-down"></i></span>
        </button>

        <!-- 篩選器選項清單 -->
        <div class="menu-filter">
          <!-- 使用 v-show 指令根據 dropdown.isOpen 狀態顯示或隱藏選項清單。 -->
          <ul v-show="dropdown.isOpen">
            <!-- 使用 v-for 指令迭代每個篩選器的選項，為每個選項創建一個 li 元素; :key="option" 設定每個選項的唯一鍵。 -->
            <li v-for="option in dropdown.options" :key="option">
              <!-- v-model="selectedOptions[index]" 綁定多選框的選中狀態到 selectedOptions 陣列中的對應位置。 -->
              <input type="checkbox" :id="option" :value="option" v-model="selectedOptions[index]"/>
              <label :for="option"> {{ option }}</label>
            </li>
            <!-- <li><button class="menu-filter-button" @click="applyFilter(index)" >確定</button></li> -->
          </ul>
        </div>
      </div>
    </div>

    <!-- 價格排序按鈕 -->
    <div class="filters">
      <div class="filter">
        <!-- @change="handleSortChange($event.target.value)"：這是一個事件綁定，當下拉選單的值發生變化時（即用戶選擇不同的選項時），會調用handleSortChange方法來處理這個事件 -->
        <!-- $event.target.value表示當前選中的選項的value屬性的值，即排序方式（desc或asc） -->
           <select class="filter-button" @change="handleSortChange($event.target.value)">
             <option value="desc">價格由高到低</option>
             <option value="asc">價格由低到高</option>
             <option class="button-text" value disabled selected hidden>價格排序</option>
          </select>
      </div>
    </div>

   </div>  

    <!-- 已選中的篩選器選項 -->
    <div class="selected-filters">
      <!-- 迭代每個篩選器的選中選項 -->
      <div v-for="(options, index) in selectedOptions" :key="'selected-' + index">
        <!-- 迭代每個選中的選項 -->
        <span v-for="option in options" :key="option" class="selected-filter">
          {{ option }}
          <!-- 移除選項的按鈕，點擊後調用 removeOption 方法 -->
          <i class="fa fa-times" @click="removeOption(index, option)"></i>
        </span>
      </div>
    </div>


  <!-- 手機版篩選器區域 -->
   <div class="filter-block-sm">
      <div class="filter-sm">
          <button class="filter-button-sm" @click="toggleMenusm">
            <i class="fa-solid fa-bars"></i>
            <span class="button-text-sm">商品篩選</span>
          </button>
      </div>

      
    <!-- 手機版篩選器選項清單 -->
     <div class="menu-filter-sm" v-if="menuOpen">
      <div class="menu-filter-topbar-sm">
         <div class="menu-filter-header-sm"><h3>商品篩選</h3></div>

         <div class="menu-filter-item-sm">
           <i class="fa-solid fa-chevron-left"></i>
           <div class="menu-filter-close-sm">關閉</div>
         </div>

      </div>

      <div class="menu-filter-options-sm">
        <div class="menu-filter-option-block-sm" v-for="(dropdown, index) in dropdowns" :key="index">
          <div class="line-sm"></div>
          <div class="menu-filter-title-sm"><h3>{{dropdown.label}}</h3></div>
          <div class="menu-filter-content-sm">
            <ul class="menu-filter-content-items-sm">
              <li v-for="option in dropdown.options" :key="option">
                <input type="checkbox" :id="option" :value="option" v-model="selectedOptions[index]"/>
                <label :for="option"> {{ option }}</label>
              </li>
            </ul>
          </div>
        </div>

        <div class="menu-filter-outcome-sm"><h3>顯示篩選結果</h3></div>
      </div>


    </div> 



     <!-- 手機版價格排序按鈕 -->
      <div class="filter-sm">
        <!-- @change="handleSortChange($event.target.value)"：這是一個事件綁定，當下拉選單的值發生變化時（即用戶選擇不同的選項時），會調用handleSortChange方法來處理這個事件 -->
        <!-- $event.target.value表示當前選中的選項的value屬性的值，即排序方式（desc或asc） -->
           <select class="filter-button-sm" @change="handleSortChange($event.target.value)">
             <option value="desc">價格由高到低</option>
             <option value="asc">價格由低到高</option>
             <option class="button-text-sm" value disabled selected hidden>價格排序</option>
          </select>
    </div>
   </div>  


  </div>

  <div class="container">
    <div class="product-cards row">
      <div class="col-3 col-md-4 col-sm-6" v-for="product in filteredProducts" :key="product.id">
        <div class="product-card">
          <div class="img-wrap">
            <RouterLink to="/product-detail"> 
              <img :src="product.image" alt="Product Image" style="width: 277.5px; height: 200px; object-fit: contain;" />
            </RouterLink>
          </div>

          <div class="info-wrap">
           <RouterLink to="/product-detail"> 
              <div class="font-wrap">
                <h4>{{ product.name }}</h4>
                <p>{{ product.ename }}</p>
                <p>{{ product.variety }}</p>
              </div>
            </RouterLink>
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
      // 定義下拉選單的資料結構
      dropdowns: [
        {
          label: '葡萄酒類別',
          isOpen: false,
          options: ['紅酒', '白酒', '粉紅酒', '氣泡酒', '加烈酒'],
          isMenuVisible: false
        },
        {
          label: '葡萄品種',
          isOpen: false,
          options: ['波爾多混釀', '阿里戈蝶', '黑皮諾', '夏多內', '帕洛米諾'],
          isMenuVisible: false
        },
        {
          label: '年份',
          isOpen: false,
          options: ['2020年', '2019年', '2018年', '2017年', '2016年', '2015年', '2014年', '2013年', '2012年', '2011年', '2010年', '2009年'],
          isMenuVisible: false
        },

      ],
      // 新增狀態以追蹤選中的選項
      selectedOptions: [[], [], []], 
      // 定義產品資料
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
          image: image1
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
          image: image1
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
          image: image1
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
          image: image1
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
          image: image2
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
          image: image2
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
          image: image3
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
          image: image3
        },
        {
          id: 9,
          name: '星光粉紅酒 2011',
          ename: 'Star Rosé Wine 2011',
          category: '粉紅酒',
          variety: '黑皮諾',
          year: '2011年',
          price: 'NT$ 2,750',
          price2: 2750,
          image: image4
        },
        {
          id: 10,
          name: '星光粉紅酒 2010',
          ename: 'Star Rosé Wine 2010',
          category: '粉紅酒',
          variety: '黑皮諾',
          year: '2010年',
          price: 'NT$ 3,000',
          price2: 3000,
          image: image4
        },
        {
          id: 11,
          name: '粉露粉紅酒 2016',
          ename: 'Dew Rosé Wine 2016',
          category: '粉紅酒',
          variety: '黑皮諾',
          year: '2016年',
          price: 'NT$ 5,050',
          price2: 5050,
          image: image5
        },
        {
          id: 12,
          name: '粉露粉紅酒 2012',
          ename: 'Dew Rosé Wine 2012',
          category: '粉紅酒',
          variety: '黑皮諾',
          year: '2012年',
          price: 'NT$ 5,250',
          price2: 5250,
          image: image5
        },
        {
          id: 13,
          name: '藍天氣泡酒 2016 ',
          ename: 'Sky Sparkling Wine 2016',
          category: '氣泡酒',
          variety: '夏多內',
          year: '2016年',
          price: 'NT$ 1,720',
          price2: 1720,
          image: image6
        },
        {
          id: 14,
          name: '藍天氣泡酒 2015',
          ename: 'Sky Sparkling Wine 2015',
          category: '氣泡酒',
          variety: '夏多內',
          year: '2015年',
          price: 'NT$ 2,000',
          price2: 2000,
          image: image6
        },
        {
          id: 15,
          name: '星辰加烈酒 2016',
          ename: 'Star Fortified Wine 2016',
          category: '加烈酒',
          variety: '帕洛米諾',
          year: '2016年', 
          price: 'NT$ 830',
          price2: 830,
          image: image7
        },
        {
          id: 16,
          name: '星辰加烈酒 2014',
          ename: 'Star Fortified Wine 2014',
          category: '加烈酒',
          variety: '帕洛米諾',
          year: '2014年',
          price: 'NT$ 900',
          price2: 900,
          image: image7
        }
      ],
      menuOpen: false

    };
  },
  computed: {
    filteredProducts() {
      // 根據選中的選項篩選產品
      return this.products.filter(product => {
        return this.selectedOptions.every((options, index) => {
          if (options.length === 0) return true; // 如果選項為空，則不篩選
          if (index === 0) {
            return options.includes(product.category); // 根據選中的葡萄酒類別篩選
          } else if (index === 1) {
            return options.includes(product.variety); // 根據選中的葡萄品種篩選
          } else if (index === 2) {
            return options.includes(product.year); // 根據選中的年份篩選
          } else {
            return true; // 其他選項暫時不考慮篩選
          }
        });
      });
    }
  },
  methods: {
    toggleDropdown(index) {
      // 切換下拉選單的打開狀態
      this.dropdowns[index].isOpen = !this.dropdowns[index].isOpen;
      this.dropdowns[index].isMenuVisible = !this.dropdowns[index].isMenuVisible;
    },
    // applyFilter(index) {
    //   // 關閉下拉選單
    //   this.dropdowns[index].isOpen = false;
    //   removeOption();
    // },
    // 方法接收兩個參數：dropdownIndex 表示篩選器的索引，option 表示要移除的選項。
    removeOption(dropdownIndex, option) {
      // 獲取指定篩選器的選中選項。
      const options = this.selectedOptions[dropdownIndex];

      // 找到要移除選項的索引。
      const optionIndex = options.indexOf(option);

      // 如果 optionIndex 不是 -1，表示 option 存在於 options 中。
      if (optionIndex !== -1) {
        // 使用 splice 方法從 options 中移除 option。
        options.splice(optionIndex, 1);
      }
    },
    handleSortChange(value) {
      if (value === 'desc') {
        this.sortByPriceDescending();
      } else if (value === 'asc') {
        this.sortByPriceAscending();
      }
    },
    sortByPriceDescending() {
      // 按照價格由高到低排序產品
      this.products.sort((a, b) => b.price2 - a.price2);
    },
    sortByPriceAscending() {
      // 按照價格由低到高排序產品
      this.products.sort((a, b) => a.price2 - b.price2);
    },
    toggleMenusm() {
      this.menuOpen = !this.menuOpen;
    },



  }
};
</script>

