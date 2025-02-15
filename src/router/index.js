import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import DashboardView from '@/views/admin/DashboardView.vue'
import AdminLayout from "@/layouts/AdminLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/sign-in",
      name: "login",
      component: LoginView,
    },

    {
      path : '/admin',
      name : 'admin',
      component : AdminLayout,
      redirect : {name : 'dashboard'},
      children : [
        {
          path : 'dashboard',
          name : 'dashboard',
          component : DashboardView
        }
      ]
    }
  ],
});

export default router;
