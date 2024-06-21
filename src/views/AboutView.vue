<template>
  <div class="container">
    <div class="row">
      <!-- 頁面scrumble -->
      <small class="col-12 scrumble">
        <span class="frontPage-bread">
          <RouterLink to="/">首頁</RouterLink>
        </span>
        <span class="material-symbols-outlined">arrow_forward_ios</span>
        關於我們
      </small>
    </div>
  </div>
  <!-- 關於酒窖 -->
  <section class="section-about-us">
    <div class="about-us-container">
      <div class="about-us-row">
        <div class="about-title-wrap">
          <div class="line"></div>
          <h2>How It All Began</h2>
          <div class="line"></div>
        </div>
        <div class="col-12 about-info">
          <div class="about-info-pic">
            <img src="@/assets/img/about/began.jpg">
          </div>
          <div class="about-text">
            <h5>
              歡迎來到坐落於風景如畫的山丘之上的酒莊，歷史悠久，擁有百年釀酒傳統。每一瓶葡萄酒都凝聚了代代相傳的技藝與熱情。酒莊創建於十九世紀，由一位熱愛葡萄酒文化的釀酒師創立，他的夢想是讓每個人都能享受到精緻的葡萄美酒。我們不僅僅是生產葡萄酒，更是傳遞一種生活態度和文化。莊園內種植了多種優質葡萄品種，從精選的赤霞珠到芬芳的長相思，每一款酒都經過細心的培育和傳統工藝的釀造。每年的收成季節，我們都會舉辦盛大的採收節，我們提供獨特的品酒體驗，帶您穿越時光，品味百年歷史的沉澱與故事。
            </h5>
          </div>
        </div>
      </div>
    </div>
  </section>


  <!-- 認識我們的關鍵人物 -->
  <section class="section-key-people">
    <div class="key-people-container">
      <div class="key-people-row">
        <div class="about-title-wrap">
          <div class="line"></div>
          <h2>Meet Our Key People</h2>
          <div class="line"></div>
        </div>
        <div class="people-info-list">
          <div class="people-info">
            <div class="people-info-pic">
              <img src="@/assets/img/about/kaimin.jpg">
            </div>
            <h4>許凱閔</h4>
            <p>Founder & Koala</p>
          </div>
          <div class="people-info">
            <div class="people-info-pic">
              <img src="@/assets/img/about/ruru.jpg">
            </div>
            <h4>黃韻如</h4>
            <p>Executive Director</p>
          </div>
          <div class="people-info">
            <div class="people-info-pic">
              <img src="@/assets/img/about/mita.jpg">
            </div>
            <h4>吳宜庭</h4>
            <p>Senior Winemaker</p>
          </div>
          <div class="people-info">
            <div class="people-info-pic">
              <img src="@/assets/img/about/dong.jpg">
            </div>
            <h4>蔡東廷</h4>
            <p>Viticulture Manager</p>
          </div>
          <div class="people-info">
            <div class="people-info-pic">
              <img src="@/assets/img/about/purple.jpg">
            </div>
            <h4>郭盈君</h4>
            <p>Viticulture Manager</p>
          </div>
          <div class="people-info">
            <div class="people-info-pic">
              <img src="@/assets/img/about/pei.jpg">
            </div>
            <h4>劉姵伶</h4>
            <p>Viticulture Manager</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 超過五個十年的歷史 -->
  <section class="section-our-history">
    <div class="our-history-container">
      <div class="our-history-row">
        <div class="about-title-wrap">
          <div class="line"></div>
          <h2>Over Five Decades of History</h2>
          <div class="line"></div>
        </div>
        <div class="history-process">
          <div class="history-info">
            <div class="history-info-pic"
            style="margin: 0 30px;">
              <img src="@/assets/img/about/beginning.png">
            </div>
            <div class="history-text" style="margin-right: 20px;">
              <h3>1967<br>
                The Beginning</h3>
              <h4>我們的莊園在1967年成立，<br>
                當時只是個小規模的家庭酒莊。<br>
                創始人對葡萄酒充滿熱情，<br>
                他決心在這片肥沃的土地上種植優質葡萄，<br>
                釀造出最純正的葡萄酒。
              </h4>
            </div>
          </div>
          <div class="history-info-pic-dot">
            <img src="@/assets/img/about/beginning-dot.png">
          </div>
          <div class="history-info">
            <div class="history-text">
              <h3>1970 <br>
                First Harvest</h3>
              <h4>經過三年的精心培育，<br>
                莊園迎來了首批葡萄收成。<br>
                這一年的葡萄品質極佳，<br>
                我們釀造的第一批紅葡萄酒<br>
                已經問世便受到當地市場的歡迎，<br>
                成為我們莊園歷史上的重要里程碑。<br>
              </h4>
            </div>
            <div class="history-info-pic">
              <img src="@/assets/img/about/harvest.png" style="width: 150px; height: 200px;">
            </div>
          </div>
          <div class="history-info-pic-dot">
            <img src="@/assets/img/about/harvest-dot.png">
          </div>
          <div class="history-info">
            <div class="history-info-pic">
              <img src="@/assets/img/about/innovation.png"
              style="width: 200px;height: 200px;margin-bottom: 20px;">
            </div>
            <div class="history-text">
              <h3>1972 <br>
                Technological Innovation</h3>
              <h4>
                隨著需求的增加，<br>
                我們引進了先進的釀酒設備和技術，<br>
                提升了葡萄酒的品質和生產效率。<br>
                同時，我們開始種植更多的葡萄品種，<br>
                包括經典的赤霞珠、黑皮諾和長相思等，<br>
                豐富了我們的產品線。<br>
                這些葡萄品種各具特色，<br>
                為莊園帶來了更多風味的可能。
              </h4>
            </div>
          </div>
          <div class="history-info-pic-dot">
            <img src="@/assets/img/about/innovation-dot.png">
          </div>
          <div class="history-info">
            <div class="history-text">
              <h3>1975 <br>
                Expand scale</h3>
              <h4>為了滿足不斷增長的市場需求，<br>
                我們擴大了莊園的規模，<br>
                新增加了數百畝的葡萄園。<br>
                我們有更多的空間進行釀酒實驗和創新。<br>
                這些新的葡萄園成為我們未來發展的基石，<br>
                每一顆新種下的葡萄苗都承載著我們的希望與願景。
              </h4>
            </div>
            <div class="history-info-pic">
              <img src="@/assets/img/about/scale.png" style="width: 250px; height: 150px;">
            </div>
          </div>
          <div class="history-info-pic-dot">
            <img src="@/assets/img/about/scale-dot.png">
          </div>
          <div class="history-info">
            <div class="history-info-pic">
              <img src="@/assets/img/about/development.png" style="width: 150px;height: 200px;">
            </div>
            <div class="history-text">
              <h3>1979 <br>
                Inheritance And Development</h3>
              <h4>我們只是個小規模的家庭酒莊。<br>
                創始人對葡萄酒充滿熱情，<br>
                在這片肥沃的土地上種植優質葡萄，<br>
                釀造出最純正的葡萄酒。
              </h4>
            </div>
          </div>
        </div>
      </div>

    </div>

  </section>

  <!-- 交通資訊 -->
  <section class="section-traffic-information">
    <div class="traffic-container">
      <div class="traffic-row">
        <div class="about-title-wrap">
          <div class="line"></div>
          <h2>traffic information</h2>
          <div class="line"></div>
        </div>
      </div>
      <div class="traffic-item">
        <div class="traffic-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d231169.68956732194!2d121.23707121546516!3d25.13479831862973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442ae741e683ffb%3A0xb9e1d4405cdc23fe!2zMTEx5Y-w5YyX5biC5aOr5p6X5Y2A!5e0!3m2!1szh-TW!2stw!4v1718276547616!5m2!1szh-TW!2stw"
            width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
        <div class="traffic-list">
          <div class="traffic-text">
            <span class="material-symbols-outlined">
              location_on
            </span>
            <h4>地址</h4>
          </div>
          <h4 style="margin-left:33px;">台北市士林區華興里7鄰123號</h4>
          <div class="traffic-text">
            <span class="material-symbols-outlined">support_agent</span>
            <h4>連絡電話</h4>
          </div>
          <h4 style="margin-left:33px;">02-8792-5386</h4>
          <div class="traffic-text">
            <span class="material-symbols-outlined">fax</span>
            <h4>傳真</h4>
          </div>
          <h4 style="margin-left:33px;">02-8792-5386</h4>
          <div class="traffic-text">
            <span class="material-symbols-outlined">schedule</span>
            <h4>營業時間</h4>
          </div>
          <h4 style="margin-left:33px;">週一二：公休</h4>
          <h4 style="margin-left:33px;">週三至週日：9:00 ～ 18:30</h4>
        </div>
      </div>
    </div>

  </section>
</template>

<script>

</script>

<style></style>