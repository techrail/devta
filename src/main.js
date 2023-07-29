import { createApp } from "vue";
import "./style.css";
import Index from "@pages/Index/index.vue";
import Module from "@pages/Module/index.vue";
import BalmUI from "balm-ui";
import { createStore } from "vuex";
import {
  createRouter,
  createWebHashHistory as createWebHistory,
} from "vue-router";
import modules from "./modules.mjs";
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

const store = createStore({
  state: {
    modules,
  },
  getters: {
    getModule: (state) => (slug) => {
      return state.modules[slug];
    },
    getModules: (state) => () => {
      return state.modules;
    },
  },
});

const app = createApp({});

app.use(BalmUI, {
  $theme: {
    primary: "#000000",
    surface: "#000000",
  },
});

app.use(router);

app.use(store, "global");

app.mount("#app");
