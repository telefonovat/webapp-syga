import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VueCodeMirror from 'vue-codemirror';
import { basicSetup } from 'codemirror';
import './style.css';
import './common.css';
import App from './App.vue';

const pinia = createPinia();

createApp(App)
  .use(VueCodeMirror, { extensions: [basicSetup] })
  .use(pinia)
  .mount('#app');
