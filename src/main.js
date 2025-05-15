import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import data from "../data.json";
import router from "./router/router";

const app = createApp(App);
app.config.globalProperties.$data = data;

function convertUTCToLocal(utcTimestamp) {
  const utcDate = new Date(utcTimestamp);

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: undefined,
  };

  return utcDate.toLocaleString(undefined, options);
}

app.config.globalProperties.$updateTime = convertUTCToLocal(data.lastUpdated);
app.use(router);
app.mount("#app");
