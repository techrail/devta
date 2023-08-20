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
import AppVue from "./App.vue";

import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";
import hljsVuePlugin from "@highlightjs/vue-plugin";
import "highlight.js/styles/atom-one-light.css";
import HashGenerator from "./pages/HashGenerator/index.vue";
import Base64Text from "./pages/Base64Text/index.vue";
import DateToUnix from "./pages/DateToUnix/index.vue";
import UnixToDate from "./pages/UnixToDate/index.vue";
import JsonFormatter from "./pages/JsonFormatter/index.vue";
import MarkdownPreview from "./pages/MarkdownPreview/index.vue";
import TimeZoneConverter from "./pages/TimeZoneConverter/index.vue";
import JSONToYAML from "./pages/JSONToYAML/index.vue";
import JWTDebugger from "./pages/JWTDebugger/index.vue";

hljs.registerLanguage("json", json);

const app = createApp(AppVue);
const pinia = createPinia();
app.use(pinia);

const routes = [
  {
    path: "/",
    component: Index,
  },
  {
    path: "/hash_generator",
    component: HashGenerator,
  },
  {
    path: "/base64",
    component: Base64Text,
  },
  {
    path: "/unixToDate",
    component: UnixToDate,
  },
  {
    path: "/dateToUnix",
    component: DateToUnix,
  },
  {
    path: "/jsonFormatter",
    component: JsonFormatter,
  },
  {
    path: "/markdownPreview",
    component: MarkdownPreview,
  },
  {
    path: "/timeZoneConverter",
    component: TimeZoneConverter,
  },
  {
    path: "/JSONToYAML",
    component: JSONToYAML,
  },
  {
    path: "/jwtDebugger",
    component: JWTDebugger,
  },

  // {
  //   path: "/:slug",
  //   component: Module,
  // },
  {
    path: "/(.*)",
    component: ErrorPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

app.use(BalmUI, {
  $theme: {
    primary: "#000000",
    surface: "#000000",
  },
});

app.use(router);
app.use(hljsVuePlugin);

app.mount("#app");
