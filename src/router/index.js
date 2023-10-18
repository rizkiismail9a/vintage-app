import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/collection",
      name: "Collection",
      component: () => import("../views/ProductCollections.vue"),
    },
    {
      path: "/collection/:id",
      name: "Detail Product",
      component: () => import("../views/DetailProduct.vue"),
    },
    {
      path: "/cart/:component1/:component2",
      name: "Cart",
      component: () => import("../views/CartView.vue"),
    },
    {
      path: "/profile/:component",
      name: "User Profile",
      component: () => import("../views/ProfileView.vue"),
    },
    {
      path: "/favorite",
      name: "User Favorite",
      component: () => import("../views/FavoriteView.vue"),
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/signup",
      name: "Sign Up",
      component: () => import("../views/RegisterView.vue"),
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
