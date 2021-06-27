import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/Home.vue')
  },
  {
    path: '/browse_movies',
    name: 'Browse Movies',
    component: () => import('@/views/browse_movies/BrowseMovies.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
