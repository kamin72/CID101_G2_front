import { defineStore } from 'pinia'

export default defineStore('courseStore', {
  state: () => ({
    allCourse: [],
    specificCourse: null,
    tempCourse: [],
    checkoutSum: 0,
    otherRequirements: '',
    participantCount: 1,
    loading: false,
    error: null
  }),

  actions: {
    // 從後台獲取所有課程
    async fetchCourses() {
      this.loading = true
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/front/getCourse.php`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        this.allCourse = data.course
        // console.log(this .allCourse)
      } catch (error) {
        console.error('Error fetching courses:', error)
        this.error = '無法獲取課程數據。請稍後再試。'
      } finally {
        this.loading = false
      }
    },

    // 從後台獲取特定課程
    async getSpecificData(courseId) {
      if (courseId) {
        this.loading = true;
        this.error = null;
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/front/getCourse.php?id=${courseId}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          if (data.course && data.course.length > 0) {
            this.specificCourse = data.course[0];
          } else {
            throw new Error('Course not found');
          }
        } catch (error) {
          console.error('Failed to fetch specific course:', error);
          this.error = '無法獲取特定課程數據。請稍後再試。';
        } finally {
          this.loading = false;
        }
      }
    },

    storeCourse() {
      localStorage.setItem('course', JSON.stringify(this.specificCourse))
      this.tempCourse = JSON.parse(localStorage.getItem('course'))
    },

    setCheckoutSum(sum) {
      this.checkoutSum = sum
      localStorage.setItem('checkoutSum', sum)
    },

    setParticipantCount(count) {
      this.participantCount = count
      localStorage.setItem('participantCount', count)
    },

    setOtherRequirements(requirements) {
      this.otherRequirements = requirements
      localStorage.setItem('otherRequirements', requirements)
    },

    loadCheckoutSum() {
      const savedSum = localStorage.getItem('checkoutSum')
      if (savedSum) {
        this.checkoutSum = parseFloat(savedSum)
      } else {
        console.warn('在 localStorage 中找不到結帳金額')
        this.checkoutSum = 0
      }
    },

    // 清除 store 中的数据
    clearBookingData() {
      this.checkoutSum = 0
      this.otherRequirements = ''
      this.participantCount = 1
      this.specificCourse = null

      // 清除 localStorage 中的数据
      localStorage.removeItem('checkoutSum')
      localStorage.removeItem('otherRequirements')
      localStorage.removeItem('selectedDiscount')
    }
  },

  getters: {
    getCourseById: (state) => (id) => {
      return state.allCourse.find((course) => course.course_id === parseInt(id))
    }
  }
})
