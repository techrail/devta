import { createApp } from "vue";
import "./style.css";
import Index from "@pages/Index/index.vue";
import Module from "@pages/Module/index.vue";
import BalmUI from "balm-ui";
import { createPinia } from "pinia";
import {
  createRouter,
  createWebHashHistory as createWebHistory,
} from "vue-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "balm-ui-css";

const routes = [
  {
    path: "/",
    component: Index,
  },
  {
    path: "/:slug",
    component: Module,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const pinia = createPinia();

const app = createApp({});

app.use(BalmUI, {
  $theme: {
    primary: "#000000",
    surface: "#000000",
  },
});

app.use(router);

app.use(pinia);

app.mount("#app");
