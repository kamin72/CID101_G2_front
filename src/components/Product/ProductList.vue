<template>
  <div class="container">
    <div class="row">
      <!-- 頁面導航顯示 -->
      <small class="col-12 scrumble">
        <span class="frontPage-bread">
          <RouterLink to="/">首頁</RouterLink>
        </span>
        <span class="material-symbols-outlined">arrow_forward_ios</span>
        我們的酒
      </small>
    </div>
  </div>

  <div class="product-title-filter">
    <div class="col-12 our-product">
      <div class="product-title-wrap">
        <div class="line"></div>
        <h2>Our Product</h2>
        <div class="line"></div>
      </div>
    </div>

    <div class="filter-blocks">
      <!-- 已選中的篩選器選項 -->
      <div class="selected-filters">
        <div>
          <span
            v-for="(option, index) in selectedOptions.flat()"
            :key="`${option}-${index}`"
            class="selected-filter"
          >
            {{ option }}
            <i class="fa fa-times" @click="removeOption(option)"></i>
          </span>
        </div>
      </div>

      <!-- 篩選器區域 -->
      <div class="filter-block">
        <div class="filters">
          <div class="filter" v-for="(dropdown, index) in dropdowns.slice(0, 3)" :key="index">
            <button class="filter-button" @click="toggleDropdown(index)">
              <span class="button-text">{{ dropdown.label }}</span>
              <span @click.stop="toggleDropdown(index)">
                <i class="fa-solid" :class="dropdown.isOpen ? 'fa-angle-up' : 'fa-angle-down'"></i>
              </span>
            </button>

            <div class="menu-filter">
              <ul v-show="dropdown.isOpen">
                <li v-for="option in getDropdownOptions(index)" :key="option">
                  <input
                    type="checkbox"
                    :id="option"
                    :value="option"
                    v-model="selectedOptions[index]"
                    @change="updateFilters"
                  />
                  <label :for="option">{{ option }}</label>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 價格排序按鈕 -->
        <div class="filters">
          <div class="filter" v-for="(dropdown, index) in dropdowns.slice(3, 4)" :key="index">
            <button class="filter-button" @click="toggleDropdown(3)">
              <span class="button-text">{{ dropdown.label }}</span>
              <span @click.stop="toggleDropdown(3)">
                <i class="fa-solid" :class="dropdown.isOpen ? 'fa-angle-up' : 'fa-angle-down'"></i>
              </span>
            </button>

            <div class="menu-filter">
              <ul v-show="dropdown.isOpen">
                <li class="desc" @click="sortByPriceDescending">價格由高到低</li>
                <li class="asc" @click="sortByPriceAscending">價格由低到高</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="filter-blocks-sm">
      <!-- 手機版已選中的篩選器選項 -->
      <div class="selected-filters-sm">
        <div>
          <span
            v-for="option in selectedOptions.flat()"
            :key="`${option}-${index}`"
            class="selected-filter-sm"
          >
            {{ option }}
            <i class="fa fa-times" @click="removeOption(option)"></i>
          </span>
        </div>
      </div>

      <!-- 手機版篩選器區域 -->
      <div class="filter-block-sm">
        <div class="filter-sm">
          <button class="filter-button-sm" @click.stop="toggleMenusm_sm">
            <i class="fa-solid fa-bars"></i>
            <span class="button-text-sm">商品篩選</span>
          </button>
        </div>

        <!-- 手機版篩選器選項清單 -->
        <div class="menu-filter-sm" v-if="menuOpen">
          <div class="menu-filter-topbar-sm">
            <div class="menu-filter-header-sm">
              <h3>商品篩選</h3>
            </div>

            <div class="menu-filter-item-sm">
              <i class="fa-solid fa-chevron-left" @click.stop="closeDropdown_sm"></i>
              <div class="menu-filter-close-sm" @click.stop="closeDropdown_sm">關閉</div>
              <div class="menu-filter-clear" @click.stop="clearSelection">清空選項</div>
            </div>
          </div>

          <div class="menu-filter-options-sm">
            <div
              class="menu-filter-option-block-sm"
              v-for="(dropdown, index) in dropdowns.slice(0, 3)"
              :key="index"
            >
              <div class="line-sm"></div>
              <div class="menu-filter-title-sm" @click.stop="toggleDropdown_sm(index)">
                <h3>{{ dropdown.label }}</h3>
              </div>
              <div class="menu-filter-content-sm" v-show="dropdown.isOpen">
                <ul class="menu-filter-content-items-sm">
                  <li v-for="option in getDropdownOptions(index)" :key="option">
                    <input
                      type="checkbox"
                      :id="option"
                      :value="option"
                      v-model="selectedOptions[index]"
                      @change="updateFilters"
                    />
                    <label :for="option">{{ option }}</label>
                  </li>
                </ul>
              </div>
            </div>

            <div class="menu-filter-outcome-sm" @click="closeDropdown_sm">
              <h3>顯示篩選結果</h3>
            </div>
          </div>
        </div>

        <!-- 手機版價格排序按鈕 -->
        <div class="filter-sm" v-for="(dropdown, index) in dropdowns.slice(3, 4)" :key="index">
          <button class="filter-button-sm" @click.stop="toggleDropdown_sm(3)">
            <span class="button-text2-sm">{{ dropdown.label }}</span>
            <span v-if="dropdown.isMenuVisible"><i class="fa-solid fa-angle-up"></i></span>
            <span v-else><i class="fa-solid fa-angle-down"></i></span>
          </button>

          <div class="menu-filter">
            <ul v-show="dropdown.isOpen">
              <li @click.stop="sortByPriceDescending">價格由高到低</li>
              <li @click.stop="sortByPriceAscending">價格由低到高</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 商品卡片 -->
  <div class="container">
    <div class="product-cards row">
      <div
        class="col-3 col-md-4 col-sm-6"
        v-for="product in filteredProducts"
        :key="product.prod_id"
        v-show="product.prod_state == 1"
      >
        <div class="product-card">
          <div class="product-img">
            <RouterLink :to="'/ProductDetail/' + product?.prod_id">
              <img
                :src="parseServerImg(product?.prod_img)"
                alt="Product Image"
                style="object-fit: contain"
              />
            </RouterLink>
          </div>

          <div class="info-wrap">
            <RouterLink :to="'/ProductDetail/' + product?.prod_id">
              <div class="font-wrap">
                <h4>{{ product?.prod_name }}</h4>
                <p>{{ product?.prod_ename }}</p>
                <p>{{ product?.prod_variety }}</p>
              </div>
            </RouterLink>
            <h4>NT$ {{ product?.prod_price }}</h4>
          </div>
          <button class="add-card" @click="addCart(product)">加入詢價單</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import cartStore from '@/stores/cart'

export default {
  data() {
    return {
      dropdownsState: [
        { isOpen: false, isMenuVisible: false },
        { isOpen: false, isMenuVisible: false },
        { isOpen: false, isMenuVisible: false },
        { isOpen: false, isMenuVisible: false }
      ],
      selectedOptions: [[], [], []],
      menuOpen: false,
      allOptions: [[], [], []]
    }
  },
  computed: {
    ...mapState(cartStore, ['products', 'cart']),

    dropdowns() {
      if (!this.products || this.products.length === 0) {
        return []
      }

      return [
        { label: '葡萄酒類別' },
        { label: '葡萄品種' },
        { label: '年份' },
        {
          label: '價格排序',
          options: ['價格由高到低', '價格由低到高']
        }
      ].map((dropdown, index) => ({
        ...dropdown,
        ...this.dropdownsState[index]
      }))
    },

    filteredProducts() {
      return this.getFilteredProducts().filter((product) => product.prod_state == 1)
    }
  },
  methods: {
    ...mapActions(cartStore, ['checkCart', 'addCart', 'fetchProductList', 'getProductList']),
    parseServerImg(file) {
      return `${import.meta.env.VITE_FILE_URL}/${file}`
    },
    clearSelection() {
      this.selectedOptions = [[], [], []]
      this.updateFilters()
    },
    closeDropdown_sm() {
      this.menuOpen = false
    },
    toggleDropdown_sm(index) {
      this.dropdownsState[index].isOpen = !this.dropdownsState[index].isOpen
      this.dropdownsState[index].isMenuVisible = !this.dropdownsState[index].isMenuVisible
    },
    toggleMenusm_sm() {
      this.menuOpen = !this.menuOpen
      this.dropdownsState.forEach((state, i) => {
        if (i === 3) {
          state.isOpen = false
        }
      })
    },
    toggleDropdown(index) {
      this.dropdownsState[index].isOpen = !this.dropdownsState[index].isOpen
      this.dropdownsState[index].isMenuVisible = !this.dropdownsState[index].isMenuVisible

      this.dropdownsState.forEach((state, i) => {
        if (i !== index) {
          state.isOpen = false
        }
      })
    },
    closeDropdowns() {
      this.dropdownsState.forEach((state) => {
        state.isOpen = false
        state.isMenuVisible = false
      })
      this.menuOpen = false
    },
    removeOption(option) {
      this.selectedOptions.forEach((options) => {
        const optionIndex = options.indexOf(option)
        if (optionIndex !== -1) {
          options.splice(optionIndex, 1)
        }
      })
      this.updateFilters()
    },
    sortByPriceDescending() {
      this.products.sort((a, b) => b.prod_price - a.prod_price)
    },
    sortByPriceAscending() {
      this.products.sort((a, b) => a.prod_price - b.prod_price)
    },
    handleGlobalClick(event) {
      if (
        !event.target.closest('.menu-filter') &&
        !event.target.closest('.filter-button') &&
        !event.target.closest('.filter-button-sm') &&
        !event.target.closest('.menu-filter-sm')
      ) {
        this.closeDropdowns()
      }
    },
    getFilteredProducts() {
      return this.products.filter((product) => {
        return this.selectedOptions.every((options, index) => {
          if (options.length === 0) return true
          if (index === 0) {
            return options.includes(product.prod_category)
          } else if (index === 1) {
            return options.includes(product.prod_variety)
          } else if (index === 2) {
            return options.includes(product.prod_year)
          } else {
            return true
          }
        })
      })
    },
    updateFilters() {
      this.updateAllOptions()
    },
    updateAllOptions() {
      let filteredProducts = this.products

      this.allOptions[0] = [...new Set(this.filteredProducts.map((p) => p.prod_category))]

      if (this.selectedOptions[0].length > 0) {
        filteredProducts = filteredProducts.filter((p) =>
          this.selectedOptions[0].includes(p.prod_category)
        )
      }
      this.allOptions[1] = [...new Set(filteredProducts.map((p) => p.prod_variety))]

      if (this.selectedOptions[1].length > 0) {
        filteredProducts = filteredProducts.filter((p) =>
          this.selectedOptions[1].includes(p.prod_variety)
        )
      }
      this.allOptions[2] = [...new Set(filteredProducts.map((p) => p.prod_year))]
    },
    getDropdownOptions(index) {
      return this.allOptions[index] || []
    }
  },
  mounted() {
    document.addEventListener('click', this.handleGlobalClick)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleGlobalClick)
  },
  created() {
    this.fetchProductList()
    this.getProductList()
    this.updateAllOptions()
  }
}
</script>
