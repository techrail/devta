import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const app = createApp({
  data() {
    return {
      count: 0
    }
  }
})

createApp(App).mount("#app");

