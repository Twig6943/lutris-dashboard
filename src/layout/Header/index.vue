<template>
  <header>
    <div class="left-box">
      <div class="menu-icon" @click="opendStateChange">
        <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
      </div>
      <Breadcrumb />
    </div>
    <div class="right-box">
      <div class="user-info">
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ username }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="loginOut">sign out</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>

<script>
import { defineComponent, computed, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'
import Breadcrumb from './Breadcrumb.vue'
export default defineComponent({
  components: {
    Breadcrumb
  },
  setup() {
    const appStore = useAppStore()
    const userStore = useUserStore()
    const { isCollapse } = storeToRefs(appStore)
    const username = computed(() => userStore.info?.username || 'user')
    const layer = reactive({
      show: false,
      showButton: true
    })
    const opendStateChange = () => {
      appStore.toggleCollapse()
    }
    const loginOut = () => {
      userStore.loginOut()
    }
    return {
      isCollapse,
      layer,
      username,
      opendStateChange,
      loginOut
    }
  }
})
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color: var(--system-header-background);
  padding-right: 22px;
}
.left-box {
  height: 100%;
  display: flex;
  align-items: center;
  .menu-icon {
    width: 60px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    font-weight: 100;
    cursor: pointer;
    margin-right: 10px;
    &:hover {
      background-color: var(--system-header-item-hover-color);
    }
    i {
      color: var(--system-header-text-color);
    }
  }
}
.right-box {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .function-list {
    display: flex;
    .function-list-item {
      width: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      :deep(i) {
        color: var(--system-header-text-color);
      }
    }
  }
  .user-info {
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: 20px;
    .el-dropdown-link {
      display: flex;
      align-items: center;
      color: var(--system-header-breadcrumb-text-color);
    }
  }
}
</style>
