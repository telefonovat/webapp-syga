import { createApp } from 'vue'
import { createPinia } from "pinia";
import './style.css'
import router from '@/router';
import IconButton from "@/components/buttons/IconButton.vue";
import Icon from "@/components/icons/Icon.vue";
import App from './App.vue';

const pinia = createPinia();
createApp(App)
  .component("IconButton", IconButton)
  .component("Icon", Icon)
  .use(pinia)
  .use(router)
  .mount('#app')
