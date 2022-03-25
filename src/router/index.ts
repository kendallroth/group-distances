import { createRouter, createWebHistory } from "vue-router";

// Components
import { HomeView } from "@views/Home";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
  ],
});

export default router;
