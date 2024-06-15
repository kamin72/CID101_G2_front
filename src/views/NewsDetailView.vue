<template>
    <div class="container">
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
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            news: [],
        }
    },
    methods: {

    },
    mounted() {
        fetch("/news.json")
            .then(response => response.json())
            .then(data => {
                this.news = data;
            })
    }
}
</script>
<style>
.news-card-list {
    display: flex;
}
</style>