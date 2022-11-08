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
    component: () => import('@/views/HomeView/HomeView.vue'),
    children:[
      {
        path:'hotel',
        name:'hotel',
        component:() => import('@/components/BookHotel.vue')
      }
    ]
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
