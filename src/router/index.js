import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home',
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/HomeView/HomeView.vue')
  },
  {
    path: '/city',
    name: 'city',
    component: () => import('@/views/CityView/CityView.vue'),
    children: [
      {
        path: 'strategy',
        name: 'strategy',
        component: () => import('@/views/CityView/two/CityStrategy.vue'),
      },
      {
        path: 'palace',
        name: 'palace',
        component: () => import('@/views/CityView/two/CityPalace.vue'),
        children: [
          {
            path: 'check',
            name: 'check',
            component: () => import('@/views/CityView/three/PalaceCheck.vue'),
          },
          {
            path: 'ask',
            name: 'ask',
            component: () => import('@/views/CityView/three/PalaceAsk.vue'),
          }
        ]
      },
      {
        path: 'biu',
        name: 'biu',
        component: () => import('@/views/CityView/two/CityBiu.vue'),
      },
      {
        path: 'choose-city',
        name: 'choose-city',
        component: () => import('@/views/CityView/two/CityChoose.vue'),
      },
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
