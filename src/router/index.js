import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Location from '../views/Location.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  { 
    path: '/location/:city', 
    component: Location
  },
  { path: '/:notFound(.*)', 
    redirect: '/'
  } 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
