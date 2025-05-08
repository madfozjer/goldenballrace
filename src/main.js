import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import data from "../data.json";

const app = createApp(App);

checkAPI();
app.config.globalProperties.$data = data;
app.mount("#app");
