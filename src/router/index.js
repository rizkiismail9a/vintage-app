import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Cookies from "js-cookie";

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
      meta: {
        forAuthedUser: true,
      },
    },
    {
      path: "/profile/:component",
      name: "User Profile",
      component: () => import("../views/ProfileView.vue"),
      meta: {
        forAuthedUser: true,
      },
    },
    {
      path: "/product/favorite",
      name: "User Favorite",
      component: () => import("../views/FavoriteView.vue"),
      meta: {
        forAuthedUser: true,
      },
    },
    {
      path: "/product/register",
      name: "Add New Product",
      component: () => import("../views/AddProductView.vue"),
      meta: {
        forAuthedUser: true,
      },
    },
    {
      path: "/product/edit/:id",
      name: "Edit New Product",
      component: () => import("../views/EditProductView.vue"),
      meta: {
        forAuthedUser: true,
      },
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/LoginView.vue"),
      meta: {
        forGuest: true,
      },
    },
    {
      path: "/signup",
      name: "Sign Up",
      component: () => import("../views/RegisterView.vue"),
      meta: {
        forGuest: true,
      },
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});
router.beforeEach((to, from, next) => {
  const accessToken = Cookies.get("accessToken");
  document.title = to.name + " | Vintage";
  if (to.meta.forAuthedUser && !accessToken) {
    next({ name: "Login" });
  } else if (to.meta.forGuest && accessToken) {
    next({ name: "Home" });
  } else {
    next();
  }
});
export default router;
