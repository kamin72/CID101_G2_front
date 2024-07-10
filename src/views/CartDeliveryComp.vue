<template>
  <div class="container" v-if="$route.path === '/cart_comp/cartdelivery_comp'">
    <section v-show="!isMobile">
      <CartFlow :flow="item" v-for="item in flow" :key="item.id" />
    </section>
    <section v-show="isMobile" class="cartFlowRWD">
      <CartFlowRWD :flowRwd="itemRwd" v-for="itemRwd in flowRwd" :key="itemRwd.id" />
    </section>
    <div class="wrap_all">
      <FormComp
        v-model:phone="phone"
        v-model:email="email"
        @update:phone="saveToLocalstorage"
        @update:email="saveToLocalstorage"
        ref="form"
      />
      <aside class="payMethod">
        <PayMethod @change-method="changePaymentMethod" />
        <div class="hr"></div>
        <RouterLink
          :to="{ path: 'pay_info', query: { method: selectedMethod } }"
          style="text-decoration: none"
        >
          <button
            class="big-btn-primary deliverySubmit"
            :disabled="!canSubmit"
            :class="!canSubmit ? 'big-btn-invalid' : 'big-btn-primary'"
          >
            提交配送資訊
          </button>
        </RouterLink>
      </aside>
    </div>
  </div>
  <RouterView />
</template>

<script>
import CartFlow from '@/components/Cart/CartFlow.vue'
import CartFlowRWD from '@/components//Cart/CartFlowRWD.vue'
import FormComp from '@/components/Cart/FormComp.vue'
import PayMethod from '@/components/Cart/PayMethod.vue'

import { mapState, mapActions } from 'pinia'
import memberStore from '@/stores/loginMember'

export default {
  emits: ['route-change'],
  components: {
    CartFlow,
    FormComp,
    PayMethod,
    CartFlowRWD
  },
  data() {
    return {
      flow: [
        {
          id: 1,
          icon: 'receipt_long',
          opacity: '1',
          text: '詢價清單',
          bold: '400',
          color: '#AEA495',
          borderColor: '#AEA495'
        },
        {
          id: 2,
          icon: 'local_shipping',
          opacity: '1',
          text: '填寫配送資訊',
          bold: '400',
          color: '#AEA495',
          borderColor: '#D5D5D5'
        },
        {
          id: 3,
          icon: 'paid',
          opacity: '0.3',
          text: '選擇付款方式',
          bold: '0'
        },
        {
          id: 4,
          icon: 'check',
          opacity: '0.3',
          text: '完成詢價',
          bold: '0'
        }
      ],
      flowRwd: [
        {
          id: 1,
          icon: 'local_shipping',
          opacity: '1',
          text: '填寫配送資訊',
          bold: '400',
          color: '#AEA495',
          borderColor: '#D5D5D5'
        },
        {
          id: 2,
          icon: 'paid',
          opacity: '0.3',
          text: '選擇付款方式',
          bold: '0'
        }
      ],
      selectedMethod: null,
      deliveryInfo_comp: [],
      windowWidth: window.innerWidth,
      // selectedPaymentMethod: null,
      phone: '',
      email: ''
    }
  },
  created() {},
  mounted() {
    window.addEventListener('resize', this.updateWindowWidth)
    this.showLocalstorage()
    this.fetchMemberCompData()
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateWindowWidth)
  },
  methods: {
    ...mapActions(memberStore, ['fetchMemberCompData']),
    changePaymentMethod(index) {
      this.selectedMethod = index
    },
    updateWindowWidth() {
      this.windowWidth = window.innerWidth
    },
    // submitForm() {
    //   if (this.canSubmit) {
    //     this.$router.push({
    //       path: '/pay_info',
    //       query: {
    //         method: this.selectedPaymentMethod,
    //         phone: this.phone,
    //         email: this.email
    //       }
    //     })
    //   } else {
    //     alert('請填寫所有必填字段並確保電話為10個數字和電子郵件格式正確')
    //   }
    // }
    saveToLocalstorage() {
      this.deliveryInfo_comp = {
        phone: this.memberComp?.[0]['phone'],
        email: this.memberComp?.[0]['email']
      }
      localStorage.setItem('deliveryInfo_comp', JSON.stringify(this.deliveryInfo_comp))
    },
    showLocalstorage() {
      if (localStorage.getItem('deliveryInfo_comp')) {
        this.deliveryInfo_comp = JSON.parse(localStorage.getItem('deliveryInfo_comp'))
        this.phone = this.deliveryInfo_comp.phone
        this.email = this.deliveryInfo_comp.email
      }
      const savedMethod = localStorage.getItem('selectedMethod')
      if (savedMethod !== null) {
        this.selectedMethod = parseInt(savedMethod)
      }
    }
  },
  computed: {
    ...mapState(memberStore, ['memberComp']),
    canSubmit() {
      const phoneValid = /^09\d{8}$/.test(this.phone)
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)
      return this.selectedMethod !== null && phoneValid && emailValid
    },
    isMobile() {
      return this.windowWidth < 450
    }
  }
}
</script>
