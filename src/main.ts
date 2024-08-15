import { createApp } from 'vue'
import { createPinia } from "pinia";

import { PlaceholderDiv, PlaceholderButton } from "@/components/placeholders";

import './style.css'
import { router } from '@/router';
import App from './App.vue';

const pinia = createPinia();
createApp(App)
  .component("placeholder-div", PlaceholderDiv)
  .component("placeholder-button", PlaceholderButton)
  .use(pinia)
  .use(router)
  .mount('#app')
