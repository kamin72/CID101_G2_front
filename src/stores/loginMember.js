import { defineStore } from 'pinia'

export default defineStore('memberStore', {
  state: () => ({
    memberInfo: null
  }),
  getters: {
    accountName() {
      return this.memberInfo?.[0]['name'] || ''
    }
  },
  actions: {
    // setMemberInfo(info, account, password) {
    //   this.memberInfo = info
    //   this.account = account
    //   this.password = password
    // },
    async login(account, password) {
      try {
        const formData = new URLSearchParams()
        formData.append('account', account)
        formData.append('password', password)

        const response = await fetch('http://localhost/CID101_G2_php/front/memberLogin.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: formData.toString()
        })

        const data = await response.json()

        if (data.error) {
          alert(data.msg)
          return false
        } else if (data.member) {
          alert('welcome')
          this.memberInfo = data.member
          localStorage.setItem('memberInfo', JSON.stringify(this.memberInfo))
          return true
        }
      } catch (error) {
        console.error('Login error:', error)
        alert('An error occurred during login')
        return false
      }
    },
    getMemberData() {
      let storage = localStorage.getItem('memberInfo')
      if (storage) {
        this.memberInfo = JSON.parse(storage)
      } else {
        this.memberInfo = null
      }
    }
  }
})
