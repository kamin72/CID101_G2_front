import { defineStore } from 'pinia'

export default defineStore('courseStore', {
  state: () => ({
    allCourse: [],
    specificCourse: null,
    tempCourse: [],
    checkoutSum: 0, // 新添加的狀態來存儲結帳金額
    otherRequirements: '',
    participantCount: 1,
  }),

  actions: {
    //fetch所有課程，將資料丟進state裡的allCourse陣列
    getData() {
      fetch('../../public/courses.json')
        .then((response) => response.json())
        .then((data) => {
          this.allCourse = data
        })
    },
    //fetch路由中id的資料，將資料丟進specificCourse
    getSpecificData(courseId) {
      if (courseId) {
        fetch('../../public/courses.json')
          .then((response) => response.json())
          .then((data) => {
            this.specificCourse = data.find((course) => course.id == courseId)
          })
          .catch((error) => {
            console.error('Failed to fetch specific course:', error)
          })
      }
    },
    storeCourse() {
      let storage = localStorage.setItem('course', JSON.stringify(this.specificCourse))
      this.tempCourse = storage
    },
    // 新添加的動作來設置結帳金額
    setCheckoutSum(sum) {
      this.checkoutSum = sum
      // 可以選擇將金額也存儲到 localStorage，以便在頁面刷新後保留
      localStorage.setItem('checkoutSum', sum)
    },
    // 新添加的動作來從 localStorage 加載結帳金額
    loadCheckoutSum() {
      const savedSum = localStorage.getItem('checkoutSum')
      if (savedSum) {
        this.checkoutSum = parseFloat(savedSum)
      }else {
        console.warn('在 localStorage 中找不到結帳金額');
        this.checkoutSum = 0; // 或者某個默認值
      }
    },
    setOtherRequirements(requirements) {
      this.otherRequirements = requirements;
    },
    setParticipantCount(count) {
      this.participantCount = count;
    },
  }
})
