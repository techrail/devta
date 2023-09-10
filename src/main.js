import { createApp } from "vue";
import "./style.css";
import { createPinia } from "pinia";
import router from "./router/routes";
import AppVue from "../src/App.vue";
// styles
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap";
import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";
import sql from "highlight.js/lib/languages/sql";
import xml from "highlight.js/lib/languages/xml";
import hljsVuePlugin from "@highlightjs/vue-plugin";
import "./components/highlightJs/highlight-styles.css";

hljs.registerLanguage("json", json);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("xml", xml);

const app = createApp(AppVue);
const pinia = createPinia();

app.use(pinia);
app.use(hljsVuePlugin);
app.use(router);

app.mount("#app");
