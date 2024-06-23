import { defineStore } from 'pinia'

export default defineStore('memberStore', {
  state: () => ({
    memberInfo: null
  }),
  getters: {
    accountName() {
      return this.memberInfo[0]['name']
    }
  },
  actions: {
    // setMemberInfo(info, account, password) {
    //   this.memberInfo = info
    //   this.account = account
    //   this.password = password
    // },
    login(account, password) {
      const formData = new URLSearchParams()
      formData.append('account', account)
      formData.append('password', password)

      fetch('http://localhost/CID101_G2_php/front/memberLogin.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert(data.msg)
          } else if (data.member) {
            alert('welcome')
            this.memberInfo = data.member
            localStorage.setItem('memberInfo', JSON.stringify(this.memberInfo))
            // this.setMemberInfo(data.member, account, password)

            // 如果登入成功，可以進行頁面跳轉
            // this.$router.push('/');
          }
        })
    },
    getMemberData() {
      let storage = localStorage.getItem('memberInfo')
      if (storage) {
        this.memberInfo = JSON.parse(storage)
      }
    }
  }
})
