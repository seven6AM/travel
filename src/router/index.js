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
    children: [
      {
        //订酒店
        path: 'hotel',
        name: 'hotel',
        component: () => import('@/components/BookHotel.vue'),
        children: [
          {
            //订酒店=》订酒店
            path: 'dec',
            name: 'dec',
            component: () => import('@/components/SearchDomestic.vue'),
            children: [
              {
                //地图定位
                path: 'location',
                name: 'location',
                component: () => import('@/components/MapLocation.vue')
              }
            ]
          }
        ]
      },
      {
        //关注模块详情页面
        path: 'follow',
        name: 'follow',
        component: () => import('@/components/FollowDetails.vue'),
      },
      {
        //关注块的个人页面
        path: '/page',
        name: 'page',
        component: () => import('@/components/FollowPage.vue'),
        children:[
          {
            //足迹页面
            path:'footprint',
            name:'footprint',
            component:() => import('@/components/FootPrint.vue')
          }
        ]
      },
      {
        path:'/search',
        name:'search',
        component:() => import('@/components/HomeSearch.vue')
      }
    ]
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
