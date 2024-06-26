<template>
  <div class="paidInfo">
    <div class="column">
      <h3 class="title">付款資訊</h3>
    </div>
    <div class="selectStore">
      <h4>選擇7-11取貨門市</h4>
      <button
        class="map big-btn-primary"
        @click="click1"
        :class="isClicked ? 'clicked' : 'unclicked'"
      >
        依地圖選擇門市
      </button>
      <button
        class="ussdStore big-btn-primary"
        @click="click2"
        :class="isClicked ? 'unclicked' : 'clicked'"
      >
        ★ 選擇常用門市
      </button>
    </div>
    <div class="area" v-if="isClicked">
      <label for="county"
        >請選擇縣市
        <select name="county" v-model="selectedCounty" class="filter-button">
          <option value="" disabled selected>請選擇</option>
          <option :value="countyItem" v-for="(countyItem, index) in counties" :key="index">
            {{ countyItem }}
          </option>
        </select>
      </label>
      <label for="district"
        >請選擇鄉、鎮、市、區
        <select name="district" id="" v-model="selectedDistrict" class="filter-button">
          <option value="" disabled selected>請選擇</option>
          <option :value="districtItem" v-for="districtItem in districts" :key="districtItem">
            {{ districtItem }}
          </option>
        </select>
      </label>
      <label for="street"
        >請選擇街道
        <select name="street" id="" v-model="selectedStreet" class="filter-button">
          <option value="" disabled selected>請選擇</option>
          <option
            v-for="street in Object.keys(stores[selectedCounty]?.[selectedDistrict] || {})"
            :key="street"
            :value="street"
          >
            {{ street }}
          </option>
        </select>
      </label>
    </div>

    <div class="storeAddress" v-if="isClicked">
      <div class="storeDisplay">
        <div
          class="rect"
          v-for="storeItem in storeFilter"
          :key="storeItem.storeName"
          :value="storeItem"
          @click="selectStore(storeItem)"
        >
          <p>{{ storeItem.storeName }}</p>
          <p>{{ storeItem.address }}</p>
        </div>
      </div>
      <h4>門市名稱 | {{ selectedStore ? selectedStore.storeName : '請選擇門市' }}</h4>
      <h4>地址 | {{ selectedStore ? selectedStore.address : '請選擇門市' }}</h4>
      <p>
        &bull;
        門市取件時需配合門市相關規範，部分門市已陸續調整為「自助取件」，可重新依地圖選擇確認。
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isClicked: true,
      selectedCounty: '',
      selectedDistrict: '',
      selectedStreet: '',
      selectedStore: null,
      switch: true,
      counties: [
        '臺北市',
        '新北市',
        '桃園市',
        '臺中市',
        '臺南市',
        '高雄市',
        '基隆市',
        '新竹市',
        '嘉義市',
        '新竹縣',
        '苗栗縣',
        '彰化縣',
        '南投縣',
        '雲林縣',
        '嘉義縣',
        '屏東縣',
        '宜蘭縣',
        '花蓮縣',
        '臺東縣',
        '澎湖縣',
        '金門縣',
        '連江縣'
      ],
      cityData: {
        臺北市: [
          '中正區',
          '大同區',
          '中山區',
          '松山區',
          '大安區',
          '萬華區',
          '信義區',
          '士林區',
          '北投區',
          '內湖區',
          '南港區',
          '文山區'
        ],
        新北市: [
          '板橋區',
          '三重區',
          '中和區',
          '永和區',
          '新莊區',
          '新店區',
          '樹林區',
          '鶯歌區',
          '三峽區',
          '淡水區',
          '汐止區',
          '瑞芳區'
        ]
      },
      streets: {
        臺北市: {
          士林區: [
            '中山北路',
            '福林路',
            '士東路',
            '德行東路',
            '德行西路',
            '文林路',
            '華岡路',
            '至善路',
            '承德路',
            '基河路',
            '天母西路',
            '天母東路',
            '忠誠路',
            '社子街',
            '延平北路',
            '劍潭路',
            '前港街',
            '雨聲街',
            '克強路',
            '格致路',
            '通河街',
            '大東路',
            '小東路',
            '中正路',
            '大南路',
            '磺溪街',
            '溪山街',
            '天玉街',
            '天母北路',
            '天母南路',
            '文昌路',
            '仰德大道',
            '平菁街',
            '永公路',
            '至誠路',
            '菁山路',
            '東山路',
            '中社路',
            '福華路',
            '美崙街',
            '陽明路',
            '重慶北路',
            '光華路',
            '和豐街',
            '福港街',
            '延平北路',
            '百齡路',
            '磺港路',
            '富洲路',
            '葫蘆街',
            '環河北路'
          ]
        }
      },
      stores: {
        臺北市: {
          士林區: {
            中山北路: [
              {
                storeName: '銘傳門市',
                address: '台北市士林區中山北路五段250號'
              },
              {
                storeName: '劍潭門市',
                address: '台北市士林區中山北路五段65號1樓'
              }
            ],
            士東路: [
              {
                storeName: '士東門市',
                address: '台北市士林區士東路42號1樓'
              },
              {
                storeName: '徳芝門市',
                address: '台北市士林區士東路266巷5弄18號20號1樓'
              }
            ]
          }
        }
      }
    }
  },
  methods: {
    click1() {
      this.isClicked = true
    },
    click2() {
      this.isClicked = false
    },
    selectStore(store) {
      this.selectedStore = store
      console.log(this.selectedStore)
    }
  },
  computed: {
    districts() {
      return this.cityData[this.selectedCounty] || []
    },
    // allStreet() {
    //   const result = Object.keys(this.stores[this.selectedCounty]?.[this.selectedDistrict]) || {}
    //   return result
    // },
    storeFilter() {
      const district = this.stores[this.selectedCounty]?.[this.selectedDistrict]
      if (!district) return []
      // 如果選擇了特定街道
      const streetStores = district[this.selectedStreet]
      // console.log('Stores on selected street:', streetStores);
      return streetStores || []
    }
  },
  watch: {
    selectedCounty() {
      this.selectedDistrict = ''
      this.selectedStreet = ''
      this.selectedStore = null
    },
    selectedDistrict() {
      this.selectedStreet = ''
      this.selectedStore = null
    },
    selectedStreet() {
      this.selectedStore = null
    }
  }
}
</script>

<style scoped>
.clicked {
  background-color: #aea495;
}

.unclicked {
  background-color: #322d26;
}

.storeDisplay {
  width: 80%;
  display: flex;
}

.rect {
  color: #fff;
  background-color: #322d26;
  margin: 0 5px;
  padding: 0 10px;
  cursor: pointer;
}

.rect:hover {
  background-color: black;
}

.rect p {
  padding: 10px 0;
}
</style>
