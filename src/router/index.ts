import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw, RouterLink } from 'vue-router';
import UserSideMenu from "@/views/user/SideMenu.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/user/home'
  },
  {
    path: '/login',
    component: () => import ('../views/auth/LoginPage.vue')
  },
  {
    path: '/register',
    component: () => import ('../views/auth/RegisterPage.vue')
  },
  {
    path: '/verify/:user_id',
    component: () => import ('../views/auth/ConfirmEmailPage.vue')
  },
  {
    path: '/verified',
    component: () => import ('../views/auth/EmailConfirmedPage.vue')
  },
  {
    path: '/forgot-password',
    component: () => import ('../views/auth/ForgotPasswordPage.vue')
  },
  {
    path: '/reset-password',
    name: 'reset_password',
    component: () => import ('../views/auth/ResetPasswordPage.vue'),
    props: true,
  },
  {
    path: '/reset-password-success',
    name: 'reset_password_success',
    component: () => import ('../views/auth/ResetPasswordSuccessPage.vue'),
  },
  {
    path: "/user",
    component: UserSideMenu,
    children: [
      {
        path: 'home',
        component: () => import ('../views/user/HomePage.vue'),
        meta: {requiresLogin: true}
      },
      {
        path: 'collections',
        component: () => import ('../views/user/CollectionsPage.vue'),
        meta: {requiresLogin: true}
      }
    ],
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
