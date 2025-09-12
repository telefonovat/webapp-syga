import { createApp } from "vue";
import { createPinia } from "pinia";
import { router } from "./router";
import VueCodeMirror from "vue-codemirror";
import { basicSetup } from "codemirror";
import "./style.css";
import App from "./App.vue";

const pinia = createPinia();

createApp(App)
  .use(pinia)
  .use(VueCodeMirror, { extensions: [basicSetup] })
  .use(router)
  .mount("#app");
