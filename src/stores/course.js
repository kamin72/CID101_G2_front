import { defineStore } from 'pinia';

export default defineStore('courseStore', {
  state: () => ({
    allCourse: [],
    specificCourse: null,
  }),

  actions: {
    async getData() {
      try {
        const response = await fetch('/courses.json');
        const data = await response.json();
        this.allCourse = data;
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    },

    async getSpecificData(courseId) {
      if (courseId) {
        try {
          const response = await fetch('/courses.json');
          const data = await response.json();
          this.specificCourse = data.find((course) => course.id === courseId);
        } catch (error) {
          console.error('Failed to fetch specific course:', error);
        }
      }
    },
  },
});