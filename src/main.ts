import { createApp } from 'vue'
import { createPinia } from "pinia";

//Global placeholder components for development
import { PlaceholderDiv, PlaceholderButton } from "@/components/placeholders";
//Global components for production
import { Icon } from "@/components/global";

import './style.css'
import { router } from '@/router';
import App from './App.vue';

const pinia = createPinia();
createApp(App)
  .component("placeholder-div", PlaceholderDiv)
  .component("placeholder-button", PlaceholderButton)
  .component("icon", Icon)
  .use(pinia)
  .use(router)
  .mount('#app')
