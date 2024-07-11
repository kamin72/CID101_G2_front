<template>
  <div class="container">
    <div class="row">
      <small class="col-12 scrumble"
        >首頁 <span class="material-symbols-outlined">arrow_forward_ios</span>最新消息</small
      >
    </div>
  </div>
  <section class="news-view">
    <div class="container">
      <div class="product-title-filter">
        <div class="col-12 our-product">
          <div class="title-wrap">
            <div class="line"></div>
            <h2>News</h2>
            <div class="line"></div>
          </div>
        </div>
      </div>
      <!-- <div class="row">
      <div class="col-4" v-for="newsItem in news" :key="newsItem.id">
        <router-link :to="{ name: 'news_detail', params: { id: newsItem.id } }" >
        <div class="news-card">
          <div class="news-pic">
            <img :src="parseImg(newsItem.image)" alt="最新消息圖片" style="object-fit: contain;" />
          </div>
          <h4> {{ newsItem.name }} </h4>
          <p>{{ newsItem.time }} </p>
        </div>
      </router-link>
      </div>
    </div> -->
    <div class="news-card-list">
      <router-link r-link v-for="item in news" :key="item.news_id"
                    class="col-4 col-md-6 col-sm-12 news-card"
                    :to="{ name: 'news_detail', params: { id: item.news_id } }"
                    >
                    <div class="news-pic">
                      <img :src="parseServerImg(item.news_img)" alt="最新消息圖片"/>
                    </div>
                    <p class="news-date">{{ item.news_date }} </p>
                    <h4 class="news-title"> {{ item.news_title }} </h4>
                    
      </router-link>
    </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      news: []
    }
  },
  methods: {
    // parseImg(news_img) {
    //   return new URL(`../../../image/news/${news_img}`, import.meta.url).href
    // },
    // 部屬用-解析伺服器圖片路徑
    parseServerImg(imgURL) {
            return `${import.meta.env.VITE_FILE_URL}/news/${imgURL}`
    },
    fetchNewsData() {
  fetch(`${import.meta.env.VITE_API_URL}/news.php`)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        alert(data.msg);
      } else if (data.news) {
        //只顯示設定上架的文章
        this.news = data.news
        .filter(item => item.news_state == 1)
        .sort((a, b) => new Date(b.news_date) - new Date(a.news_date));
        localStorage.setItem('news', JSON.stringify(this.news));
      }
    })
    .catch((error) => {
      console.error('Error fetching news data:', error);
      alert('Error fetching news data');
    });
}
  },
  mounted() {
    // 部屬用-解析伺服器json位置
    // fetch(`${import.meta.env.VITE_API_URL}/news.json`)
    //   .then(response => response.json())
    //   .then(data => {
    //     this.news = data;
    //   })
    this.fetchNewsData();
  }
}
</script>
