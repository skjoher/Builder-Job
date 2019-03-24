import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
import iView from 'iview'
import { setToken, getToken, canTurnTo, setTitle } from '@/libs/util'
import config from '@/config'
const { homeName } = config

Vue.use(Router)
const router = new Router({
  routes,
  mode: 'history'
})
const LOGIN_PAGE_NAME = 'login'


const turnTo = (to, access, next) => {
  if (canTurnTo(to.name, access, routes)) next() // have permission, accessible
  else next({ replace: true, name: 'error_401' }) // Without permission, redirect to 401 pages
}

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  const token = getToken()
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // Did not login and jump to page is not the login page
    next({
      name: LOGIN_PAGE_NAME // Jump to the login page
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // Not log in and want to jump page is the login page
    next() // jump
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // Is logged in and want to jump the page is the login page
    next({
      name: homeName // Jump to page homeName
    })
  } else {
    if (store.state.user.hasGetInfo) {
      turnTo(to, store.state.user.access, next)
    } else {
      store.dispatch('getUserInfo').then(user => {
        // Pull the user information, through the user permissions and jump of the name of the page to determine whether there is access;Access must be an array, such as：['super_admin'] ['super_admin', 'admin']
        turnTo(to, user.access, next)
      }).catch(() => {
        setToken('')
        next({
          name: 'login'
        })
      })
    }
  }
})

router.afterEach(to => {
  setTitle(to, router.app)
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
