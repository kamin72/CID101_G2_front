<template>
  <footer class="footer">
    <nav class="container">
      <div class="footer_logo">
        <a href="#"><img src="/src/assets/img/logo/logo2-w.png" alt="" /></a>
      </div>

      <div class="wrap_contactus_aboutus">
        <div class="footer_contactus">
          <a v-for="(contactItem) in contactUs" :key="contactItem.id">{{ contactItem.title }}</a>
        </div>

        <div class="footer_aboutus">
          <a v-for="(aboutItem) in aboutUs" :key="aboutItem.id">{{ aboutItem.title }}</a>
        </div>
      </div>
    </nav>
  </footer>
  <div class="tibame">
    <small>本網站為緯育TibaMe_前端設計工程師班第88期學員專題成果作品,本平台僅供學習、展示之用。</small>
    <small>
      若有抵觸有關著作權,或有第三人主張侵害智慧財產權等情事,均由學員負法律上責任,緯育公司概不負責。
    </small>
    <small>若有侵權疑慮,您可以私訊緯育TibaMe,後續會由專人協助處理。</small>
  </div>
</template>
<script>
export default {
  data() {
    return {
      contactUs: [
        {
          id: 1,
          title: "聯絡我們"
        },
        {
          id: 2,
          title: "0912-345-678"
        },
        {
          id: 3,
          title: "123@email.com"
        },
        {
          id: 4,
          title: "台北市士林區華興里7鄰123號"
        }
      ],
      aboutUs: [
        {
          id: 1,
          title: "關於我"
        },
        {
          id: 2,
          title: "最新消息"
        },
        {
          id: 3,
          title: "品酒課程"
        }
      ]
    }
  }
}

</script>