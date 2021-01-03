import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [{
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/reg',
    name: 'Reg',
    component: () => import('../views/Reg.vue')
  },
  {
    path: '/addgroup',
    name: 'AddGroup',
    component: () => import('../components/AddGroup.vue')
  },
  {
    path: '/addpersons',
    name: 'AddPersons',
    component: () => import('../components/AddPersons.vue')
  },
  {
    path: '/groupdata',
    name: 'GroupData',
    component: () => import('../components/GroupData.vue')
  },
  {
    path: '/draw',
    name: 'Draw',
    component: () => import('../views/Draw.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router