import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/Register'
import Login from '@/components/Login'
import UserSettings from '@/components/UserSettings'
import peopleRoutes from './people-routes'
import bookRoutes from './book-routes'
import movieRoutes from './movie-routes'
import Store from '@/store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/home',
      component: Home
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/login',
      component: Login
    },
    { ...peopleRoutes },
    {
      path: '/profile',
      component: UserSettings
    },
    { ...bookRoutes },
    { ...movieRoutes },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})

// Navigation guards
//
router.beforeEach((to, from, next) => {
  const isLoggedIn = Store.getters['auth/isLoggedIn']
  switch (to.path) {
    case '/register':
    case '/login':
      next(!isLoggedIn)
      break
    case '/books':
    case '/movies':
      next(isLoggedIn)
      break
    default:
      next(true)
  }
})

export default router
