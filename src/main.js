import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import BalmUI from "balm-ui";
import "balm-ui-css";

const app = createApp(App);

app.use(BalmUI, {
  $theme: {
    primary: "#ffffff",
    surface: "#ffffff",
  },
});

app.mount("#app");
