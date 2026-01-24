<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<script>
import { defineComponent } from 'vue'
import en from 'element-plus/es/locale/lang/en'
export default defineComponent({
  name: 'App',
  setup() {
    return {
      locale: en
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100vh;
}
.app-container {
  padding: 1em;
}
</style>
