import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import data from "../data.json";

const app = createApp(App);
app.config.globalProperties.$data = data;

function convertUTCToLocal(utcTimestamp) {
  const utcDate = new Date(utcTimestamp);
  const localDate = new Date(
    utcDate.getTime() + utcDate.getTimezoneOffset() * 60000
  );

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  return localDate.toLocaleString(undefined, options);
}

app.config.globalProperties.$updateTime = convertUTCToLocal(data.lastUpdated);
app.mount("#app");
