import { createWebHistory, createRouter } from 'vue-router'
import { isAuthenticated } from '@/services/Authprovider.js'

import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DashboardView from '../views/DashboardView.vue'
import ProfileView from '../views/ProfileView.vue'

const routes = [
  {
    path: '/login',
    component: LoginView,
    name: 'login',
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView,
    meta: {
      requiresAuth: true,
    }
  },

  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    meta: {
      requiresAuth: true,
    }
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isLogged = isAuthenticated();
  
  //si la ressource nécessite d'être authentifié et que l'utilisateur n'est pas connecté
  if (to.meta.requiresAuth && !isLogged) {
    return next({ name: 'login' }); 
  }
  
  //si la ressource est autorisée aux invités mais que l'user est connecté
  if (to.meta.requiresGuest && isLogged) {
    return next({ name: 'dashboard' });
  }

  //sinon, on laisse passer
  next();
});

export default router
