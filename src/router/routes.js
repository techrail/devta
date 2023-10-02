import { createRouter, createWebHistory } from "vue-router";
import HashGenerator from "../pages/HashGenerator/index.vue";
import Base64Text from "../pages/Base64Text/index.vue";
import DateToUnix from "../pages/DateToUnix/index.vue";
import UnixToDate from "../pages/UnixToDate/index.vue";
import JsonFormatter from "../pages/JsonFormatter/index.vue";
import MarkdownPreview from "../pages/MarkdownPreview/index.vue";
import TimeZoneConverter from "../pages/TimeZoneConverter/index.vue";
import JSONToYAML from "../pages/JSONConverter/index.vue";
import JWTDebugger from "../pages/JWTDebugger/index.vue";
import SQLFormatter from "../pages/SQLFormatter/index.vue";
import PSQLFormatter from "../pages/PSQLParser/index.vue";
import Index from "../pages/Index/index.vue";
import URLParser from "../pages/URLParser/index.vue";
import APITester from "../pages/APITester/index.vue";
import ImagetoBase64 from "../pages/ImageToBase64/index.vue";
import CRONParser from "../pages/CRONParser/index.vue";
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
    path: "/json-converter",
    component: JSONToYAML,
    name: "JSON converter",
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
  {
    path: "/url-parser",
    component: URLParser,
    name: "URL Parser",
  },
  {
    path: "/postgresql-url-parser",
    component: PSQLFormatter,
    name: "Postgres URL Parser",
  },
  // {
  //   path: "/:slug",
  //   component: Module,
  // },
  {
    path: "/:path",
    redirect: { name: "Home" },
  },
  {
    path: "/api-tester",
    component: APITester,
    name: "API Tester",
  },
  {
    path: "/image-base64-converter",
    component: ImagetoBase64,
    name: "Image Base64 Converter",
  },
  {
    path: "/cron-parser",
    component: CRONParser,
    name: "CRON Parser",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
