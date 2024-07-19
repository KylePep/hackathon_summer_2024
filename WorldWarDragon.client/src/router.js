import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard, authSettled } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage')
  },
  {
    path: '/map',
    name: 'Map',
    component: loadPage('MapPage')
  },
  {
    path: '/score',
    name: 'Score',
    component: loadPage('ScorePage')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: loadPage('AdminPage'),
    beforeEnter: authGuard
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
  },
  {
    path: '/game',
    name: 'Game',
    component: loadPage('GamePage'),
    beforeEnter: authGuard
  },
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
