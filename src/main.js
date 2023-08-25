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
import sql from "highlight.js/lib/languages/sql";
import xml from "highlight.js/lib/languages/xml";
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
import SQLFormatter from "./pages/SQLFormatter/index.vue";

hljs.registerLanguage("json", json);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("xml", xml);

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
    path: "/hash-generator",
    component: HashGenerator,
    name: "Hash generator",
  },
  {
    path: "/base64",
    component: Base64Text,
    name: "Base64 converter",
  },
  {
    path: "/unix-date-converter",
    component: UnixToDate,
    name: "Unix to Date converter",
  },
  {
    path: "/date-unix-converter",
    component: DateToUnix,
    name: "Date to Unix converter",
  },
  {
    path: "/json-formatter",
    component: JsonFormatter,
    name: "JSON formatter",
  },
  {
    path: "/markdown-preview",
    component: MarkdownPreview,
    name: "Markdown previewer",
  },
  {
    path: "/timezone-converter",
    component: TimeZoneConverter,
    name: "Timezone converter",
  },
  {
    path: "/json-yaml-converter",
    component: JSONToYAML,
    name: "JSON to YAML converter",
  },
  {
    path: "/jwt-debugger",
    component: JWTDebugger,
    name: "JWT debugger",
  },
  {
    path: "/sql-formatter",
    component: SQLFormatter,
    name: "SQL Formatter",
  },

  // {
  //   path: "/:slug",
  //   component: Module,
  // },
  {
    path: "/:path",
    redirect: { name: "Home" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

app.use(router);
app.use(hljsVuePlugin);

app.mount("#app");
