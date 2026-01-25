import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route = [
  {
    path: '/system',
    component: Layout,
    redirect: '/404',
    hideMenu: true,
    meta: { title: 'system catalog' },
    children: [
      {
        path: '/404',
        component: createNameComponent(() => import('@/views/system/404.vue')),
        meta: { title: '404', hideTabs: true }
      },
      {
        path: '/401',
        component: createNameComponent(() => import('@/views/system/401.vue')),
        meta: { title: '401', hideTabs: true }
      },
      {
        path: '/redirect/:path(.*)',
        component: createNameComponent(() => import('@/views/system/redirect.vue')),
        meta: { title: 'redirect', hideTabs: true }
      }
    ]
  },
  {
    path: '/login',
    component: createNameComponent(() => import('@/views/system/login.vue')),
    hideMenu: true,
    meta: { title: 'Login', hideTabs: true }
  }
]

// Catch-all route - must be added AFTER dynamic routes to avoid matching first
export const catchAllRoute = {
  path: '/:pathMatch(.*)',
  component: Layout,
  redirect: '/404',
  hideMenu: true
}

export default route