import { createRouter, createWebHashHistory } from 'vue-router'
import pinia from '@/stores'
import { useUserStore } from '@/stores/user'
import { useKeepAliveStore } from '@/stores/keepAlive'
import NProgress from '@/utils/system/nprogress'
import { changeTitle } from '@/utils/system/title'

import Layout from '@/layout/index.vue'
import MenuBox from '@/components/menu/index.vue'
import { createNameComponent } from './createNode'

import Dashboard from './modules/dashboard'
import Games from './modules/games'
import Installers from './modules/installers'
import System from './modules/system'

let modules = [...System]

const routes = modules

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
let asyncRoutes = [...Dashboard, ...Games, ...Installers]

export function addRoutes() {
  asyncRoutes.forEach((item) => {
    modules.push(item)
    router.addRoute(item)
  })
}

function eachData(data, type) {
  data.forEach((d) => {
    if (d.children && d.children.length > 0) {
      if (type === 0) {
        d.component = Layout
      } else {
        d.component = createNameComponent(MenuBox)
      }
      eachData(d.children, type + 1)
    } else {
      d.component = createNameComponent(() => import('@/views/main/dashboard/index.vue'))
    }
  })
  console.log(data)
}

const userStore = useUserStore(pinia)
const keepAliveStore = useKeepAliveStore(pinia)

if (userStore.token) {
  addRoutes()
}

const whiteList = ['/login']

router.beforeEach((to, _from, next) => {
  NProgress.start()
  if (userStore.token || whiteList.indexOf(to.path) !== -1) {
    to.meta.title ? changeTitle(to.meta.title) : ''
    next()
  } else {
    next('/login')
    to.meta.title ? changeTitle(to.meta.title) : ''
  }
})

router.afterEach((to, _from) => {
  const name = to.matched[to.matched.length - 1].components.default.name
  if (to.meta && to.meta.cache && name && !keepAliveStore.componentNames.includes(name)) {
    keepAliveStore.addComponentName(name)
  }
  NProgress.done()
})

export { modules }

export default router
