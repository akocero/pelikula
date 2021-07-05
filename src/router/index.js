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
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/views/auth/Auth.vue')
  },
  {
    path: '/movie/:id',
    name: 'Movie Details',
    component: () => import('@/views/movie/MovieDetails.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
