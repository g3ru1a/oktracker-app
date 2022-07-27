import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw, RouterLink } from 'vue-router';
import UserSideMenu from "@/views/user/SideMenu.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/user/folder/Inbox'
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
    component: () => import ('../views/auth/LoginPage.vue')
  },
  {
    path: "/user",
    component: UserSideMenu,
    children: [
      {
        path: 'folder/:id',
        component: () => import ('../views/user/FolderPage.vue'),
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
