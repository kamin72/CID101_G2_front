import { defineStore } from 'pinia'

export default defineStore('memberStore', {
  state: () => ({
    memberInfo: null,
    memberComp: null
  }),
  getters: {
    accountName() {
      return this.memberInfo?.[0]['name'] || ''
    },
    isNormalAccount() {
      if (this.memberInfo?.[0]['identity'] == 1) {
        return true
      }
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

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/front/member/memberLogin.php`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData.toString()
          }
        )

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
    fetchMemberData() {
      fetch(`${import.meta.env.VITE_API_URL}/front/member/memberLogin.php`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert(data.msg)
          } else if (data.member) {
            this.memberAccount = data.member
            // localStorage.setItem('memberComp', JSON.stringify(this.memberAccount))
          }
        })
    },
    getMemberData() {
      let storage = localStorage.getItem('memberInfo')
      if (storage) {
        this.memberInfo = JSON.parse(storage)
      } else {
        this.memberInfo = null
      }
    },
    fetchMemberCompData() {
      fetch(`${import.meta.env.VITE_API_URL}/front/member/getMember_comp.php`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert(data.msg)
          } else if (data.member) {
            this.memberComp = data.member
            localStorage.setItem('memberComp', JSON.stringify(this.memberComp))
          }
        })
    },
    getMemberCompData() {
      let storage = localStorage.getItem('memberComp')
      if (storage) {
        this.memberComp = JSON.parse(storage)
      } else {
        this.memberComp = null
      }
    }
  }
})
