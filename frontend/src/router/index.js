import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import notFoundPage from "../views/404.vue";
import Product from "../views/Product.vue";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/Product",
    name: "จัดการสินค้า",
    component: Product,
    meta: { isSecured: true },
  },
  {
    path: "/",
    component: Home,
    name: "Home",
    meta: { isSecured: true },
  },
  {
    path: "/home",
    component: Home,
    name: "Home",
    meta: { isSecured: true },
  },
  {
    path: "/login",
    component: Login,
    name: "Login",
    meta: { isSecured: false },
  },
  {
    path: "/register",
    component: Register,
    name: "Register",
    meta: { isSecured: false },
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/Profile.vue"),
    meta: { isSecured: true },
  },
  {
    path: "*",
    component: notFoundPage,
    name: "404",
    meta: { isSecured: false },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
import store from "../store";
import AuthService from "../services/auth.service";

const DEFAULT_TITLE = "WORKSHOP";

router.beforeEach((to, from, next) => {
  Vue.nextTick(() => {
    document.title = to.name + " | WORKSHOP" || DEFAULT_TITLE;
  });

  if (to.meta.isSecured) {
    if (store.state.auth.status.loggedIn) {
      store.state.auth.messageToken = null;
      AuthService.checkLoginToken(store.state.auth.user.accessToken).then(
        (response) => {
          if (response.data.message != "ok") {
            store.state.auth.messageToken = response.data.message;
            store.dispatch("auth/logout");
            next("/login");
          } else {
            localStorage.setItem("user", JSON.stringify(response.data.user));
          }
        }
      );
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
