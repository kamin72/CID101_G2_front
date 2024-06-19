import { defineStore } from 'pinia'

export default defineStore('courseStore', {
  state: () => ({
    allCourse: [],
    specificCourse: null,
    tempCourse: []
  }),

  actions: {
    //fetch所有課程，將資料丟進allCourse
    getData() {
      fetch('/courses.json')
        .then((response) => response.json())
        .then((data) => {
          this.allCourse = data
        })
    },
    //fetch路由中id的資料，將資料丟進specificCourse
    getSpecificData(courseId) {
      if (courseId) {
        fetch('/courses.json')
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
    }
  }
})
