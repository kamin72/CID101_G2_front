<template>
  <div class="about">
    <!-- <h1>This is an about page</h1> -->
    <!-- 一個是直接顯示，一個是寫在computed -->
    list有{{ count }}個 list有{{ list.length }}個
    <ul>
      <button @click="add">加入</button>
      <li v-for="n in page" :key="n">{{ n }}</li>
      <li v-for="(item, itemIndex) in list" :key="item.id">
        <!-- <a v-show="item.hide" :href="item.link" :style="{ color: item.color }"> {{ item.title }}</a> -->
        <template v-if="item.hide">
          <a :href="item.link" :style="{ color: item.color }"> {{ item.title }}</a>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 2,
      list: [
        {
          id: 1,
          title: 'apple',
          color: '#ccc',
          hide: true,
          link: 'https//www.google.com'
        },
        {
          id: 2,
          title: 'car',
          color: 'red',
          hide: false,
          link: 'https//www.facebook.com'
        },
        {
          id: 3,
          title: 'pen',
          color: '#612',
          hide: false,
          link: 'https//www.yahoo.com'
        }
      ]
    }
  },
  methods: {
    add() {
      this.page += 1
      this.list.push({
        id: this.page,
        title: `test${this.page}`
      })
      // console.log(this.list)
    }
  },
  computed: {
    count() {
      return this.list.length
    }
  }
}
</script>

<!-- <style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style> -->
