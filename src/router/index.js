import { createRouter, createWebHistory } from "vue-router";
const HomeView = () => import("../views/HomeView.vue");
const ProductCollection = () => import("../views/ProductCollections.vue");
const DetailProduct = () => import("../views/DetailProduct.vue");
const CartView = () => import("../views/CartView.vue");
const ProfileView = () => import("../views/ProfileView.vue");
const FavoriteView = () => import("../views/FavoriteView.vue");
const AddProductView = () => import("../views/AddProductView.vue");
const EditProductView = () => import("../views/EditProductView.vue");
const LoginView = () => import("../views/LoginView.vue");
const RegisterView = () => import("../views/RegisterView.vue");
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
      component: ProductCollection,
    },
    {
      path: "/collection/:id",
      name: "Detail Product",
      component: DetailProduct,
    },
    {
      path: "/cart/:component1/:component2",
      name: "Cart",
      component: CartView,
      meta: {
        forAuthedUser: true,
      },
    },
    {
      path: "/profile/:component",
      name: "User Profile",
      component: ProfileView,
      meta: {
        forAuthedUser: true,
      },
    },
    {
      path: "/product/favorite",
      name: "User Favorite",
      component: FavoriteView,
      meta: {
        forAuthedUser: true,
      },
    },
    {
      path: "/product/register",
      name: "Add New Product",
      component: AddProductView,
      meta: {
        forAuthedUser: true,
      },
    },
    {
      path: "/product/edit/:id",
      name: "Edit New Product",
      component: EditProductView,
      meta: {
        forAuthedUser: true,
      },
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
      meta: {
        forGuest: true,
      },
    },
    {
      path: "/signup",
      name: "Sign Up",
      component: RegisterView,
      meta: {
        forGuest: true,
      },
    },
  ],
  scrollBehavior() {
    window.scroll({ top: 0 });
  },
});
router.beforeEach((to, from, next) => {
  window.scroll({ top: 0 });
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
