import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/auth/LoginView.vue";
import DashboardView from "@/views/admin/DashboardView.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import VerifyAccount from "@/views/auth/VerifyAccount.vue";
import MainLayoutView from "@/views/user/MainLayoutView.vue";
<<<<<<< HEAD
import { useLoadingStore } from "@/stores/loadingStore";
=======
import DashboardBorrowingView from "@/views/admin/DashboardBorrowingView.vue";
>>>>>>> cfc5844005ba98111b62abb036648c6efabe5f5f

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
      path: "/sign-up",
      name: "register",
      component: RegisterView,
    },

    {
      path: "/verify-account",
      name: "verify-account",
      component: VerifyAccount,
    },

    {
      path: "/admin",
      name: "admin",
      component: AdminLayout,
      redirect: { name: "dashboard" },
      children: [
        {
          path: "dashboard",
          name: "dashboard",
          component: DashboardView,
        },

        {
          path: "borrowing-list",
          name: "borrowing-list",
          component: DashboardBorrowingView,
        },
      ],
    },
    {
      path: "/book",
      name: "books",
      component: MainLayoutView,
    },
  ],
});



router.beforeEach((to, from, next) => {
  const loadingStore = useLoadingStore();
  const excludeRoutes = ["home", "login", "register","verify-account"];
  if (!excludeRoutes.includes(to.name)) {
    loadingStore.start();
  }
  next();
});


export default router;
