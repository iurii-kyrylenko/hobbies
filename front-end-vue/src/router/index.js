import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Books from '@/components/Books'
import Movies from '@/components/Movies'

Vue.use(Router)

export default new Router({
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
    {
      path: '/books',
      component: Books
    },
    {
      path: '/movies',
      component: Movies
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})
