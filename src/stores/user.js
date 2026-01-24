import { defineStore } from 'pinia'
import { loginApi, getInfoApi, loginOutApi } from '@/api/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    info: {}
  }),
  actions: {
    async login(params) {
      const res = await loginApi(params)
      this.token = res.data.token
      await this.getInfo()
      return res.data.token
    },
    async getInfo() {
      const res = await getInfoApi()
      this.info = res.data
      return res.data
    },
    loginOut() {
      loginOutApi()
        .catch(() => {})
        .finally(() => {
          localStorage.removeItem('tabs')
          this.$reset()
          location.reload()
        })
    }
  },
  persist: true
})
