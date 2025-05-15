import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../pages/HomePage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../pages/About.vue"),
  },
  {
    path: "/license",
    name: "license",
    component: () => import("../pages/License.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
