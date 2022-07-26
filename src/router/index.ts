import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
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
    path: "/user",
    component: UserSideMenu,
    children: [
      {
        path: 'folder/:id',
        component: () => import ('../views/user/FolderPage.vue')
      }
    ]
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
