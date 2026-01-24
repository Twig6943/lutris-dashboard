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
      await this.getInfo({ token: res.data.token })
      return res.data.token
    },
    async getInfo(params) {
      const res = await getInfoApi(params)
      this.info = res.data.info
      return res.data.info
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
