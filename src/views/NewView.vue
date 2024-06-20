<template>
  <div class="container">
    <div class="row">
      <small class="col-12 scrumble">首頁
        <span class="material-symbols-outlined">arrow_forward_ios</span>最新消息</small>
    </div>
    
  
  </div>
  <section>
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
    <div class="row news-card-list">
      <router-link r-link v-for="newsItem in news" :key="newsItem.id"
                    class="col-4 col-md-6 col-sm-12 news-card"
                    :to="{ name: 'news_detail', params: { id: newsItem.id } }">
                    <div class="news-pic">
                      <img :src="parseImg(newsItem.image)" alt="最新消息圖片"/>
                    </div>
                    <p class="news-date">{{ newsItem.date }} </p>
                    <h4 class="news-title"> {{ newsItem.name }} </h4>
                    
      </router-link>
    </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      news: [],
    }
  },
  methods: {
    parseImg(file) {
      return new URL(`../assets/img/news/${file}`, import.meta.url).href
    },
  },
  mounted() {
    // 部屬用-解析伺服器json位置
    fetch(`${import.meta.env.VITE_API_URL}/news.json`)
      .then(response => response.json())
      .then(data => {
        this.news = data;
      })
  }
}
</script>