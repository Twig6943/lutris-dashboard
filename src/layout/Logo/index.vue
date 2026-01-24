<template>
  <div class="logo-container">
    <!-- <img src="@/assets/logo.png" alt=""> -->
    <h1 v-if="!isCollapse">{{ systemTitle }}</h1>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app'
import { systemTitle } from '@/config'
export default defineComponent({
  setup() {
    const { isCollapse } = storeToRefs(useAppStore())
    return {
      isCollapse,
      systemTitle
    }
  }
})
</script>

<style lang="scss" scoped>
  .logo-container {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: var(--system-logo-background);
    h1 {
      font-size: 20px;
      white-space: nowrap;
      color: var(--system-logo-color);
    }
  }
</style>