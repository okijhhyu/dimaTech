import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/index.vue'
import Diagram from '../pages/diagram.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/diagram', component: Diagram },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router