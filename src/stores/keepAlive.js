import { defineStore } from 'pinia'

export const useKeepAliveStore = defineStore('keepAlive', {
  state: () => ({
    componentNames: []
  }),
  actions: {
    setComponentNames(names) {
      this.componentNames = names
    },
    addComponentName(name) {
      if (!this.componentNames.includes(name)) {
        this.componentNames.push(name)
      }
    },
    removeComponentName(name) {
      const index = this.componentNames.indexOf(name)
      if (index !== -1) {
        this.componentNames.splice(index, 1)
      }
    }
  }
})
