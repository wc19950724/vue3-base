import "tdesign-vue-next/es/style/index.css";
import "@/styles/index.less";
import "./permission";

import App from "./App.vue";
import directives from "./directives";
import router from "./router";
import showAppVersion from "./showAppVersion";
import { store } from "./store";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(directives);

app.mount("#app");

app.config.errorHandler = (err) => {
  console.log("Oops, An exception occurred: ");
  console.info(err);
};

showAppVersion();
