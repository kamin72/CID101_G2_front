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
    error: null,
  }),

  actions: {
    // 從後台獲取所有課程
    async fetchCourses() {
      this.loading = true
      try {
        const response = await fetch('http://localhost/CID101_G2_php/front/getCourse.php')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        this.allCourse = data.course
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
        this.loading = true
        this.error = null
        try {
          const response = await fetch(`http://localhost/CID101_G2_php/front/getCourse.php?id=${courseId}`)
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          const data = await response.json()
          // 假設 API 返回的結構與獲取所有課程時相同
          this.specificCourse = data.course[0] // 獲取第一個（也應該是唯一的）課程
        } catch (error) {
          console.error('Failed to fetch specific course:', error)
          this.error = '無法獲取特定課程數據。請稍後再試。'
        } finally {
          this.loading = false
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

    loadCheckoutSum() {
      const savedSum = localStorage.getItem('checkoutSum')
      if (savedSum) {
        this.checkoutSum = parseFloat(savedSum)
      } else {
        console.warn('在 localStorage 中找不到結帳金額')
        this.checkoutSum = 0
      }
    },

    setParticipantCount(count) {
      this.participantCount = count
    },
  },

  getters: {
    getCourseById: (state) => (id) => {
      return state.allCourse.find(course => course.course_id === parseInt(id))
    }
  }
})