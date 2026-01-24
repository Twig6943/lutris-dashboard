import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    isCollapse: false,
    contentFullScreen: false,
    showLogo: true,
    fixedTop: false,
    expandOneMenu: true,
    elementSize: 'small',
    theme: {
      state: {
        style: 'default',
        primaryColor: '#409eff',
        menuType: 'side'
      }
    }
  }),
  actions: {
    setCollapse(value) {
      this.isCollapse = value
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    setContentFullScreen(value) {
      this.contentFullScreen = value
    }
  },
  persist: true
})
