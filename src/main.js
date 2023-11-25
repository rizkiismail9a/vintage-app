import { createApp } from "vue";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/main.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { attempObj } from "./plugin/attemp";

const app = createApp(App);

app.use(createPinia());
attempObj.checkAuth().then(() => {
  app.use(router);
  app.mount("#app");
});

import "bootstrap/dist/js/bootstrap.js";
