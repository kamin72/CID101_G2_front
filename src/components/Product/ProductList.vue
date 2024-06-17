<template>
  <div class="container">
    <div class="row">
      <!-- 頁面導航顯示 -->
      <small class="col-12 scrumble">
        <span class="frontPage-bread">
          <RouterLink to="/">首頁</RouterLink></span>
        <span class="material-symbols-outlined">arrow_forward_ios</span>
        我們的酒
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
          <button class="filter-button-sm" @click="toggleMenusm_sm">
            <i class="fa-solid fa-bars"></i>
            <span class="button-text-sm">商品篩選</span>
          </button>
      </div>

      
    <!-- 手機版篩選器選項清單 -->
     <div class="menu-filter-sm" v-if="menuOpen">
      <div class="menu-filter-topbar-sm">
         <div class="menu-filter-header-sm"><h3>商品篩選</h3></div>

         <div class="menu-filter-item-sm">
            <i class="fa-solid fa-chevron-left" @click="closeDropdown_sm"></i>
            <div class="menu-filter-close-sm" @click="closeDropdown_sm">關閉</div>
            <div class="menu-filter-clear"
            @click="clearSelection">清空選項</div>
         </div>
      </div>

      <div class="menu-filter-options-sm">
        <div class="menu-filter-option-block-sm" v-for="(dropdown, index) in dropdowns" :key="index">
          <div class="line-sm"></div>
          <div class="menu-filter-title-sm" @click="toggleDropdown_sm(index)">
            <h3>{{dropdown.label}}</h3>
          </div>
          <div class="menu-filter-content-sm" v-show="dropdown.isOpen">
            <ul class="menu-filter-content-items-sm">
              <li v-for="option in dropdown.options" :key="option">
                <input type="checkbox" :id="option" :value="option" v-model="selectedOptions[index]"/>
                <label :for="option"> {{ option }}</label>
              </li>
            </ul>
          </div>
        </div>

        <div class="menu-filter-outcome-sm" @click="closeDropdown_sm"><h3>顯示篩選結果</h3></div>
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


    <!-- 手機版已選中的篩選器選項 -->
    <div class="selected-filters-sm">
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
  </div>

  <!-- 商品卡片 -->
  <div class="container">
    <div class="product-cards row">
      <div class="col-3 col-md-4 col-sm-6" v-for="product in filteredProducts" :key="product.id">
        <div class="product-card">
          <div class="product-img">
            <RouterLink :to="'/ProductDetail/' + product.id">
              <img :src="parseImg(product.image)" alt="Product Image" style="object-fit: contain;" />
            </RouterLink>
          </div>

          <div class="info-wrap">
            <RouterLink :to="'/ProductDetail/' + product.id">
              <div class="font-wrap">
                <h4>{{ product.name }}</h4>
                <p>{{ product.ename }}</p>
                <p>{{ product.variety }}</p>
              </div>
            </RouterLink>
            <h4>{{ product.price }}</h4>
          </div>
          <button class="add-card" @click="addToInquiry(product)">加入詢價單</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// import image1 from '@/assets/img/wine/Elegant-Red-Wine.png'
// import image2 from '@/assets/img/wine/Pearl-White-Wine.png'
// import image3 from '@/assets/img/wine/Ice-White-Wine.png'
// import image4 from '@/assets/img/wine/Star-Rosé-Wine.png'
// import image5 from '@/assets/img/wine/Dew-Rosé-Wine.png'
// import image6 from '@/assets/img/wine/Sky-Sparkling-Wine.png'
// import image7 from '@/assets/img/wine/Star-Fortified-Wine.png'

export default {
  data() {
    return {
     //商品資訊
      products: [],

      // 定義下拉選單的資料結構
      dropdowns: [
        {
          label: '葡萄酒類別',
          isOpen: false,
          isMenuVisible: false,
          options: ['紅酒', '白酒'],
        },
        {
          label: '葡萄品種',
          isOpen: false,
          isMenuVisible: false,
          options: ['波爾多混釀', '阿里戈蝶'],
        },
        {
          label: '年份',
          isOpen: false,
          isMenuVisible: false,
          options: ['2020年', '2019年', '2018年', '2017年', '2014年', '2013年', '2012年', '2009年'],
        },

      ],
      // 新增狀態以追蹤選中的選項
      selectedOptions: [[], [], []], 

      // 手機版篩選選單打開或隱藏狀態
      menuOpen: false,
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
    addToInquiry(product) {
      // 獲取當前的詢價單資訊,如果 localStorage 中沒有就初始化為空陣列
      let inquiry = JSON.parse(localStorage.getItem('inquiry')) || [];

      // 將商品資訊加入詢價單
      inquiry.push(product);

      // 將更新後的詢價單存回 localStorage
      localStorage.setItem('inquiry', JSON.stringify(inquiry));
    },
    parseImg(file) {
        return new URL(`../../assets/img/wine/${file}`, import.meta.url).href
      },
    //手機版清空篩選選項
    clearSelection() {
      this.selectedOptions = [[], [], []]
    },
    // 手機版篩選選單關閉狀態
    closeDropdown_sm() {
      this.menuOpen = false;
    },
    // 手機版切換下拉選單的打開狀態
    toggleDropdown_sm(index) {
      this.dropdowns[index].isOpen = !this.dropdowns[index].isOpen;
    },   
  // 手機版篩選選單打開狀態
    toggleMenusm_sm() {
      this.menuOpen = !this.menuOpen;
    },
    toggleDropdown(index) {
      // 切換下拉選單的打開狀態
      this.dropdowns[index].isOpen = !this.dropdowns[index].isOpen;
      // 切換篩選按鈕旁邊箭頭的上下方向
      this.dropdowns[index].isMenuVisible = !this.dropdowns[index].isMenuVisible;
    },

    // applyFilter(index) {
    //   // 關閉下拉選單
    //   this.dropdowns[index].isOpen = false;
    //   removeOption();
    // },

    // 方法接收兩個參數：dropdownIndex 表示篩選器的索引，option 表示要移除的選項。
    // 獲取指定篩選器的選中選項。
    removeOption(dropdownIndex, option) {
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
  },
  mounted() {
    fetch("/product.json")
    .then(response => response.json())
    .then(data => {
        this.products = data;
    })
  },
};
</script>

