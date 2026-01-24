<template>
  <component :is="type" v-bind="linkProps(to)" @click="hideMenu">
    <slot> </slot>
  </component>
</template>
<script>
import { defineComponent, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app'
export default defineComponent({
  name: 'appLink',
  props: {
    to: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const appStore = useAppStore()
    const { isCollapse } = storeToRefs(appStore)
    const linkProps = (to) => {
      return {
        to: to
      }
    }
    const hideMenu = () => {
      if (document.body.clientWidth <= 1000 && !isCollapse.value) {
        appStore.setCollapse(true)
      }
    }
    return {
      type: 'router-link',
      linkProps,
      hideMenu
    }
  }
})
</script>
<style lang=""></style>
