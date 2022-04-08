import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/index.vue'
import BaseLayout from '../components/layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BaseLayout,
      redirect: {
        path: '/home/overview',
      },
      children: [
        {
          path: '/home/overview',
          name: 'home/overview',
          component: HomeView,
          meta: {
            title: '主页',
          },
          children: [
            {
              path: '/home/p1',
              name: 'home/p1',
              component: HomeView,
              meta: {
                title: '主页P1',
              },
              children: [
                {
                  path: '/home/pp1',
                  name: 'home/pp1',
                  component: HomeView,
                  meta: {
                    title: '主页PP1',
                  },
                },
              ],
            },
          ],
        },
        {
          path: '/home/about',
          name: 'home/about',
          component: () => import('../views/about/index.vue'),
          meta: {
            title: '关于',
          },
        },
      ],
    },
    {
      path: '/error',
      name: 'error/page',
      component: HomeView,
      meta: {
        title: 'ErrorPage',
      },
    },
  ],
})

export default router
