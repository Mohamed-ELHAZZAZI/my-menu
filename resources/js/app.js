import "./bootstrap";

import { createApp } from "vue";
import store from "./store";
import app from "./App.vue";
import router from "./router";

createApp(app).use(store).use(router).mount("#app");
