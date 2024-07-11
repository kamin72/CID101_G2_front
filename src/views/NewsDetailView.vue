<template>
    <!-- 大圖banner -->
    <div class="banner" v-if="news">
        <div class="bgImgWrap">
            <img :src="parseServerImg(news.news_img)" alt="" />
        </div>
        <div class="maskWrap">
            <img src="../assets/img/home/homebanner2.png" alt="" />
        </div>
    </div>
    <section class="news-view news-detail">
        <div class="container">
            <div class="news-wrap">
                <div class="news-title">
                    <h3>{{news.news_title}}</h3>
                </div>
                <div class="news-date">
                    <p>{{ news.news_date }}</p>
                </div>
                <div class="news-content" v-html="formattedContent(news.news_content)">
                </div>
            </div>
            <div class="product-title-filter">
            <div class="col-12 our-product">
                <div class="title-wrap">
                    <div class="line"></div>
                    <h2>Latest</h2>
                    <div class="line"></div>
                </div>
            </div>
            </div>
            <div class="row news-card-list">
        <router-link v-for="item in latestNewsList" :key="item.news_id"
                     :to="{ name: 'news_detail', params: { id: item.news_id } }"
                     class="col-4 col-md-6 col-sm-12 news-card">
          <div class="news-pic">
            <img :src="parseServerImg(item.news_img)" alt="最新消息圖片"/>
          </div>
          <p class="news-date">{{ item.news_date }}</p>
          <h4 class="news-title">{{ item.news_title }}</h4>
        </router-link>
      </div>
    </div>
  </section>
  <!-- 最新文章 -->
  <!-- <section class="news-latest">
        <div class="product-title-filter">
            <div class="col-12 our-product">
                <div class="title-wrap">
                    <div class="line"></div>
                    <h2>Latest</h2>
                    <div class="line"></div>
                </div>
            </div>
        </div>
    <div class="news-card-list">
        <router-link v-for="latestNews in latestNewsList" :key="latestNews.id"
                     :to="{ name: 'news_detail', params: { id: latestNews.id } }"
                     class="col-4 col-md-6 col-sm-6 news-card">
          <div class="news-pic">
            <img :src="parseImgNews(latestNews.image)" alt="最新消息圖片" style="object-fit: contain;" />
          </div>
          <h4 class="news-title">{{ latestNews.name }}</h4>
          <p class="news-date">{{ latestNews.date }}</p>
        </router-link>
      </div>
    </section> -->

  <!-- <div class="news-card-list">
            <div class="news-card">
                <div class="news-pic">
                    <img src="@/assets/img/news/wine-report.jpg">
                </div>
                <h4>2024年度紅酒報告：市場最新趨勢</h4>
                <p>2024/1/5</p>
            </div>
            <div class="news-card">
                <div class="news-pic">
                    <img src="@/assets/img/news/new-year.jpg">
                </div>
                <h4>新年特惠：紅酒限時折扣活動</h4>
                <p>2024/1/15</p>
            </div>
            <div class="news-card">
                <div class="news-pic">
                    <img src="@/assets/img/news/knowledge.jpg">
                </div>
                <h4>紅酒知識：如何正確儲存您的珍藏</h4>
                <p>2024/1/30</p>
            </div>
        </div> -->
  <!-- 最新文章 -->
  <!-- <router-link r-link v-for="newsItem in news" :key="newsItem.id"
                    class="col-4 news-card"
                    :to="{ name: 'news_detail', params: { id: newsItem.id } }">
                    <div class="news-pic">
                      <img :src="parseImg(newsItem.image)" alt="最新消息圖片" style="object-fit: contain;" />
                    </div>
                    <h4> {{ newsItem.name }} </h4>
                    <p>{{ newsItem.time }} </p>
    </router-link> -->
  <!-- </div> -->
  <!-- </div> -->

  <!-- </div> -->
</template>
<script>
export default {
  data() {
    return {
      news: null, // 单篇新闻数据
      latestNewsList: [] // 最新三篇新闻列表
    }
  },
  methods: {
        parseImgNews(file) {
            return new URL(`../assets/img/news/${file}`, import.meta.url).href;
        },
        // 部屬用-解析伺服器圖片路徑
        parseServerImg(imgURL) {
            return `${import.meta.env.VITE_FILE_URL}/news/${imgURL}`
        },
        fetchNewsData(newsId) {
        fetch(`${import.meta.env.VITE_API_URL}/news.php`)
            .then((res) => res.json())
            .then((data) => {
            if (data.error) {
                alert(data.msg);
            } else if (data.news) {
                this.news = data.news.find(news => news.news_id == newsId);
                this.latestNewsList = data.news
                .filter(item => item.news_state == 1 && item.news_id != newsId)
                .sort((a, b) => new Date(b.news_date) - new Date(a.news_date))
                .slice(0, 3); // 获取最新三篇
                localStorage.setItem('news', JSON.stringify(this.news));
                localStorage.setItem('latestNewsList', JSON.stringify(this.latestNewsList));
            }
            })
            .catch((error) => {
            console.error('Error fetching news data:', error);
            alert('Error fetching news data');
            });
        },
        
        formattedContent(content) {
            const paragraphs = content.split('\n');
            return paragraphs.map(paragraph => `<p>${paragraph}</p>`).join('');
        },
        fetchLatestNews(data) {
        // 获取时间最新的三篇新闻
            this.latestNewsList = data
            .sort((a, b) => new Date(b.date) - new Date(a.date)) // 按时间降序排序
            .slice(0, 3); // 获取前三篇
        },
  },
  created() {
    const newsId = this.$route.params.id
    this.fetchNewsData(newsId)
  },
  watch: {
    '$route.params.id'(newId) {
      this.fetchNewsData(newId)
    }
  }
  // mounted() {
  //     fetch('/news.json')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       this.news = data.find((news) => news.id == newsId)
  //     })
  // }
}
</script>
