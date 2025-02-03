import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/Login.vue'; // Adjusted to ensure correct import path

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue') // Lazy-load Home component
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
