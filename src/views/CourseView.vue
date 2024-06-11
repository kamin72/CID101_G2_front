<template>
    <div class="course-page-container">
        <div class="row">
            <small class="col-12 scrumble">首頁<span class="material-symbols-outlined">arrow_forward_ios</span>品酒課程
            </small>
        </div>
    </div>
    <section class="section-recom-course">
        <div class="course-page-container">
            <div class="row">
                <div class="col-12 recom-course">
                    <div class="course-title-wrap">
                        <div class="line"></div>
                        <h2>Recommended</h2>
                        <div class="line"></div>
                    </div>
                </div>
                <!-- 推薦卡片清單 -->
                <div v-for="(course, index) in recommendedCourses" :key="index"
                    class="col-3 col-md-4 col-sm-6 event-card1">
                    <div class="event-card1-img-wrap">
                        <img :src="parseImg(course.img)" />
                        <div v-if="course.tag" class="event-card1-tag">
                            <p>{{ course.tag }}</p>
                        </div>
                        <div class="book-now">
                            <p>BOOK NOW</p>
                        </div>
                    </div>
                    <div class="event-card1-font-wrap">
                        <h4>{{ course.name }}</h4>
                        <p>{{ formatDisplayDate(new Date(course.date)) }} 開課</p>
                    </div>
                    <h4>NT. {{ course.price }}</h4>
                </div>
            </div>
        </div>
    </section>
    <section class="section-search-course">
        <div class="course-page-container">
            <div class="row">
                <div class="col-12 search-course">
                    <div class="course-title-wrap">
                        <div class="line"></div>
                        <h2>Search</h2>
                        <div class="line"></div>
                    </div>
                    <div class="col-11 search-course-list-wrap">
                        <div class="search-course-tabs-panel">
                            <div class="search-course-calen-tab">
                                <div @click="
                                    showCalen = true
                                showList = false
                                toggleButton('calen')
                                    " :class="{
                    'big-btn-primary': activeButton === 'calen',
                    'big-btn-secondary': activeButton !== 'calen'
                }">
                                    從日曆中選擇
                                    <div class="triangle"></div>
                                </div>
                            </div>
                            <div class="search-course-list-tab">
                                <div @click="
                                    showCalen = false
                                showList = true
                                toggleButton('list')
                                    " :class="{
                    'big-btn-primary': activeButton === 'list',
                    'big-btn-secondary': activeButton !== 'list'
                }">
                                    從清單中選擇
                                    <div class="triangle"></div>
                                </div>
                            </div>
                        </div>

                        <!-- 預約日曆 -->
                        <div v-show="showCalen" class="col-10 search-course-calendar">
                            <div class="search-course-calendar-header">
                                <span class="prev material-symbols-outlined" @click="prevMonth">arrow_back_ios</span>
                                <h4 class="month-year">{{ currentYear }}.{{ currentMonth }}</h4>
                                <span class="next material-symbols-outlined" @click="nextMonth">arrow_forward_ios</span>
                            </div>
                            <div class="search-course-calendar-body">
                                <div class="weekdays">
                                    <p v-for="weekday in weekdays" :key="weekday">
                                        {{ weekday }}
                                    </p>
                                </div>
                                <div class="days">
                                    <div v-for="n in startDayOfWeek" :key="n" class="day empty"></div>
                                    <div v-for="day in days" :key="day.date" class="day" :class="{
                                        today: day.isToday,
                                        'has-course': hasCourse(day.date)
                                    }">
                                        <div class="day-number">{{ day.date.getDate() }}</div>
                                        <div v-if="hasCourse(day.date)" class="course-name">
                                            <small v-if="getCourseTagByDate(day.date)" class="course-tag">
                                                {{ getCourseTagByDate(day.date) }}
                                            </small>
                                            <p :style="{
                                                paddingTop: getCourseTagByDate(day.date) ? '' : 'unset'
                                            }">
                                                {{ getCourseNameByDate(day.date) }}
                                            </p>
                                        </div>
                                    </div>
                                    <div v-for="n in endDayOfWeek" :key="n" class="day empty"></div>
                                </div>
                            </div>
                        </div>

                        <!-- 預約卡片清單 -->
                        <div v-show="showList" class="col-7 col-md-7 col-sm-12 event-card-wrap">
                            <div class="search-course-calendar-header">
                                <span class="prev material-symbols-outlined"
                                    @click="prevListMonth">arrow_back_ios</span>
                                <h4 class="month-year">
                                    {{ currentListDate.getFullYear() }}.{{ currentListDate.getMonth() + 1 }}
                                </h4>
                                <span class="next material-symbols-outlined"
                                    @click="nextListMonth">arrow_forward_ios</span>
                            </div>
                            <div v-for="([date, course], index) in getMonthCourses(currentListDate)" :key="index"
                                class="event-card2">
                                <div v-if="course.tag" class="event-card2-tag">
                                    <p>{{ course.tag }}</p>
                                </div>
                                <div class="event-card2-img-wrap">
                                    <img :src="parseImg(course.img)" />
                                </div>
                                <div class="event-card2-info-wrap">
                                    <div class="event-card2-left-wrap">
                                        <div class="event-card2-title-wrap">
                                            <h4>{{ course.name }}</h4>
                                            <p>{{ formatDisplayDate(new Date(date)) }} 開課</p>
                                        </div>
                                        <div class="event-card2-intro-wrap">
                                            <small>{{ course.desc }}</small>
                                        </div>
                                    </div>
                                    <div class="event-card2-right-wrap">
                                        <div class="price">
                                            <h4><span>NT. </span>{{ course.price }}</h4>
                                        </div>
                                    </div>
                                </div>
                                <div class="small-btn-primary">
                                    詳情資訊<span class="material-symbols-outlined">arrow_forward_ios</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            currentDate: new Date(),
            currentListDate: new Date(),
            courses: new Map(),
            showCalen: true,
            showList: false,
            activeButton: 'calen',
            recommendedCourses: []
        }
    },
    computed: {
        currentMonth() {
            return this.currentDate.getMonth() + 1
        },
        currentYear() {
            return this.currentDate.getFullYear()
        },
        startDayOfWeek() {
            const startDate = new Date(this.currentYear, this.currentDate.getMonth(), 1)
            return startDate.getDay()
        },
        endDayOfWeek() {
            const endDate = new Date(this.currentYear, this.currentDate.getMonth() + 1, 0)
            const endDay = endDate.getDay()
            return 6 - endDay
        },
        days() {
            const days = []
            const startDate = new Date(this.currentYear, this.currentDate.getMonth(), 1)
            const endDate = new Date(this.currentYear, this.currentDate.getMonth() + 1, 0)

            for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
                const day = new Date(date)
                days.push({
                    date: day,
                    isToday: day.toDateString() === new Date().toDateString()
                })
            }
            return days
        },
        getMonthCourses() {
            return (date) => {
                const monthStart = new Date(date.getFullYear(), date.getMonth(), 1)
                const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0)
                return Array.from(this.courses).filter(([courseDate]) => {
                    const formattedDate = new Date(courseDate)
                    return formattedDate >= monthStart && formattedDate <= monthEnd
                })
            }
        }
    },

    methods: {
        prevMonth() {
            this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1)
        },
        nextMonth() {
            this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1)
        },
        prevListMonth() {
            this.currentListDate = new Date(
                this.currentListDate.getFullYear(),
                this.currentListDate.getMonth() - 1
            )
        },
        nextListMonth() {
            this.currentListDate = new Date(
                this.currentListDate.getFullYear(),
                this.currentListDate.getMonth() + 1
            )
        },
        formatDisplayDate(date) {
            const formattedDate = date.toISOString().split('T')[0]
            return formattedDate.split('-').join('/')
        },
        formatDate(date) {
            return date.toISOString().split('T')[0]
        },
        hasCourse(date) {
            // 使用 has 方法檢查 Map 中是否存在該日期
            const formattedDate = this.formatDate(date)
            return this.courses.has(formattedDate)
        },
        getCourseTagByDate(date) {
            const formattedDate = this.formatDate(date)
            const course = this.courses.has(formattedDate) ? this.courses.get(formattedDate) : null
            return course ? course.tag : null
        },
        getCourseNameByDate(date) {
            const formattedDate = this.formatDate(date)
            const course = this.courses.has(formattedDate) ? this.courses.get(formattedDate) : null
            return course ? course.name : ''
        },
        toggleButton(button) {
            // 如果點擊的是 a 按鈕且已經被選中,則不做任何操作
            if (button === 'calen' && this.activeButton === 'calen') {
                return
            }
            // 否則切換按鈕狀態
            this.activeButton = button
        },
        parseImg(file) {
            return new URL(`../assets/img/course/courselist/${file}`, import.meta.url).href
        },
        getRecommendedCourses() {
            const currentDate = new Date()
            const futureCoursesArray = Array.from(this.courses).filter(
                ([date]) => new Date(date) >= currentDate
            )

            if (futureCoursesArray.length <= 4) {
                this.recommendedCourses = futureCoursesArray.map(([date, course]) => ({
                    ...course,
                    date
                }))
            } else {
                const shuffledCourses = futureCoursesArray.sort(() => 0.5 - Math.random())
                this.recommendedCourses = shuffledCourses
                    .slice(0, 4)
                    .map(([date, course]) => ({ ...course, date }))
            }
        }
    },

    created() {
        this.courses.set('2024-06-13', {
            img: '1.jpg',
            tag: null,
            name: '品酒初級課程1',
            price: 3200,
            desc: '課程內容包括葡萄酒的基本知識、品酒技巧、如何選酒等。透過理論與實作快速掌握品酒的要領，開啟探索葡萄酒世界的大門。'
        })
        this.courses.set('2024-06-15', {
            img: '2.jpg',
            tag: null,
            name: '品酒中級課程1',
            price: 3600,
            desc: '深入探討葡萄酒風土、品種、釀造工藝及熟成，並透過系統化品評訓練，提升品酒技巧。'
        })
        this.courses.set('2024-07-05', {
            img: '3.jpg',
            tag: null,
            name: '品酒進階課程1',
            price: 4200,
            desc: '深入剖析頂級葡萄酒的特色，探討稀有品種與產區，透過大師級講師的指導，磨練品酒技藝成為真正的品酒專家。'
        })
        this.courses.set('2024-07-30', {
            img: '4.jpg',
            tag: '早鳥優惠',
            name: '品酒初級課程2',
            price: 3800,
            desc: '進一步探索葡萄酒的風味特性。透過品嚐不同產區與風格的葡萄酒，訓練您的味蕾，學習如何描述與分享品酒心得。'
        })
        this.getRecommendedCourses()
        setInterval(this.getRecommendedCourses, 7 * 24 * 60 * 60 * 1000)
    }
}
</script>
