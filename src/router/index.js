import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let routes = [{
  path: '/',
  name: 'index',
  component: () =>
    import ('@/views/home.vue'),
  meta: {
    title: 'index',
    index: 1
  }
}, ]
const router = new Router({
  mode: 'history',
  base: '/fitbus/',
  routes: routes
})
export default router
