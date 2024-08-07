<template>
  <section v-if="!isMobile" class="booking_flow">
    <CartFlow :flow="item" v-for="item in flow" :key="item.id" />
  </section>
  <section v-else class="cartFlowRWD">
    <CartFlowRWD :flowRwd="itemRwd" v-for="itemRwd in flowRwd" :key="itemRwd.id" />
  </section>
  <section class="course-booking-section">
    <div class="course-booking-container">
      <form class="col-9 col-md-10 col-sm-12 course-booking-form">
        <!-- 結帳金額 -->
        <div class="form_ltem_list">
          <div class="form_item">
            <h4>結帳金額</h4>
          </div>
          <div class="form_box">
            <p>NT. {{ sum }}</p>
          </div>
        </div>
        <div class="btn-wrap">
          <RouterLink :to="'/courseBookingDetail_confirm/' + course.id" style="text-decoration: none">
            <button type="button" class="big-btn-secondary">上一步</button>
          </RouterLink>
          <button class="big-btn-primary" @click.prevent="sendCardInfo">確認付款</button>
        </div>
      </form>
      <!-- 要傳到資料庫的訂單資訊 -->
      <form ref="form">
        <input type="hidden" name="name" :value="this.memName" />
        <input type="hidden" name="phone" :value="this.memPhone" />
        <input type="hidden" name="email" :value="this.memEmail" />
        <input type="hidden" name="courseName" :value="this.course.course_name" />
        <input type="hidden" name="coursePrice" :value="this.course.course_price" />
        <input type="hidden" name="bookAmount" :value="this.participantCount" />
        <input type="hidden" name="disAmount" :value="this.discount" />
        <input type="hidden" name="bookPaidAmount" :value="this.sum" />
        <input type="hidden" name="bookOtherRequirements" :value="this.otherRequirements" />
      </form>
    </div>
  </section>
</template>

<script>
import CartFlow from '@/components/Cart/CartFlow.vue'
import CartFlowRWD from '@/components//Cart/CartFlowRWD.vue'
import { mapState, mapActions } from 'pinia'
import courseStore from '@/stores/course'
import memberStore from '@/stores/loginMember'

export default {
  components: {
    CartFlow,
    CartFlowRWD
  },

  data() {
    return {
      flow: [
        {
          id: 1,
          icon: 'edit_document',
          opacity: '1',
          text: '填寫預約資料',
          bold: '300',
          color: '#AEA495',
          borderColor: '#AEA495'
        },
        {
          id: 2,
          icon: 'checklist',
          opacity: '1',
          text: '確認預約資料',
          bold: '300',
          color: '#AEA495',
          borderColor: '#AEA495'
        },
        {
          id: 3,
          icon: 'paid',
          opacity: '1',
          text: '付款方式',
          bold: '300',
          color: '#AEA495'
        },
        {
          id: 4,
          icon: 'check',
          opacity: '0.3',
          text: '完成預約',
          bold: '300'
        }
      ],
      flowRwd: [
        {
          id: 3,
          icon: 'paid',
          opacity: '1',
          text: '付款方式',
          bold: '300',
          color: '#AEA495'
        },
        {
          id: 4,
          icon: 'check',
          opacity: '0.3',
          text: '完成預約',
          bold: '300'
        }
      ],
      cardNumber1: '',
      cardNumber2: '',
      cardNumber3: '',
      cardNumber4: '',
      cardHolder: '',
      expiryDate: '',
      cvv: '',
      discount: '',
      windowWidth: window.innerWidth
    }
  },

  computed: {
    ...mapState(courseStore, [
      'specificCourse',
      'checkoutSum',
      'otherRequirements',
      'participantCount'
    ]),
    ...mapState(memberStore, ['memberInfo']),
    memName() {
      return this.memberInfo?.[0]?.name || ''
    },
    memEmail() {
      return this.memberInfo?.[0]?.email || ''
    },
    memPhone() {
      return this.memberInfo?.[0]?.phone || ''
    },
    sum() {
      return this.checkoutSum
    },
    course() {
      return this.specificCourse || []
    },
    isMobile() {
      return this.windowWidth < 450
    }
  },

  methods: {
    ...mapActions(courseStore, ['loadCheckoutSum', 'getSpecificData']),

    updateWindowWidth() {
      this.windowWidth = window.innerWidth
    },

    // 綠界付款用
    sendCardInfo() {
      // 創建一個包含表單數據的對象
      const formData = {
        TotalAmount: this.checkoutSum
      }

      // 創建一個隱藏的表單並提交
      const form = document.createElement('form')
      form.method = 'POST'
      form.action = `${import.meta.env.VITE_API_URL}/front/SDK_PHP-master/example/Payment/Aio/CreateCreditOrder_course.php`

      for (const key in formData) {
        if (formData[key] !== null && formData[key] !== '') {
          const input = document.createElement('input')
          input.type = 'hidden'
          input.name = key
          input.value = formData[key]
          form.appendChild(input)
        }
      }

      document.body.appendChild(form)
      form.submit()

      this.saveOrderData()
    },

    submitOrder() {
      const orderData = {
        customerId: this.memberInfo[0].no,
        courseId: this.course.course_id,
        courseName: this.course.course_name,
        coursePrice: this.course.course_price,
        bookAmount: this.participantCount,
        disAmount: this.discount,
        bookPaidAmount: this.sum,
        otherRequirements: this.otherRequirements
      }

      const url = `${import.meta.env.VITE_API_URL}/front/courseSubmit_account.php`

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('網絡響應不正常')
          }
          return response.json()
        })
        .then((data) => {
          if (data.error) {
            throw new Error(data.error)
          }
          alert('訂單建立成功')
        })
        .catch((error) => {
          console.error('錯誤:', error)
          alert('訂單提交失敗：' + error.message)
        })
    },
    saveOrderData() {
      const orderData = {
        customerId: this.memberInfo[0].no,
        courseId: this.course.course_id,
        courseName: this.course.course_name,
        coursePrice: this.course.course_price,
        bookAmount: this.participantCount,
        disAmount: this.discount,
        bookPaidAmount: this.sum,
        otherRequirements: this.otherRequirements
      }
      localStorage.setItem('courseOrder', JSON.stringify(orderData))
    }
  },

  mounted() {
    memberStore().getMemberData()
    window.addEventListener('resize', this.updateWindowWidth)
    this.discount = localStorage.getItem('selectedDiscount')
    this.loadCheckoutSum()
    this.getSpecificData(this.$route.params.id)
    // console.log(this.otherRequirements)
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.updateWindowWidth)
  }
}
</script>

<style></style>
