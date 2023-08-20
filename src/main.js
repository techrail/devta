import { createApp } from "vue";
import "./style.css";
import Index from "@pages/Index/index.vue";
import Module from "@pages/Module/index.vue";
import ErrorPage from "@pages/Error/index.vue";
import BalmUI from "balm-ui";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap";
import "balm-ui-css";
import App from "./App.vue";
import AppVue from "./App.vue";

const routes = [
  {
    path: "/",
    component: Index,
  },
  {
    path: "/:slug",
    component: Module,
  },
  {
    path: "/(.*)",
    component: ErrorPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const pinia = createPinia();

const app = createApp(AppVue);

app.use(BalmUI, {
  $theme: {
    primary: "#000000",
    surface: "#000000",
  },
});

app.use(router);

app.use(pinia);

app.mount("#app");
