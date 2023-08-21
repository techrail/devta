import { createApp } from "vue";
import "./style.css";
import Index from "@pages/Index/index.vue";
import ErrorPage from "@pages/Error/index.vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

// styles
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap";
import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";
import hljsVuePlugin from "@highlightjs/vue-plugin";
import "highlight.js/styles/atom-one-light.css";

// components
import AppVue from "./App.vue";
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
    name: "Home",
  },
  {
    path: "/hash_generator",
    component: HashGenerator,
    name: "Hash generator",
  },
  {
    path: "/base64",
    component: Base64Text,
    name: "Base64 converter",
  },
  {
    path: "/unixToDate",
    component: UnixToDate,
    name: "Unix to Date converter",
  },
  {
    path: "/dateToUnix",
    component: DateToUnix,
    name: "Date to Unix converter",
  },
  {
    path: "/jsonFormatter",
    component: JsonFormatter,
    name: "JSON formatter",
  },
  {
    path: "/markdownPreview",
    component: MarkdownPreview,
    name: "Markdown previewer",
  },
  {
    path: "/timeZoneConverter",
    component: TimeZoneConverter,
    name: "Timezone converter",
  },
  {
    path: "/JSONToYAML",
    component: JSONToYAML,
    name: "JSON to YAML converter",
  },
  {
    path: "/jwtDebugger",
    component: JWTDebugger,
    name: "JWT debugger",
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

app.use(router);
app.use(hljsVuePlugin);

app.mount("#app");
