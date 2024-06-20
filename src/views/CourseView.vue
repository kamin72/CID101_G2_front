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
                <router-link r-link v-for="(course, index) in recommendedCourses" :key="index"
                    class="col-3 col-md-6 col-sm-6 event-card1"
                    :to="{ name: 'courseDetail', params: { id: course.id } }">
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
                    <h4>NT. {{ discountedPrice(course.price, course.discount) }}</h4>
                </router-link>
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
                    <div class="col-11 col-md-12 col-sm-12 search-course-list-wrap">
                        <div class="search-course-tabs-panel">
                            <div class="search-course-calen-tab">
                                <div @click="
                                    showCalen = true;
                                showList = false;
                                toggleButton('calen');
                                " :class="{
                                    'big-btn-primary': activeButton === 'calen',
                                    'big-btn-secondary': activeButton !== 'calen',
                                }">
                                    從日曆中選擇
                                    <div class="triangle"></div>
                                </div>
                            </div>
                            <div class="search-course-list-tab">
                                <div @click="
                                    showCalen = false;
                                showList = true;
                                toggleButton('list');
                                " :class="{
                                    'big-btn-primary': activeButton === 'list',
                                    'big-btn-secondary': activeButton !== 'list',
                                }">
                                    從清單中選擇
                                    <div class="triangle"></div>
                                </div>
                            </div>
                        </div>

                        <!-- 預約日曆 -->
                        <div v-show="showCalen && !isMobile" class="col-10 col-md-12 col-sm-12 search-course-calendar">
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
                                        'has-course': hasCourse(day.date),
                                    }">
                                        <div class="day-number">{{ day.date.getDate() }}</div>
                                        <router-link v-if="hasCourse(day.date)"
                                            :to="{ name: 'courseDetail', params: { id: getCourseIdByDate(day.date) } }"
                                            class="course-item">
                                            <small v-if="getCourseTagByDate(day.date)" class="course-tag">
                                                {{ getCourseTagByDate(day.date) }}
                                            </small>
                                            <p :style="{
                                                paddingTop: getCourseTagByDate(day.date) ? '' : 'unset',
                                            }">
                                                {{ getCourseNameByDate(day.date) }}
                                            </p>
                                        </router-link>
                                    </div>
                                    <div v-for="n in endDayOfWeek" :key="n" class="day empty"></div>
                                </div>
                            </div>
                        </div>

                        <!-- 預約卡片清單 -->
                        <div v-show="showList || isMobile" class="col-7 col-md-11 col-sm-12 event-card-wrap">
                            <div class="search-course-calendar-header">
                                <span class="prev material-symbols-outlined"
                                    @click="prevListMonth">arrow_back_ios</span>
                                <h4 class="month-year">
                                    {{ currentListDate.getFullYear() }}.{{
                                        currentListDate.getMonth() + 1
                                    }}
                                </h4>
                                <span class="next material-symbols-outlined"
                                    @click="nextListMonth">arrow_forward_ios</span>
                            </div>
                            <div v-for="([date, course], index) in getMonthCourses(
                                currentListDate
                            )" :key="index" class="event-card2">
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
                                            <h4><span>NT. </span>{{ discountedPrice(course.price, course.discount) }}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                                <router-link :to="{ name: 'courseDetail', params: { id: course.id } }"
                                    class="small-btn-primary">
                                    詳情資訊<span class="material-symbols-outlined">arrow_forward_ios</span>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import courseData from '../../public/courses.json';
import { mapActions } from 'pinia';
import courseStore from '@/stores/course';

export default {
    data() {
        return {
            weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            currentDate: new Date(),
            currentListDate: new Date(),
            courses: new Map(),
            showCalen: true,
            showList: false,
            activeButton: "calen",
            recommendedCourses: [],
            courseData: courseData,
            isMobile: false,
        };
    },
    computed: {
        currentMonth() {
            return this.currentDate.getMonth() + 1;
        },
        currentYear() {
            return this.currentDate.getFullYear();
        },
        startDayOfWeek() {
            const startDate = new Date(
                this.currentYear,
                this.currentDate.getMonth(),
                1
            );
            return startDate.getDay();
        },
        endDayOfWeek() {
            const endDate = new Date(
                this.currentYear,
                this.currentDate.getMonth() + 1,
                0
            );
            const endDay = endDate.getDay();
            return 6 - endDay;
        },
        days() {
            const days = [];
            const startDate = new Date(
                this.currentYear,
                this.currentDate.getMonth(),
                1
            );
            const endDate = new Date(
                this.currentYear,
                this.currentDate.getMonth() + 1,
                0
            );

            for (
                let date = startDate;
                date <= endDate;
                date.setDate(date.getDate() + 1)
            ) {
                const day = new Date(date);
                days.push({
                    date: day,
                    isToday: day.toDateString() === new Date().toDateString(),
                });
            }
            return days;
        },
        allCourse() {
            return courseStore().allCourse;
        },
    },

    methods: {
        ...mapActions(courseStore, ['getData']),
        prevMonth() {
            this.currentDate = new Date(
                this.currentDate.getFullYear(),
                this.currentDate.getMonth() - 1
            );
        },
        nextMonth() {
            this.currentDate = new Date(
                this.currentDate.getFullYear(),
                this.currentDate.getMonth() + 1
            );
        },
        prevListMonth() {
            this.currentListDate = new Date(
                this.currentListDate.getFullYear(),
                this.currentListDate.getMonth() - 1
            );
        },
        nextListMonth() {
            this.currentListDate = new Date(
                this.currentListDate.getFullYear(),
                this.currentListDate.getMonth() + 1
            );
        },
        formatDisplayDate(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}/${month}/${day}`;
        },
        formatDate(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
        hasCourse(date) {
            const formattedDate = this.formatDate(date);
            return this.courses.has(formattedDate);
        },
        getCourseTagByDate(date) {
            const formattedDate = this.formatDate(date);
            const course = this.courses.has(formattedDate) ? this.courses.get(formattedDate) : null;
            return course ? course.tag : null;
        },
        getCourseNameByDate(date) {
            const formattedDate = this.formatDate(date);
            const course = this.courses.has(formattedDate)
                ? this.courses.get(formattedDate)
                : null;
            return course ? course.name : "";
        },
        toggleButton(button) {
            if (button === "calen" && this.activeButton === "calen") {
                return;
            }
            this.activeButton = button;
        },
        parseImg(file) {
            return new URL(`../assets/img/course/courselist/${file}`, import.meta.url)
                .href;
        },
        getRecommendedCourses() {
            const currentDate = new Date();
            const futureCoursesArray = Array.from(this.courses).filter(
                ([date]) => new Date(date) >= currentDate
            );

            if (futureCoursesArray.length <= 4) {
                this.recommendedCourses = futureCoursesArray.map(([date, course]) => ({
                    ...course,
                    date,
                }));
            } else {
                const shuffledCourses = futureCoursesArray.sort(
                    () => 0.5 - Math.random()
                );
                this.recommendedCourses = shuffledCourses
                    .slice(0, 4)
                    .map(([date, course]) => ({ ...course, date }));
            }
        },
        getCourseIdByDate(date) {
            const formattedDate = this.formatDate(date);
            const course = this.courses.get(formattedDate);
            return course ? course.id : '';
        },
        getMonthCourses(date) {
            const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
            const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 1);
            return Array.from(this.courses).filter(([courseDate]) => {
                const formattedDate = new Date(courseDate);
                return formattedDate >= monthStart && formattedDate <= monthEnd;
            });
        },
        discountedPrice(price, discount) {
            return discount ? price * (1 - discount) : price;
        },
        checkIsMobile() {
            this.isMobile = window.innerWidth < 450;
        },
    },

    async mounted() {
        window.addEventListener('resize', this.checkIsMobile);
        await this.getData();
        this.getRecommendedCourses();
    },

    beforeUnmount() {
        window.removeEventListener('resize', this.checkIsMobile);
    },

    created() {
        this.courseData.forEach(course => {
            this.courses.set(course.date, {
                id: course.id,
                img: course.image,
                tag: course.tag,
                name: course.name,
                price: course.price,
                desc: course.desc,
            });
        });

        this.checkIsMobile();

        if (this.isMobile) {
            this.activeButton = 'list';
            this.showList = true;
            this.showCalen = false;
        }
    },
};
</script>